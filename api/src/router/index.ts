import express, { Express, Request, Response } from "express";
import { getInstance } from "../websocket-server";
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import { startConnection } from "../services/connection";

const router = express.Router();

type JWTPayload = {
  sub: string;
}
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://remotectr.com/api',
  issuerBaseURL: `https://dev-63sgbr70.us.auth0.com/`,
});
const checkScopes = requiredScopes('send:command');


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
  res.send("Ok");
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
router.post("/command", [checkJwt, checkScopes, (req: Request, res: Response) => {
  const { commandName } = req.body;

  sendToWSClient(commandName)

  res.sendStatus(200);
}]);

router.post('/connection', [checkJwt, checkScopes, (req: Request, res: Response) => {
  const { sub: userId } = req.auth?.payload as JWTPayload;

  const connection = startConnection(userId);

  res.status(201).send(connection);
}]);

function sendToWSClient(message: string) {
  const wss = getInstance();
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export default router;
