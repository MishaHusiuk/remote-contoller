const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const { createLogoutWindow } = require('./auth-logout-process'); 
const { createAppWindow: createConnectionSetupWindow } = require('./connection-setup/process');
const { getActiveConnection, terminateConnection, stopPollConnectionStatus } = require('../services/connection-service');

let isQuiting;
let tray;
let window;
const createAppWindow = () => {
    destroyWindow();

    // const icon = nativeImage.createFromPath(path.resolve(__dirname, 'images/main-icon/remote.png'));
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        show: false,
        // icon
    })

    window.loadFile(path.resolve(__dirname, 'index.html'));

    app.whenReady().then(() => {
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createAppWindow();
        })
    
        tray = new Tray(path.resolve(__dirname, '../images/RemoteTemplate@2x.png'));
        tray.on('click', updateTrayMenu);
        tray.on('right-click', updateTrayMenu);
      
        // Initial tray menu setup
        updateTrayMenu();
    
        window.on('close', (event) => {
            if (!isQuiting) {
                event.preventDefault();
                window.hide();
                event.returnValue = false;
            }
        });
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
    
    app.on('before-quit', () => {
        isQuiting = true;
    });
};

function updateTrayMenu() {
    const activeConnection = getActiveConnection();
    const menuOptions = Menu.buildFromTemplate([
        !activeConnection 
        ? {
            label: 'Connect',
            click: () => createConnectionSetupWindow(tray.getBounds())
        }
        : {
            label: 'Disconnect',
            click: () => terminateConnection()
        },
        {
            label: 'Logout',
            click: () => {
                tray.destroy();
                destroyWindow();
                terminateConnection();
                stopPollConnectionStatus();
                createLogoutWindow();
            }
        },
        {
            label: 'Quit',
            click: () => {
                isQuiting = true;
                terminateConnection();
                app.quit();
            }
        }
    ])
    tray.setContextMenu(menuOptions);
}

function destroyWindow() {
    if (!window) return;
    window.close();
    window = null;
}

module.exports = createAppWindow;