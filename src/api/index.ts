import express, { Express } from "express";
import swaggerUI from "swagger-ui-express";
import { WebSocketServer, WebSocket } from "ws";
import initRoutes from "./routes";
import swaggerSpec from "./swagger";

const app: Express = express();
const port = 3000;

initRoutes(app);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
