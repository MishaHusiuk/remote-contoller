const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const { createLogoutWindow } = require('./auth-logout-process'); 
const { createAppWindow: createConnectionSetupWindow } = require('./connection-setup/process');

const createAppWindow = () => {
    let isQuiting;
    let tray;
    let window;

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
            if (BrowserWindow.getAllWindows().length === 0) createAppWindow();
        })
    
        tray = new Tray(path.resolve(__dirname, '../images/RemoteTemplate@2x.png'));
    
        tray.setContextMenu(Menu.buildFromTemplate([
            {
                label: 'Connect',
                click: () => createConnectionSetupWindow()
            },
            {
                label: 'Logout',
                click: () => createLogoutWindow()
            },
            {
                label: 'Quit',
                click: () => {
                    isQuiting = true;
                    app.quit();
                }
            }
        ]));
    
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

module.exports = createAppWindow;