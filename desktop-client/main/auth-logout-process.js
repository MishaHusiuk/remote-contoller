const { app, BrowserWindow } = require("electron");
const authService = require('../services/auth-service');

function createLogoutWindow() {
    const logoutWindow = new BrowserWindow({
        show: false,
    });

    logoutWindow.loadURL(authService.getLogOutUrl());

    logoutWindow.on('ready-to-show', async () => {
        await authService.logout();
        logoutWindow.close();
        app.emit('logged-out');
    });
}

module.exports = {
    createLogoutWindow,
};
