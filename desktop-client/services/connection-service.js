const axios = require('axios');
const envVariables = require('../env-variables.json');
const { getAccessToken } = require('./auth-service');
const generateQrCode = require('../utils/generateQrCode');
const getComputerName = require('../utils/getComputerName');

async function initiateConnection() {
    const computerName = getComputerName();
    const response = await axios({
        method: 'POST',
        url: `${envVariables.apiUrl}/connection`,
        headers: { 
            'Authorization': `Bearer ${getAccessToken()}`,
            'Content-Type': 'application/json'
        },
        data: {
            controlledDesktopName: computerName
        }
    })
    const connection = response.data;
    const data = `${envVariables.webAppUrl}/${connection.id}`;
    return generateQrCode(data);
}

module.exports = {
    initiateConnection
};