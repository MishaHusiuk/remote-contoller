import express, { Express, Request, Response } from "express";
import { getInstance } from "../websocket-server";
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import { startConnection, getConnection, updateConnectionStatus } from "../services/connection";

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
  * /api/command:
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

/**
* @swagger
* /api/connections:
*   post:
*     summary: Create a connection
*     description: Creates a new connection resource and returns its ID and related information.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - controlledDesktopName
*             properties:
*               controlledDesktopName:
*                 type: string
*     responses:
*       '201':
*         description: Connection created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: string
*                   format: uuid
*                 userId:
*                   type: string
*                 status:
*                   type: string
*                   enum: ['initiating', 'accepted', 'active', 'terminated']
*                 controlledDesktopName:
*                   type: string
*       '400':
*         description: Invalid request body or missing required fields
*       '401':
*         description: Unauthorized, missing or invalid access token
*       '500':
*         description: Internal server error
*     security:
*       - bearerAuth: []
*/
router.post('/connections', [checkJwt, checkScopes, (req: Request, res: Response) => {
  const { sub: userId } = req.auth?.payload as JWTPayload;
  const { controlledDesktopName } = req.body;

  const connection = startConnection(userId, controlledDesktopName);

  console.log(connection);

  res.status(201).send(connection);
}]);

/**
* @swagger
* /api/connections/{id}:
*   get:
*     summary: Get connection details
*     description: Retrieves details of a specific connection by its ID.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: The ID of the connection
*     responses:
*       '200':
*         description: Connection details retrieved successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: string
*                   format: uuid
*                 userId:
*                   type: string
*                 status:
*                   type: string
*                   enum: ['initiating', 'accepted', 'active', 'terminated']
*                 controlledDesktopName:
*                   type: string
*       '401':
*         description: Unauthorized, missing or invalid access token
*       '403':
*         description: Forbidden, user does not have permission to access this connection
*       '404':
*         description: Connection not found
*       '500':
*         description: Internal server error
*     security:
*       - bearerAuth: []
*/
router.get('/connections/:id', [checkJwt, checkScopes, (req: Request, res: Response) => {
  const { sub: userId } = req.auth?.payload as JWTPayload;
  const { id } = req.params;

  const connection = getConnection(id);
  if(!connection) {
    res.sendStatus(404);
  }
  if(connection?.userId !== userId) {
    res.sendStatus(403);
  }

  res.status(200).send(connection);
}]);

/**
* @swagger
* /api/connections/{id}:
*   patch:
*     summary: Update the status of a connection
*     description: Updates the status of a connection to one of 'accepted', 'active', or 'terminated'.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the connection to update
*         schema:
*           type: string
*           format: uuid
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*                 enum: ['accepted', 'active', 'terminated']
*             example:
*               status: 'accepted'
*     responses:
*       200:
*         description: Successfully updated the connection status
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: string
*                   format: uuid
*                 userId:
*                   type: string
*                   format: uuid
*                 status:
*                   type: string
*                   enum: ['accepted', 'active', 'terminated']
*                 controlledDesktopName:
*                   type: string
*       401:
*         description: Unauthorized - Missing or invalid authentication token
*       403:
*         description: Forbidden - User is not allowed to update this connection
*       404:
*         description: Not Found - Connection with the specified ID does not exist
*       500:
*         description: Internal server error
*     security:
*       - bearerAuth: []
*     tags:
*       - Connections
*/
router.patch('/connections/:id', [checkJwt, checkScopes, (req: Request, res: Response) => {
  const { sub: userId } = req.auth?.payload as JWTPayload;
  const { id } = req.params;
  const { status } = req.body;

  const connection = getConnection(id);
  if(!connection) {
    res.sendStatus(404);
  }
  if(connection?.userId !== userId) {
    res.sendStatus(403);
  }
  
  const updatedConnection = updateConnectionStatus(id, status);

  res.status(200).send(updatedConnection);
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
