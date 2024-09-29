const axios = require('axios');
const envVariables = require('../env-variables.json');
const { getAccessToken } = require('./auth-service');
const generateQrCode = require('../utils/generateQrCode');
const getComputerName = require('../utils/getComputerName');

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
  const data = `${envVariables.webAppUrl}/${connection.id}`;
  return generateQrCode(data);
}

let pollingTimer = null;
// Polling function to check the status of the connection
async function pollConnectionStatus(connectionId) {
  // Skip the first poll
  // give user 5 seconds to scan the code, then start normal 3 seconds polling
  if (pollingTimer === null) {
    pollingTimer = setTimeout(() => pollConnectionStatus(connectionId), 5 * 1000);
  }

  const accessToken = getAccessToken();
  try {
    const response = await axios.get(`${envVariables.apiUrl}/connections/${connectionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { status } = response.data;

    if (status === 'accepted') {
      // Connection is accepted, initiate WebSocket connection
      initiateWebSocket(connectionId, accessToken);
    } else {
      // Continue polling if status is not accepted
      if(pollingTimer) {
        stopPollConnectionStatus();
      }
      pollingTimer = setTimeout(() => pollConnectionStatus(connectionId), 3 * 1000); // Poll every 3 seconds
    }
  } catch (error) {
    console.error('Error polling connection status:', error);
  }
}

function stopPollConnectionStatus() {
  clearTimeout(pollingTimer);
  pollingTimer = null;
};

module.exports = {
    initiateConnection,
    getConnectionQRCode,
    pollConnectionStatus,
    stopPollConnectionStatus
};