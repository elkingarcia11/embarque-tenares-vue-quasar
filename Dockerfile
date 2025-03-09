# Build stage - Build the Quasar application.
FROM node:18.12.1 as build-stage

# Set the working directory
WORKDIR /app

# Copy package files and source code
COPY package*.json ./
COPY quasar.config.js ./
COPY ./ ./

# Install dependencies and build
RUN yarn global add @quasar/cli
RUN yarn install

# Build arguments for environment variables
ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG FIREBASE_DATABASE_URL
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_STORAGE_BUCKET
ARG FIREBASE_MESSAGING_SENDER_ID
ARG FIREBASE_APP_ID
ARG FIREBASE_MEASUREMENT_ID
ARG FIREBASE_USERNAME
ARG FIREBASE_PASSWORD
ARG GOOGLE_MAPS_API_KEY
ARG HECTOR_BASE_URL
ARG HECTOR_USERNAME
ARG HECTOR_TYPE

# Build the application
RUN quasar build

# Copy nginx configuration
COPY ./nginx ./nginx

# Production stage
FROM nginx:1.23.3-alpine as production-stage

# Copy built files and nginx configuration
COPY --from=build-stage /app/dist/spa /usr/src/app
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/src/app
RUN mkdir -p shared/static

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
