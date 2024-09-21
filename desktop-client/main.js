const { app, BrowserWindow } = require('electron');
const path = require('path');
const { initWebSocket } = require('./ws-connection');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
    return win;
};

const initApp = () => {
    const win = createWindow();
    initWebSocket(win);
}

app.whenReady().then(() => {
    initApp();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) initApp();
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})