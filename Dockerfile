# Stage 1: Build PDF and Frontend
FROM node:22-slim AS builder

# Tell Puppeteer not to download its own Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install Chromium + needed deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    ca-certificates fonts-liberation \
    libnss3 libatk-bridge2.0-0 libgtk-3-0 libasound2 \
    libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm1 \
    libpango-1.0-0 libpangocairo-1.0-0 libcairo2 libcups2 \
    libxss1 libxtst6 xdg-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY cv-pdf-generator/package*.json ./cv-pdf-generator/
COPY package*.json ./

WORKDIR /app/cv-pdf-generator
RUN npm ci

WORKDIR /app
RUN npm ci

WORKDIR /app
COPY cv-pdf-generator ./cv-pdf-generator
COPY common-data ./cv-pdf-generator/data
COPY src ./src
COPY public ./public
COPY index.html vite.config.js ./
COPY common-data ./public/data

WORKDIR /app/cv-pdf-generator
RUN npm run build

WORKDIR /app
RUN npm run build

RUN mkdir -p /app/dist/assets && \
    cp /app/cv-pdf-generator/dist/resume.pdf /app/dist/assets/resume.pdf


# Stage 2: Nginx
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx-config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
