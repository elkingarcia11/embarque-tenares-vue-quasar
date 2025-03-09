# Build stage - Build the Quasar application
FROM node:18.12.1-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN yarn global add @quasar/cli
RUN yarn install --frozen-lockfile

# Copy source code (will change more frequently)
COPY . .

# Build the application
# Note: We'll use environment substitution at runtime instead of baking .env into the image
RUN quasar build

# Production stage
FROM nginx:1.23.3-alpine AS production-stage

# Copy built files and nginx configuration
COPY --from=build-stage /app/dist/spa /usr/src/app
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/nginx.conf

# Create a startup script to handle environment variables
WORKDIR /usr/src/app
RUN mkdir -p shared/static

# Create a script to replace environment variables in JS files at startup
COPY --from=build-stage /app/scripts/replace-env.sh /docker-entrypoint.d/40-replace-env.sh
RUN chmod +x /docker-entrypoint.d/40-replace-env.sh

EXPOSE 80

# Nginx's default entrypoint will run scripts in /docker-entrypoint.d/ before starting
