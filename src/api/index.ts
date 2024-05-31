import express, { Express, Request, Response } from "express";
import initRoutes from "./routes";

const app: Express = express();
const port = 3000;

initRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});