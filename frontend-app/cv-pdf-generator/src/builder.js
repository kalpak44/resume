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

function highlightKeywords(text, keywords) {
    if (!text || !keywords || !Array.isArray(keywords) || keywords.length === 0) {
        return text;
    }
    // Escape keywords for regex and sort by length descending to match longer keywords first
    const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
    const escapedKeywords = sortedKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
    return text.replace(regex, '<b>$1</b>');
}

/**
 * Highlights keywords in object/array based on a path string.
 * Supports:
 * - Simple paths: "summary"
 * - Nested paths: "education[0].school"
 * - Array wildcards: "experience[].description", "experience[].bullets[]"
 */
function highlightByPath(data, path, keywords) {
    if (!data || !path) return;

    const parts = path.split('.');
    let current = data;

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLast = i === parts.length - 1;
        const arrayMatch = part.match(/^(\w+)\[(\d*)\]$/);

        if (arrayMatch) {
            const key = arrayMatch[1];
            const index = arrayMatch[2];
            const arr = current[key];

            if (!Array.isArray(arr)) return;

            if (index === "") {
                // Wildcard: experience[]
                const remainingPath = parts.slice(i + 1).join('.');
                arr.forEach((item, idx) => {
                    if (remainingPath) {
                        highlightByPath(item, remainingPath, keywords);
                    } else {
                        // Leaf array: bullets[]
                        if (typeof item === 'string') {
                            arr[idx] = highlightKeywords(item, keywords);
                        }
                    }
                });
                return; // recursion handles the rest
            } else {
                // Specific index: experience[0]
                current = arr[parseInt(index)];
                if (isLast && typeof current === 'string') {
                    arr[parseInt(index)] = highlightKeywords(current, keywords);
                }
            }
        } else {
            // Simple key
            if (isLast) {
                if (typeof current[part] === 'string') {
                    current[part] = highlightKeywords(current[part], keywords);
                }
            } else {
                current = current[part];
            }
        }

        if (!current) return;
    }
}

function prepareData(profileData, rootDir) {
    // Load keywords and targets
    const keywordsPath = path.join(rootDir, 'common-data/keywords.json');
    let keywordsConfig = {keywords: [], targets: []};
    if (fs.existsSync(keywordsPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));
            if (Array.isArray(config)) {
                // Support legacy format
                keywordsConfig.keywords = config;
                keywordsConfig.targets = ["summary", "experience[].description", "experience[].bullets[]"];
            } else {
                keywordsConfig = {...keywordsConfig, ...config};
            }
        } catch (e) {
            console.error('Error loading keywords:', e);
        }
    }

    // Pre-process data for template
    const preparedData = JSON.parse(JSON.stringify(profileData)); // Deep copy to avoid modifying original

    // Apply keyword highlighting
    if (Array.isArray(keywordsConfig.groups)) {
        // New format: { groups: [ { targets: [], keywords: [] }, ... ] }
        keywordsConfig.groups.forEach(group => {
            const targets = Array.isArray(group.targets) ? group.targets : [group.target].filter(Boolean);
            const keywords = group.keywords || [];
            if (keywords.length > 0 && targets.length > 0) {
                targets.forEach(pathStr => {
                    highlightByPath(preparedData, pathStr, keywords);
                });
            }
        });
    } else if (keywordsConfig.keywords && keywordsConfig.keywords.length > 0 && keywordsConfig.targets && keywordsConfig.targets.length > 0) {
        // Current format: { keywords: [], targets: [] }
        keywordsConfig.targets.forEach(pathStr => {
            highlightByPath(preparedData, pathStr, keywordsConfig.keywords);
        });
    }

    // Additional data preparation for template display
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
