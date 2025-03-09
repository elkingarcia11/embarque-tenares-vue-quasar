# Build stage - Build the Quasar application.
FROM node:18.12.1 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package files and source code
COPY package*.json ./
COPY quasar.config.js ./
COPY ./ ./
# Copy .env file into the container
COPY .env .env

# Install dependencies and build
RUN yarn global add @quasar/cli
RUN yarn install

# Build the application
RUN quasar build

# Copy nginx configuration
COPY ./nginx ./nginx

# Production stage
FROM nginx:1.23.3-alpine AS production-stage

# Copy built files and nginx configuration
COPY --from=build-stage /app/dist/spa /usr/src/app
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/src/app
RUN mkdir -p shared/static

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
