const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const { createLogoutWindow } = require('./auth-logout-process'); 
const { createAppWindow: createConnectionSetupWindow } = require('./connection-setup/process');
const { getActiveConnection, terminateConnection, stopPollConnectionStatus } = require('../services/connection-service');

let tray;
let window;
const createAppWindow = () => {
    destroyWindow();

    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        show: false,
    })

    window.loadFile(path.resolve(__dirname, 'index.html'));

    app.whenReady().then(() => {
        tray = new Tray(path.resolve(__dirname, '../images/RemoteTemplate@2x.png'));
        tray.on('click', updateTrayMenu);
        tray.on('right-click', updateTrayMenu);
      
        // Initial tray menu setup
        updateTrayMenu();
    })
};

function updateTrayMenu() {
    const activeConnection = getActiveConnection();
    const menuOptions = Menu.buildFromTemplate([
        !activeConnection 
        ? {
            label: 'Встановити з\'єднання',
            click: () => createConnectionSetupWindow(tray.getBounds())
        }
        : {
            label: 'Завершити з\'єднання',
            click: () => terminateConnection()
        },
        {
            label: 'Вийти з акаунту',
            click: () => {
                destroyWindow();
                terminateConnection();
                stopPollConnectionStatus();
                createLogoutWindow();
            }
        },
        {
            label: 'Закрити',
            click: () => {
                terminateConnection();
                app.quit();
            }
        }
    ])
    tray.setContextMenu(menuOptions);
}

function destroyWindow() {
    if (window) {
        window.close();
        window = null;
    };

    if(tray) {
        tray.destroy();
    }
}

module.exports = createAppWindow;