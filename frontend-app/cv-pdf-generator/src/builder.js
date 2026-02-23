const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Simple mustache-like template engine
function renderTemplate(template, data) {
    return template.replace(/{{#([\w]+)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
        const value = data[key];
        if (Array.isArray(value)) {
            return value.map(item => {
                if (typeof item === 'object') {
                    return renderTemplate(content, item);
                }
                return content.replace(/{{\.}}/g, item);
            }).join('');
        }
        return value ? renderTemplate(content, data) : '';
    }).replace(/{{([\w.]+)}}/g, (match, key) => {
        const keys = key.split('.');
        let value = data;
        for (const k of keys) {
            value = value ? value[k] : '';
        }
        return value || '';
    });
}

function prepareData(profileData, rootDir) {
    // Pre-process data for template
    const preparedData = { ...profileData };
    preparedData.experience = (preparedData.experience || []).map(job => {
        const metaParts = (job.meta || "").split(",");
        const company = metaParts[0] ? metaParts[0].trim() : "";
        const location_date = metaParts.slice(1).join(",").trim();
        const all_skills = [
            ...(job.tags || []),
            ...(job.technologies || []),
            ...(job.skills || [])
        ];
        return {
            ...job,
            company,
            location_date,
            all_skills: [...new Set(all_skills)]
        };
    });

    // Convert avatar to base64
    if (preparedData.avatar) {
        const avatarPath = path.join(rootDir, 'common-data', path.basename(preparedData.avatar));
        if (fs.existsSync(avatarPath)) {
            const avatarBase64 = fs.readFileSync(avatarPath).toString('base64');
            const ext = path.extname(avatarPath).replace('.', '');
            preparedData.avatar_base64 = `data:image/${ext};base64,${avatarBase64}`;
        }
    }
    return preparedData;
}

function getRenderedHtml() {
    const rootDir = path.join(__dirname, '../..');
    const profilePath = path.join(rootDir, 'common-data/profile.json');
    const templatePath = path.join(__dirname, 'template.html');

    const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
    const template = fs.readFileSync(templatePath, 'utf8');

    const preparedData = prepareData(profileData, rootDir);
    return renderTemplate(template, preparedData);
}

async function build() {
    const distDir = path.join(__dirname, '../dist');
    const outputPath = path.join(distDir, 'resume.pdf');

    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, {recursive: true});
    }

    const html = getRenderedHtml();
    const tempHtmlPath = path.join(__dirname, '../temp.html');
    fs.writeFileSync(tempHtmlPath, html);

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(`file://${tempHtmlPath}`, {waitUntil: 'networkidle0'});
    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '10mm',
            right: '0mm',
            bottom: '10mm',
            left: '0mm'
        }
    });

    await browser.close();
    if (fs.existsSync(tempHtmlPath)) {
        fs.unlinkSync(tempHtmlPath);
    }
    console.log(`PDF Resume generated at ${outputPath}`);
}

module.exports = {
    getRenderedHtml,
    build
};

if (require.main === module) {
    build().catch(err => {
        console.error('Error generating PDF:', err);
        process.exit(1);
    });
}
