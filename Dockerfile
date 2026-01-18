# Stage 1: Build PDF and Web Apps
FROM node:18-slim AS builder

# Install puppeteer dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxtst6 \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

# Build the PDF
WORKDIR /app/pdf
RUN npm install && npm run build

# Build the React app
WORKDIR /app/web-page
RUN npm install && npm run build
WORKDIR /app

# Stage 2: Nginx
FROM nginx:latest

# Copy the React app build results to the root
COPY --from=builder /app/web-page/dist /usr/share/nginx/html

COPY /app/pdf/dist/resume.pdf /usr/share/nginx/html/assets/resume.pdf

# Add Nginx configuration to support SPA routing
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Nginx starts automatically by default
