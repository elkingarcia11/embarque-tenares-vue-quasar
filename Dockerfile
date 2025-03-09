# Build stage
# Use the Node.js version 18.12.1 as the base image for the build stage.
FROM node:18.12.1 AS build-stage

# Declare build arguments for environment variables
ARG QENV_FIREBASE_API_KEY
ARG QENV_FIREBASE_AUTH_DOMAIN
ARG QENV_FIREBASE_DATABASE_URL
ARG QENV_FIREBASE_PROJECT_ID
ARG QENV_FIREBASE_STORAGE_BUCKET
ARG QENV_FIREBASE_MESSAGING_SENDER_ID
ARG QENV_FIREBASE_APP_ID
ARG QENV_FIREBASE_MEASUREMENT_ID
ARG QENV_FIREBASE_USERNAME
ARG QENV_FIREBASE_PASSWORD
ARG GOOGLE_MAPS_API_KEY
ARG HECTOR_BASE_URL
ARG HECTOR_USERNAME
ARG HECTOR_TYPE

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
# Build the Quasar application with environment variables
RUN QENV_FIREBASE_API_KEY=${QENV_FIREBASE_API_KEY} \
    QENV_FIREBASE_AUTH_DOMAIN=${QENV_FIREBASE_AUTH_DOMAIN} \
    QENV_FIREBASE_DATABASE_URL=${QENV_FIREBASE_DATABASE_URL} \
    QENV_FIREBASE_PROJECT_ID=${QENV_FIREBASE_PROJECT_ID} \
    QENV_FIREBASE_STORAGE_BUCKET=${QENV_FIREBASE_STORAGE_BUCKET} \
    QENV_FIREBASE_MESSAGING_SENDER_ID=${QENV_FIREBASE_MESSAGING_SENDER_ID} \
    QENV_FIREBASE_APP_ID=${QENV_FIREBASE_APP_ID} \
    QENV_FIREBASE_MEASUREMENT_ID=${QENV_FIREBASE_MEASUREMENT_ID} \
    QENV_FIREBASE_USERNAME=${QENV_FIREBASE_USERNAME} \
    QENV_FIREBASE_PASSWORD=${QENV_FIREBASE_PASSWORD} \
    GOOGLE_MAPS_API_KEY=${GOOGLE_MAPS_API_KEY} \
    HECTOR_BASE_URL=${HECTOR_BASE_URL} \
    HECTOR_USERNAME=${HECTOR_USERNAME} \
    HECTOR_TYPE=${HECTOR_TYPE} \
    quasar build

# Copy the nginx directory from the host to the container's working directory.
COPY ./nginx ./nginx

# Production stage
# Use the nginx version 1.23.3-alpine as the base image for the production stage.
FROM nginx:1.23.3-alpine AS production-stage

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
