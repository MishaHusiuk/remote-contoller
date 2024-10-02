import express, { Request, Response } from "express";
import { getInstance } from "../websocket-server";
import { startConnection, getConnection, updateConnectionStatus, Connection } from "../services/connection";
import { checkJwt, checkScopes } from "../auth";
import { JwtPayload } from "jsonwebtoken";

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
  res.send("Ok");
});

const logger = (req: Request, _: any, next: any) => {
  if(process.env.DEV_LOGGING) {
    console.log('path: ', req.originalUrl);
    console.log(`headers: `, req.headers);
  }
  next();
}

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
router.post("/connections/:connectionId/commands", [logger, checkJwt, checkScopes, (req: Request, res: Response) => {
  const { commandName } = req.body;
  const { connectionId } = req.params;

  const connection = getConnection(connectionId);
  if(!connection) {
    res.sendStatus(404);
    return;
  }
  if(connection.status !== 'active') {
    res.status(400).send({ error: 'Cannot send commands via non active connection'});
    return;
  }

  sendToWSClient(connection, commandName);

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
router.post('/connections', [logger, checkJwt, checkScopes, (req: Request, res: Response) => {
  const { sub: userId = '' } = req.auth?.payload as JwtPayload;
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
router.get('/connections/:id', [logger, checkJwt, checkScopes, (req: Request, res: Response) => {
  const { sub: userId } = req.auth?.payload as JwtPayload;
  const { id } = req.params;

  const connection = getConnection(id);
  if(!connection) {
    res.sendStatus(404);
    return;
  }
  if(connection?.userId !== userId) {
    res.sendStatus(403);
    return;
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
router.patch('/connections/:id', [logger, checkJwt, checkScopes, (req: Request, res: Response) => {
  const { sub: userId = '' } = req.auth?.payload as JwtPayload;
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

function sendToWSClient(connection: Connection, message: string) {
  const wss = getInstance();
  wss.to(connection.id).emit('message', message);
  // wss.emit('message', message);
};

export default router;
