const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const { initWebSocket } = require('./websocket');

let isQuiting;
let tray;
let window;

const createWindow = () => {
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

    win.loadFile('index.html');
    window = win;
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

    tray = new Tray(path.join(__dirname, 'images', 'RemoteTemplate@2x.png'));

    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: 'Show app',
            click: () => window.show()
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