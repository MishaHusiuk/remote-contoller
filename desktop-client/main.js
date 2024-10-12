const { app } = require('electron');
app.disableHardwareAcceleration();
// const path = require('path');
if (require('electron-squirrel-startup')) app.quit();

const { createAuthWindow } = require('./main/auth-process');
const createAppWindow = require('./main/app-process');
const authService = require('./services/auth-service');
const { terminateConnection } = require('./services/connection-service');
const { accessibilityFeaturesSafeguard } = require('./utils/accessibilityFeaturesSafeguard');
const { DEV_SKIP_AUTH } = require('./environment-variables.json');

async function showWindow() {
  console.log('starting application');
  try {
    await accessibilityFeaturesSafeguard();
  } catch(err) {
    console.log('accessibility features check failed', err);
    app.quit();
  }
  try {
    if (!DEV_SKIP_AUTH) {
        await authService.refreshTokens();
    }
    createAppWindow();
  } catch (err) {
    console.log('error hannened: ', err);
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
