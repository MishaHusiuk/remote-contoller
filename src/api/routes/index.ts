import { Express, Request, Response } from "express";

const initRoutes = (app: Express) => {
  /**
  * @swagger
  * /:
  *   get:
  *     summary: Get a resource
  *     description: Get a specific resource by ID.
  */
  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });
  /**
  * @swagger
  * /command:
  *   post:
  *     summary: Send a command to a computer
  *     description: Send command to a computer under currently open connection.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               :
  *                 type: string
  *     responses: 
  *       '201':
  *         description: Created
  */
    app.post("/command", (req: Request, res: Response) => {
      res.send("command received");
    });
};

export default initRoutes;
