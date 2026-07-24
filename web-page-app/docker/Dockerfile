FROM maven:3.9.11-eclipse-temurin-17 AS pdf-builder

WORKDIR /app

COPY cv-pdf-generator/pom.xml ./cv-pdf-generator/
COPY cv-pdf-generator/src ./cv-pdf-generator/src
COPY cv-pdf-generator/data ./cv-pdf-generator/data

RUN RESUME_DATA_DIR=cv-pdf-generator/data \
    mvn -Dmaven.repo.local=/tmp/mvn-repo -DskipTests -f cv-pdf-generator/pom.xml \
    package exec:java \
    -Dexec.mainClass=online.pavelusanli.resume.ResumeApp \
    -Dexec.args="build /tmp/resume.pdf"

FROM node:22-slim AS web-builder

WORKDIR /app/web-page-app

COPY web-page-app/package.json web-page-app/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY web-page-app/src ./src
COPY web-page-app/public ./public
COPY web-page-app/index.html web-page-app/vite.config.js web-page-app/eslint.config.js ./
COPY --from=pdf-builder /tmp/resume.pdf ./public/assets/resume.pdf

RUN npx vite build

FROM nginx:1.31-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=web-builder /app/web-page-app/dist /usr/share/nginx/html
COPY web-page-app/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
