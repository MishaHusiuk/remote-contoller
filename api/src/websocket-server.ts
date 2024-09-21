import { WebSocketServer, WebSocket } from "ws";

let wss: WebSocketServer | null = null;

function initWSS() {

    wss = new WebSocket.Server({ port: 8080 });
    
    wss.on('connection', (ws: WebSocket) => {
        console.log('New client connected');
        
        ws.on('message', (message: string) => {
            console.log(`Received message: ${message}`);
            ws.send(`Server received your message: ${message}`);
        });
        
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

function getInstance(): WebSocketServer {
    if (!wss) throw new Error('WebSocket server has not been initialized yet.');
    return wss;
}
    
export {
    initWSS,
    getInstance
};