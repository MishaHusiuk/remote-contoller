const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const { createLogoutWindow } = require('./auth-logout-process'); 
const { createAppWindow: createConnectionSetupWindow } = require('./connection-setup/process');
const { getActiveConnection, terminateConnection } = require('../services/connection-service');

let isQuiting;
let tray;
let window;
const createAppWindow = () => {

    // const icon = nativeImage.createFromPath(path.resolve(__dirname, 'images/main-icon/remote.png'));
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        show: false,
        // icon
    })

    win.loadFile(path.resolve(__dirname, 'index.html'));
    window = win;

    app.whenReady().then(() => {
        app.on('activate', () => {
            console.log('activated');
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
            click: () => createConnectionSetupWindow()
        }
        : {
            label: 'Disconnect',
            click: () => terminateConnection()
        },
        {
            label: 'Logout',
            click: () => createLogoutWindow()
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

module.exports = createAppWindow;