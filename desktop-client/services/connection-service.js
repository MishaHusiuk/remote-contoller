const axios = require('axios');
const envVariables = require('../env-variables.json');
const { getAccessToken } = require('./auth-service');
const generateQrCode = require('../utils/generateQrCode');
const getComputerName = require('../utils/getComputerName');
const { initWebSocket, disconnect } = require('../websocket');

async function initiateConnection() {
    const computerName = getComputerName();
    const response = await axios({
        method: 'POST',
        url: `${envVariables.apiUrl}/connections`,
        headers: { 
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        },
        data: {
            controlledDesktopName: computerName
        }
    })
    return response.data;
}

async function getConnectionQRCode (connection) {
  const data = `${envVariables.webAppUrl}/connection?id=${connection.id}`;
  return generateQrCode(data);
}

let pollingTimer = null;
// Polling function to check the status of the connection
async function pollConnectionStatus(connectionId, closeConnectionWindow) {
  // Skip the first poll
  // give user 5 seconds to scan the code, then start normal 3 seconds polling
  if (pollingTimer === null) {
    pollingTimer = setTimeout(() => pollConnectionStatus(connectionId, closeConnectionWindow), 5 * 1000);
  }

  const accessToken = getAccessToken();
  try {
    const response = await axios.get(`${envVariables.apiUrl}/connections/${connectionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { status } = response.data;

    if (['accepted', 'active'].includes(status)) {
      // Connection is accepted, initiate WebSocket connection
      initWebSocket(connectionId, accessToken);
      setActiveConnection(response.data);
      closeConnectionWindow();
    } else {
      // Continue polling if status is not accepted
      if(pollingTimer) {
        stopPollConnectionStatus();
      }
      pollingTimer = setTimeout(() => pollConnectionStatus(connectionId, closeConnectionWindow), 3 * 1000); // Poll every 3 seconds
    }
  } catch (error) {
    console.error('Error polling connection status:', error);
  }
}

function stopPollConnectionStatus() {
  clearTimeout(pollingTimer);
  pollingTimer = null;
};

let currentActiveConnection = null;
function getActiveConnection() {
  return currentActiveConnection;
}
function setActiveConnection(connection) {
  currentActiveConnection = connection;
}

async function terminateConnection() {
  if(!currentActiveConnection) return;
  const response = await axios({
    method: 'PATCH',
    url: `${envVariables.apiUrl}/connections/${currentActiveConnection.id}`,
    headers: { 
        'Authorization': `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json'
    },
    data: {
        status: 'terminated'
    }
  })
  console.log('connection terminated: ', response.data);
  disconnect();
  setActiveConnection(null);
}

module.exports = {
    initiateConnection,
    getConnectionQRCode,
    pollConnectionStatus,
    stopPollConnectionStatus,
    getActiveConnection,
    setActiveConnection,
    terminateConnection
};