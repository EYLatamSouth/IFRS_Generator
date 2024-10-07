FROM node:20-alpine3.20

WORKDIR /api

COPY . /api

RUN yarn install && \
    addgroup -S api && \
    adduser -G api -S api

USER api

ENTRYPOINT [ "yarn", "start" ]