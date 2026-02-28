# CV PDF Generator

This tool generates a PDF resume from a template and data.

## Requirements

- Node.js
- npm

## Development

To develop the template and styles with live preview in the browser:

```bash
npm run dev
```

This will:
1. Start a local server at [http://localhost:3000](http://localhost:3000).
2. Watch for changes in `template.html` and `../common-data/profile.json`.
3. Automatically refresh the browser when changes are saved.

## Build

To generate the final PDF:

```bash
npm run build
```

The PDF will be generated at `dist/resume.pdf`.

## Structure

- `builder.js`: Core logic for rendering the template and generating the PDF using Puppeteer.
- `template.html`: The HTML/CSS template for the resume.
- `dev.js`: Development server for live preview.
- `../common-data/profile.json`: The data source for the resume.
