# This file was auto-generated, do not edit it directly.
# Instead run bin/update_build_scripts from
# https://github.com/das7pad/sharelatex-dev-env

FROM node:12.18.3 AS base

CMD ["node", "--expose-gc", "app.js"]

WORKDIR /app

COPY docker_cleanup.sh /

COPY install_deps.sh /app/
RUN /app/install_deps.sh

COPY package.json package-lock.json /app/

FROM base AS dev-deps

RUN /docker_cleanup.sh npm ci

FROM dev-deps as dev

COPY . /app

RUN DATA_DIRS="uploads user_files template_files" \
&&  mkdir -p ${DATA_DIRS} \
&&  chown node:node ${DATA_DIRS}

VOLUME /app/uploads /app/user_files /app/template_files

USER node
