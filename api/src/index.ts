import express, { Express } from "express";
import * as swaggerUI from "swagger-ui-express";
import router from "./router";
import swaggerSpec from "./swagger";
import path from "path";
import { initWSS } from "./websocket-server";

const app: Express = express();
const port = 3001;

app.use(express.json())
app.use(express.static(path.join(__dirname, '../../remote-web-client/build')));

app.use('/api', router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

initWSS();