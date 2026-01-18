# Stage 1: Build PDF
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

# Run the PDF builder
WORKDIR /app/pdf
RUN npm install && npm run build
WORKDIR /app

# Stage 2: Nginx
FROM nginx:latest

# Copy the static site content
COPY --from=builder /app/web /usr/share/nginx/html

# Copy the shared data to the web folder (so it can be served)
COPY --from=builder /app/data/profile.json /usr/share/nginx/html/data/profile.json
COPY --from=builder /app/data/profile.jpg /usr/share/nginx/html/data/profile.jpg

# Copy the generated PDF to the assets folder
COPY --from=builder /app/pdf/dist/resume.pdf /usr/share/nginx/html/assets/resume.pdf

# Expose port 80
EXPOSE 80

# Nginx starts automatically by default
