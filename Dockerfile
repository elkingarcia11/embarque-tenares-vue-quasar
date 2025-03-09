# Build stage - Build the Quasar application.
# Use the Node.js version 18.12.1 as the base image for the build stage.
FROM node:18.12.1 as build-stage

# Set the working directory inside the container to /app.
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists) files to the container's working directory.
COPY package*.json ./
# Copy the Quasar configuration file to the container's working directory.
COPY quasar.config.js ./
# Copy all files from the host's current directory to the container's working directory.
COPY ./ ./

# Install Quasar CLI globally using Yarn.
RUN yarn global add @quasar/cli
# Install project dependencies based on package.json.
RUN yarn install
# Build the Quasar application.
RUN quasar build

# Copy the nginx directory from the host to the container's working directory.
COPY ./nginx ./nginx

# Production stage
# Use the nginx version 1.23.3-alpine as the base image for the production stage.
FROM nginx:1.23.3-alpine as production-stage

# Copy the built static files from the build stage to the directory inside the nginx container.
COPY --from=build-stage /app/dist/spa /usr/src/app
# Copy the nginx configuration file from the build stage to the appropriate location within the nginx container.
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/nginx.conf

# Set the working directory inside the nginx container to /usr/src/app.
WORKDIR /usr/src/app

# Create a directory for shared/static resources.
RUN mkdir -p shared/static

# Expose port 80 to allow external access to the nginx server.
EXPOSE 80

# Set the entry point command for the nginx container.
# This command starts the nginx server in the foreground.
ENTRYPOINT ["nginx", "-g", "daemon off;"]
