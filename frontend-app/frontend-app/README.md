# Frontend App

Personal web page built with Vite, React, Tailwind CSS, and React Router.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

## Getting Started

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the frontend directory**:
    ```bash
    cd frontend-app/frontend-app
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```

## Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Production Build

To build the application for production:

```bash
npm run build
```

The output will be in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Linting and Formatting

### Linting

To run ESLint and check for code quality issues:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint:fix
```

### Formatting

To check code formatting with Prettier:

```bash
npm run format:check
```

To format all files with Prettier:

```bash
npm run format
```