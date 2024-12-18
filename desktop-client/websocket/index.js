const io = require('socket.io-client');
const { handleCommand } = require('../handlers');
const { WS_URL } = require('../environment-variables.json'); // process.env;


let socket = null;
function initWebSocket(connectionId, accessToken) {
    socket = io(WS_URL, {
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

function disconnect() {
    if(!socket) return;
    socket.disconnect();
}

module.exports = {
    initWebSocket,
    disconnect
}
