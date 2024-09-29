import http from 'http';
import express, { Express } from "express";
import * as swaggerUI from "swagger-ui-express";
import router from "./router";
import swaggerSpec from "./swagger";
import path from "path";
import { initWSS } from "./websocket-server";

const app: Express = express();
const server = http.createServer(app);
const port = 3001;

app.use(express.json())

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
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
