import express, { Express, Request, Response } from "express";
import { getInstance } from "../websocket-server";

const router = express.Router();
  
/**
* @swagger
* /:
*   get:
*     summary: Get a resource
*     description: Get a specific resource by ID.
*/
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });
router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

/**
  * @swagger
  * /command:
  *   post:
  *     summary: Send a command the connected websocket client (PC)
  *     description: Send command to a client(PC) under currently open connection.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               commandName:
  *                 type: string
  *     responses: 
  *       '200':
  *         description: Ok
  */
router.post("/command", (req: Request, res: Response) => {
  const { commandName } = req.body;

  sendToWSClient(commandName)

  res.sendStatus(200);
});

function sendToWSClient(message: string) {
  const wss = getInstance();
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export default router;
