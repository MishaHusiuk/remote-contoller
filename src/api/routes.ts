import { Express, Request, Response } from "express";

const initRoutes = (app: Express) => {
    app.get("/", (req: Request, res: Response) => {
        res.send("Express + TypeScript Server");
    });
}

export default initRoutes;