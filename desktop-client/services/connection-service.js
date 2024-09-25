const axios = require('axios');
const envVariables = require('../env-variables.json');
const { getAccessToken } = require('./auth-service');
const generateQrCode = require('../utils/generateQrCode');


async function initiateConnection() {
    const response = await axios({
        method: 'POST',
        url: `${envVariables.apiUrl}/connection`,
        headers: { 'Authorization': `Bearer ${getAccessToken()}` }
    })
    const connection = response.data;
    const data = `${envVariables.webAppUrl}/${connection.id}`;
    return generateQrCode(data);
}

module.exports = {
    initiateConnection
};