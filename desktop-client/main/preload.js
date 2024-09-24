const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    onCommand: (callback) => ipcRenderer.on('command', (_event, value) => callback(value)),
    logOut: () => ipcRenderer.send('auth:log-out'),
})