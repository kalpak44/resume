const browserSync = require('browser-sync').create();
const path = require('path');
const fs = require('fs');
const os = require('os');
const { getRenderedHtml } = require('./builder');

const rootDir = path.join(__dirname, '../..');
const profilePath = path.join(rootDir, 'common-data/profile.json');
const templatePath = path.join(__dirname, 'template.html');

// Create a temp directory for development
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-preview-'));
const previewFilePath = path.join(tempDir, 'preview.html');

function updatePreview() {
    try {
        const html = getRenderedHtml();
        fs.writeFileSync(previewFilePath, html);
        console.log(`Preview updated in ${previewFilePath}`);
    } catch (err) {
        console.error('Error updating preview:', err);
    }
}

// Initial build
updatePreview();

browserSync.init({
    server: {
        baseDir: tempDir,
        index: 'preview.html'
    },
    files: [
        {
            match: [templatePath, profilePath],
            fn: function (event, file) {
                console.log(`File changed: ${file}`);
                updatePreview();
                browserSync.reload();
            }
        }
    ],
    ui: false,
    open: false,
    notify: false
});

// Cleanup temp directory on exit
function cleanup() {
    console.log('Cleaning up temp files...');
    try {
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    } catch (e) {
        console.error('Error during cleanup:', e);
    }
    process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
