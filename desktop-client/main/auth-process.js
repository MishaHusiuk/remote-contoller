const { BrowserWindow, app } = require('electron');
const authService = require('../services/auth-service');
const createAppWindow = require('../main/app-process');

let win = null;

function createAuthWindow() {
    destroyAuthWin();

    win = new BrowserWindow({
        width: 700,
        height: 850,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: false
        }
    });

    win.loadURL(authService.getAuthenticationURL());

    const { session: { webRequest } } = win.webContents;

    const filter = {
        urls: [
            'http://localhost/callback*'
        ]
    };

    webRequest.onBeforeRequest(filter, async ({ url }) => {
        await authService.loadTokens(url);
        createAppWindow();
        return destroyAuthWin();
    });

    win.on('authenticated', () => {
        destroyAuthWin();
    });

    win.on('closed', () => {
        app.quit();
    });
}

function destroyAuthWin() {
    if (!win) return;
    win.close();
    win = null;
}

module.exports = {
    createAuthWindow
};