import http from 'http';
import { Server, Socket } from 'socket.io';
import { authenticateSocket, validateConnection } from './auth';
import { updateConnectionStatus } from './services/connection';

let ws_namespace: any;
const WS_BASE_URL = '/ws';

function initWSS(server: http.Server) {
    const wss = new Server(server);

    ws_namespace = wss.of(WS_BASE_URL);
    const verifyServerPath = (socket: Socket, next: (err?: Error) => void) => {
        const handshake = socket.request;
    
        // Check the URL for the specific route
        if (handshake.headers.referer && handshake.headers.referer.includes(WS_BASE_URL)) {
            next(); // Proceed with connection if it's the correct route
        } else {
            next(new Error('Invalid WebSocket route')); // Reject connection
        }
  
    }

    wss.use(verifyServerPath);
    // Use the authentication middleware for Socket.IO
    ws_namespace.use(authenticateSocket);

    // Then use the connectionId validation middleware
    ws_namespace.use(validateConnection);

    // Listen for connections
    ws_namespace.on('connection', async (socket: Socket) => {
        const connectionId = socket.data.connectionId;
        await updateConnectionStatus(connectionId, 'active');
        socket.join(connectionId);

        socket.on('message', (data) => {
            console.log('Message from client:', data);
            console.log('user: ', socket.handshake.auth.decoded.sub);
        });

        // Send messages back to the client
        ws_namespace.to(connectionId).emit('message', { msg: 'Welcome!' });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
}

function getInstance(): Server {
    if (!ws_namespace) throw new Error('WebSocket server has not been initialized yet.');
    return ws_namespace;
}

export {
    initWSS,
    getInstance,
};