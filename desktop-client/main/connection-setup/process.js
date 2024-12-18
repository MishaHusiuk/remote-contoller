const { BrowserWindow, screen } = require('electron');
const path = require('path');
const { 
    initiateConnection, 
    getConnectionQRCode,
    pollConnectionStatus,
    stopPollConnectionStatus
} = require('../../services/connection-service');

const WINDOW_WIDTH = 270;
const WINDOW_HEIGHT = 270;

let window = null;
async function createAppWindow(trayBounds, screenSize) {
    destroyWindow();
    const connection = await initiateConnection();
    const qrImage = await getConnectionQRCode(connection);
    const { x, y } = calculateWindowPosition(trayBounds, screenSize);

    window = new BrowserWindow({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        },
        frame: false,
        show: false,
        resizable: false,  // Disables resizing and removes maximize button
        minimizable: false,
        movable: false,
        alwaysOnTop: true,
    });

    await window.loadFile(path.resolve(__dirname, 'index.html'));
    
    window.webContents.send('sendQRImage', qrImage); 
    
    window.setPosition(x, y);
    window.show();
    
    // window.on('close', () => {
    //     window = null;
    //     stopPollConnectionStatus();
    // });

    window.on('blur', () => {
        window.hide(); // or use qrWindow.close() if you want to destroy it
    });

    await pollConnectionStatus(connection.id, destroyWindow);
}

function destroyWindow() {
    stopPollConnectionStatus();
    if (!window) return;
    window.close();
    window = null;
}


function calculateWindowPosition(trayBounds) {
    // const trayBounds = tray.getBounds(); // Get the position of the tray icon
    const primaryDisplay = screen.getPrimaryDisplay(); // Get the screen information
    const { width } = primaryDisplay.workAreaSize; // Get screen size
    
    // Calculate the position to open the window near the tray icon
    let x, y;
    
    if (process.platform === 'win32') {
        // Windows: Position above the tray
        x = trayBounds.x + trayBounds.width / 2 - WINDOW_WIDTH / 2;
        y = trayBounds.y - WINDOW_HEIGHT;  // Open above the tray icon
    } else if (process.platform === 'darwin') {
        // macOS: Position above the tray
        x = trayBounds.x + trayBounds.width / 2 - WINDOW_WIDTH / 2;
        y = trayBounds.y + trayBounds.height + 3;  // Below tray icon on macOS
    } else {
        // Linux: Position above the tray
        x = trayBounds.x + trayBounds.width / 2 - WINDOW_WIDTH / 2;
        y = trayBounds.y - WINDOW_HEIGHT;
    }

    // Ensure the window stays within screen bounds
    if (x + WINDOW_WIDTH > width) {
        x = width - WINDOW_WIDTH;
    }
    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }

    return { x, y };
}

module.exports = { createAppWindow };