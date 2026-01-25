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

async function build() {
    const rootDir = path.join(__dirname, '.');
    const profilePath = path.join(rootDir, 'data/profile.json');
    const templatePath = path.join(__dirname, 'template.html');
    const distDir = path.join(__dirname, 'dist');
    const outputPath = path.join(distDir, 'resume.pdf');

    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, {recursive: true});
    }


    const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
    const template = fs.readFileSync(templatePath, 'utf8');

    // Pre-process data for template
    profileData.experience = profileData.experience.map(job => {
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
    if (profileData.avatar) {
        const avatarPath = path.join(rootDir, 'data', path.basename(profileData.avatar));
        if (fs.existsSync(avatarPath)) {
            const avatarBase64 = fs.readFileSync(avatarPath).toString('base64');
            const ext = path.extname(avatarPath).replace('.', '');
            profileData.avatar_base64 = `data:image/${ext};base64,${avatarBase64}`;
        }
    }

    const html = renderTemplate(template, profileData);
    const tempHtmlPath = path.join(__dirname, 'temp.html');
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
    fs.unlinkSync(tempHtmlPath);
    console.log(`PDF Resume generated at ${outputPath}`);
}

build().catch(err => {
    console.error('Error generating PDF:', err);
    process.exit(1);
});
