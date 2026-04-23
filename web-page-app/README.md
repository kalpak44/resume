# Web Page App

React/Vite app for the personal website and downloadable resume page.

## Run

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

Generate the resume PDF separately if needed:

```bash
npm run build:resume
```

Build the production Docker image:

```bash
npm run docker:build
```

Production image files live in `docker/`.
