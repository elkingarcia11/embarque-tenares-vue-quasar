FROM node:18.12.1

WORKDIR /EmbarqueTenaresVueQuasar

COPY . /EmbarqueTenaresVueQuasar

RUN yarn global add @quasar/cli
RUN yarn add --dev @intlify/vue-i18n-loader
RUN yarn add --dev dotenv
RUN yarn add firebase
RUN yarn add surge
RUN yarn install
RUN yarn quasar build
ENTRYPOINT yarn surge dist/spa
