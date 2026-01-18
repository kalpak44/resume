# Stage 1: Build PDF and Web Apps
FROM node:18-slim AS builder

WORKDIR /app
COPY . .

# Build the React app
WORKDIR /app/web-page
RUN npm install && npm run build
WORKDIR /app

# Stage 2: Nginx
FROM nginx:latest

# Copy the React app build results to the root
COPY --from=builder /app/web-page/dist /usr/share/nginx/html

# Ensure the generated PDF is in the assets folder within the web-page dist
# We use the pre-built PDF from the host since building it in Docker is tricky
COPY pdf/dist/resume.pdf /usr/share/nginx/html/assets/resume.pdf

# Add Nginx configuration to support SPA routing
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Nginx starts automatically by default
