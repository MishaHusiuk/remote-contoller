const { BrowserWindow } = require('electron');
const path = require('path');
const { 
    initiateConnection, 
    getConnectionQRCode,
    pollConnectionStatus,
    stopPollConnectionStatus
} = require('../../services/connection-service');

let window = null;
async function createAppWindow() {
    destroyWindow();
    const connection = await initiateConnection();
    const qrImage = await getConnectionQRCode(connection);

    window = new BrowserWindow({
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

    await pollConnectionStatus(connection.id, destroyWindow);
}

function destroyWindow() {
    if (!window) return;
    window.close();
    window = null;
}

module.exports = { createAppWindow };