FROM risingstack/alpine:3.4-v6.7.0-4.0.0
WORKDIR /opt/app

# Install yarn from the local .tgz
RUN mkdir -p /opt
ADD latest.tar.gz /opt/
RUN mv /opt/dist /opt/yarn
ENV PATH "$PATH:/opt/yarn/bin"

# Install packages using Yarn
ADD package.json /tmp/package.json
RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

WORKDIR /embarquetenaresvuequasar

RUN yarn init
RUN export PATH="$(yarn global bin):$PATH"
ENV PORT 80
RUN export PATH="$(yarn global bin):$PATH"
RUN yarn global add @quasar/cli
RUN yarn add --dev @intlify/vue-i18n-loader
RUN yarn add --dev dotenv
RUN yarn add firebase
RUN yarn global add @quasar/icongenie

RUN yarn quasar build
RUN yarn quasar serve --port
