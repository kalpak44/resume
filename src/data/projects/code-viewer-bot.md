A fun experimental Visual Studio Code extension built after hearing stories about how some workplaces obsess over "activity status" in chat apps. This extension randomly opens files from the current project and performs simple cursor movements - like a tiny developer hamster running in a wheel.

Technically, the real goal was to experiment with VS Code extension APIs in plain JavaScript and set up a CI pipeline that produces downloadable builds for multiple platforms (Windows/macOS) via GitHub Releases.

### Key Features & Details

- Built a VS Code extension in **JavaScript** that randomly opens workspace files and moves the cursor around like it's "busy"
- Implemented workspace file discovery + random rotation logic across the project directory
- Integrated simple editor actions (open file, set selection, cursor movement) using VS Code Extension API
- Set up GitHub Actions to build and package the extension into `.vsix` artifacts
- Automated GitHub Releases with **multi-platform builds (Windows/macOS)** so the extension can be downloaded directly from CI

```mermaid
graph TD
  A[Run Extension] --> B[Scan Workspace Files]
  B --> C[Pick Random File]
  C --> D[Open in Editor]
  D --> E[Move Cursor a Bit]
  E --> C
```

**Purpose:** A small “because I can” project - play with VS Code extension APIs and automate code browsing.

**Bonus:** Practiced CI/CD + release automation by generating ready-to-install `.vsix` builds for Windows/macOS via GitHub Actions and publishing them through GitHub Releases.

> **Disclaimer:** This bot moves the cursor. It does not fix bugs, write features, or survive standups on your behalf.
