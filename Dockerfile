FROM node:22.9.0-alpine as base-node

ENV APP_DIR=/app

WORKDIR $APP_DIR/remote-web-client

COPY ./src/remote-web-client/public/ public
COPY ./src/remote-web-client/src/ src

COPY ./src/remote-web-client/package.json .
COPY ./src/remote-web-client/package-lock.json .
COPY ./src/remote-web-client/tailwind.config.js .
COPY ./src/remote-web-client/tsconfig.json .

RUN npm install

RUN npm run build

WORKDIR $APP_DIR/api

COPY ./src/api/src/ src
COPY ./src/api/package.json .
COPY ./src/api/package-lock.json .
COPY ./src/api/tsconfig.json .

RUN npm install

RUN npm run build

# run api 'npm start' command
ENTRYPOINT [ "npm", "start" ]



