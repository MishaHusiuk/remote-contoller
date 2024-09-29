// const WebSocket = require('ws');
const io = require('socket.io-client');
const { handleCommand } = require('../handlers');
const { wsServerUrl } = require('../env-variables.json');

function initWebSocket(connectionId, accessToken) {
    const socket = io(wsServerUrl, {
        auth: {
            token: accessToken,
            connectionId
        },
    });

    socket.on('connect', () => {
        console.log('Connected to ws server');
    
        socket.emit('message', { msg: 'Hello from Electron!' });
    });
  
    socket.on('message', (data) => {
        console.log('Message from server:', data);
        handleCommand(data.toString());
    });
    
    socket.on('disconnect', () => {
        console.log('Disconnected from ws server');
    });
    
    socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
    });
}

module.exports = {
    initWebSocket
}
