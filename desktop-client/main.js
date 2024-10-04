const { app } = require('electron');
// const path = require('path');

const { createAuthWindow } = require('./main/auth-process');
const createAppWindow = require('./main/app-process');
const authService = require('./services/auth-service');
const envVariables = require('./env-variables.json');
const { terminateConnection } = require('./services/connection-service');

async function showWindow() {
  try {
    if (!envVariables.devSkipAuth) {
        await authService.refreshTokens();
    }
    createAppWindow();
  } catch (err) {
    createAuthWindow();
  }
}

app.on('ready', () => {
  showWindow();
  // const iconPath = path.resolve(__dirname, 'images/main-icon/remote.png');
  // // Set the dock icon on macOS
  // if (process.platform === 'darwin') {
  //   app.dock.setIcon(iconPath);
  // }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      terminateConnection();
      app.quit();
    }
});

app.on('logged-out', () => {
    // terminateConnection();
    createAuthWindow();
});

app.on('before-quit', () => {
  terminateConnection();
});
