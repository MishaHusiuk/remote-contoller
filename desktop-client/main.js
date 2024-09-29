const { app } = require('electron');

const { createAuthWindow } = require('./main/auth-process');
const createAppWindow = require('./main/app-process');
const authService = require('./services/auth-service');
const envVariables = require('./env-variables.json');

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
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.on('logged-out', () => {
    createAuthWindow();
});