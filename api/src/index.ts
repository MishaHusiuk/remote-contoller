import 'dotenv/config'
import http from 'http';
import https from 'https';
import fs from 'fs';
import express, { Express } from "express";
import * as swaggerUI from "swagger-ui-express";
import logger from 'morgan';
import router from "./router";
import swaggerSpec from "./swagger";
import path from "path";
import { initWSS } from "./websocket-server";

// SSL Certificate
const privateKey = process.env.SSL_PRIVATE_KEY;
const certificate = process.env.SSL_CERTIFICATE;
const ca = process.env.SSL_CHAIN;

const credentials = { key: privateKey, cert: certificate, ca: ca };

const app: Express = express();
// Create HTTPS server
const httpsEnabled = process.env.HTTPS === 'true';
let server = null;
if (httpsEnabled) {
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

const port =  process.env.PORT || 3000;

app.use(express.json())
app.use(logger('combined'));

app.use('/api', router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.static(path.join(__dirname, '../../remote-web-client/build')));
// Route all client-side routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../remote-web-client/build', 'index.html'));
});

app.get('/ws', (_, res) => {
  res.send('WebSocket connection endpoint. Use a WebSocket client to connect.');
});
initWSS(server);

server.listen(port, () => {
  console.log(`[server]: Server is running at ${ httpsEnabled ? 'https' : 'http' }://localhost:${port}`);
});
