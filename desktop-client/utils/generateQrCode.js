const QRCode = require('qrcode');

function generateQrCode(data) {
    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1
    }
    return new Promise((res, rej) => {
        QRCode.toDataURL(data, opts, function (err, url) {
            if (err) throw rej(err)
            res(url);
        })
    });
}

module.exports = generateQrCode