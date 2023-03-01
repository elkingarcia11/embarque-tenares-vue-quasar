FROM node:6.7.0
RUN npm install -g yarn
ADD . /EmbarqueTenaresVueQuasar

WORKDIR /EmbarqueTenaresVueQuasar

RUN yarn global add @quasar/cli
RUN yarn add --dev @intlify/vue-i18n-loader
RUN yarn add --dev dotenv
RUN yarn add firebase
RUN yarn global add @quasar/icongenie
RUN yarn install
RUN quasar build
RUN quasar serve --port 80
EXPOSE 80
