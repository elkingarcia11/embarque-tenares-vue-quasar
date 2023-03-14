# Build stage
FROM node:18.12.1 as build-stage

WORKDIR /app

COPY package*.json ./
COPY quasar.config.js ./
COPY ./ ./

RUN yarn global add @quasar/cli
RUN yarn add --dev @intlify/vue-i18n-loader
RUN yarn add --dev dotenv
RUN yarn add firebase
RUN yarn install
RUN quasar build

COPY ./nginx ./nginx

# Production stage
FROM nginx:1.23.3-alpine as production-stage

COPY --from=build-stage /app/dist/spa /usr/src/app
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/src/app
RUN mkdir -p shared/static

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
