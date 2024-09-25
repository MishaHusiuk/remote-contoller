const { BrowserWindow } = require('electron');
const path = require('path');
const { initiateConnection } = require('../../services/connection-service'); 

async function createAppWindow() {
    const qrImage = await initiateConnection();
    let window = new BrowserWindow({
        width: 270,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    await window.loadFile(path.resolve(__dirname, 'index.html'));
    window.webContents.send('sendQRImage', qrImage); 

    window.on('closed', () => {
        window = null;
    });
}

module.exports = { createAppWindow };