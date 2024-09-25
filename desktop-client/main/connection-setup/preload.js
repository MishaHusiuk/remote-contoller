const { contextBridge } = require('electron');
const { ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'bridge', {
        sendQRImage: (message) => {
            ipcRenderer.on('sendQRImage', message);
        }
    }
);