import bunkerMd from './projects/bunker.md?raw'
import homelabMd from './projects/homelab-k8s.md?raw'
import telegramMd from './projects/telegram-stripe-bot.md?raw'
import codeViewerMd from './projects/code-viewer-bot.md?raw'
import k8sUtilMd from './projects/k8s-utility-containers.md?raw'
import miteAssistantMd from './projects/mite-assistant-mcp.md?raw'

export const projects = [
  {
    id: 'bunker',
    title: 'Bunker - Real-Time Browser Party Game',
    summary:
      'A fast, browser-based real-time party game inspired by the popular "Bunker" format. Players receive survival characters with hidden attributes and must convince others why they deserve a spot in the bunker during escalating disaster rounds.',
    technologies: [
      'Java',
      'Spark Java',
      'WebSockets',
      'JavaScript',
      'Tailwind CSS',
      'SonarCloud',
      'JaCoCo',
      'Jib',
      'Docker',
      'Maven',
    ],
    github: 'https://github.com/kalpak44/bunker-party',
    url: 'https://bunker.pavel-usanli.online/',
    details: bunkerMd,
  },
  {
    id: 'homelab-k8s',
    title: 'Homelab Kubernetes - GitOps-Managed Platform',
    summary:
      'A private homelab Kubernetes platform running on MicroK8s and managed via FluxCD GitOps, with Traefik ingress, Cloudflare-managed TLS, NFS-backed persistent volumes, and built-in monitoring + security scanning.',
    technologies: [
      'Kubernetes',
      'MicroK8s',
      'FluxCD',
      'GitOps',
      'Traefik',
      'MetalLB',
      'Cloudflare',
      "Let's Encrypt",
      'NFS',
      'Trivy Operator',
      'Grafana',
      'Prometheus',
      'AdGuard Home',
      'PostgreSQL',
      'NGINX',
      'Helm',
    ],
    github: 'https://github.com/kalpak44/homelab-k8s',
    details: homelabMd,
  },
  {
    id: 'telegram-stripe-bot',
    title: 'Telegram Stripe Bot - Java Payment Automation',
    summary:
      'A lightweight Telegram bot that generates Stripe Checkout payment links from chat input, built in raw Java and deployed via Docker on Raspberry Pi (ARM32).',
    technologies: [
      'Java 17',
      'TelegramBots API',
      'Stripe Java SDK',
      'Docker',
      'ARM32',
      'Maven',
      'SLF4J',
      'Logback',
    ],
    github: 'https://github.com/kalpak44/telegram-bot',
    details: telegramMd,
  },
  {
    id: 'code-viewer-bot',
    title: 'Code Viewer Bot - VS Code Automation Experiment',
    summary:
      'A tiny VS Code extension that randomly opens files and wiggles the cursor - because apparently being "active" is a KPI now 😄',
    technologies: [
      'JavaScript',
      'Node.js',
      'VS Code Extension API',
      'GitHub Actions',
      'CI/CD',
    ],
    github: 'https://github.com/kalpak44/code-viewer-bot',
    url: 'https://marketplace.visualstudio.com/items?itemName=kalpakus.code-viewer-bot',
    details: codeViewerMd,
  },
  {
    id: 'k8s-utility-containers',
    title: 'Kubernetes Utility Containers - DevOps Automation Images',
    summary:
      'Lightweight production-ready Docker utility containers for Kubernetes environments. Includes a PostgreSQL backup/restore image with AWS S3 integration and retention policies, and a kubectl + AWS CLI toolbox image designed for automation jobs such as ECR secret refresh, cluster maintenance, and GitOps workflows.',
    technologies: [
      'Docker',
      'Kubernetes',
      'PostgreSQL',
      'AWS CLI',
      'S3',
      'kubectl',
      'Alpine Linux',
      'Shell Scripting',
      'GitHub Actions',
      'GHCR',
    ],
    details: k8sUtilMd,
  },
  {
    id: 'mite-assistant-mcp',
    title: 'Mite Assistant MCP - AI Time Tracking via MCP',
    summary:
      'An MCP server that connects AI assistants (Claude, Codex) to Mite time tracking. Log, query, and update time entries through natural language — without leaving your editor.',
    technologies: [
      'Node.js',
      'JavaScript',
      'MCP SDK',
      'Zod',
      'REST API',
      'Bearer Auth',
    ],
    github: 'https://github.com/kalpak44/mite-assistant-mcp',
    details: miteAssistantMd,
  },
]
