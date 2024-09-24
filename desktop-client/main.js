const { app, BrowserWindow } = require('electron');

const { createAuthWindow } = require('./main/auth-process');
const createAppWindow = require('./main/app-process');
const authService = require('./services/auth-service');
const { initWebSocket } = require('./websocket');

async function showWindow() {
  try {
    await authService.refreshTokens();
    createAppWindow();
    initWebSocket();
  } catch (err) {
    createAuthWindow();
  }
}

app.on('ready', () => {
  showWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.on('logged-out', () => {
    createAuthWindow();
});