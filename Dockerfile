FROM nginx:latest

# Copy the static site content to the nginx html directory
COPY ./site /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx starts automatically by default
