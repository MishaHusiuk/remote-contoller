const QRCode = require('qrcode');
const envVariables = require('../env-variables.json');


async function initiateConnection() {
    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1
    }
    const data = envVariables.webAppUrl;
    return new Promise((res, rej) => {
        QRCode.toDataURL(data, opts, function (err, url) {
            if (err) throw rej(err)
            res(url);
        })
    });
}

module.exports = {
    initiateConnection
};