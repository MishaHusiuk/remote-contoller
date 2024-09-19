FROM node:22.9.0-alpine as base-node

ENV APP_DIR=/app

WORKDIR $APP_DIR/remote-web-client

COPY ./remote-web-client/public/ public
COPY ./remote-web-client/src/ src

COPY ./remote-web-client/package.json .
COPY ./remote-web-client/package-lock.json .
COPY ./remote-web-client/tailwind.config.js .
COPY ./remote-web-client/tsconfig.json .

RUN npm install

RUN npm run build

WORKDIR $APP_DIR/api

COPY ./api/src/ src
COPY ./api/package.json .
COPY ./api/package-lock.json .
COPY ./api/tsconfig.json .

RUN npm install

RUN npm run build

# run api 'npm start' command
ENTRYPOINT [ "npm", "start" ]



