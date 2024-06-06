FROM node:19-alpine

ARG _WORKDIR=/var/www/html/
ARG PORT=8000

USER root
RUN apk add php8.3

WORKDIR ${_WORKDIR}

ADD . ${_WORKDIR}
RUN yarn install

USER node
EXPOSE ${PORT}

CMD yarn start