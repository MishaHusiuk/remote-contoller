const WebSocket = require('ws');
var robot = require("robotjs");

function initWebSocket(win) {
    const ws = new WebSocket('ws://localhost:8080');

    ws.on('open', () => {
        console.log('Connected to server');

        ws.send('Hello, server!');
    });

    ws.on('message', (message) => {
        win.webContents.send('command', message.toString());
        robot.keyTap("escape");

        console.log(`Received message from server: ${message}`);
    });

    ws.on('close', () => {
        console.log('Disconnected from server');
    });
}

module.exports = {
    initWebSocket
}
