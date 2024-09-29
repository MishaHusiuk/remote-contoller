const { BrowserWindow } = require('electron');
const path = require('path');
const { 
    initiateConnection, 
    getConnectionQRCode,
    pollConnectionStatus,
    stopPollConnectionStatus
} = require('../../services/connection-service');

async function createAppWindow() {
    const connection = await initiateConnection();
    const qrImage = await getConnectionQRCode(connection);
    await pollConnectionStatus(connection.id);

    let window = new BrowserWindow({
        width: 270,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    await window.loadFile(path.resolve(__dirname, 'index.html'));
    window.webContents.send('sendQRImage', qrImage); 

    window.on('close', () => {
        window = null;
        stopPollConnectionStatus();
    });
}

module.exports = { createAppWindow };