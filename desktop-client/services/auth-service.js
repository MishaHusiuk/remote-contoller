const { jwtDecode } = require('jwt-decode');
const axios = require('axios');
const url = require('url');
const keytar = require('keytar');
const os = require('os');
const { 
    AUTH0_DOMAIN,
    AUTH0_API_IDENTIFIER,
    AUTH0_CLIENT_ID,
    AUTH0_REDIRECT_URI,
    KEYTAR_SERVICE
} = require('../environment-variables.json');//process.env;

const keytarAccount = os.userInfo().username;

let accessToken = null;
let profile = null;
let refreshToken = null;

function getAccessToken() {
    return accessToken;
}

function getProfile() {
    return profile;
}

function getAuthenticationURL() {
    return (
        "https://" +
        AUTH0_DOMAIN +
        "/authorize?" +
        'audience=' + AUTH0_API_IDENTIFIER + '&' +
        "scope=openid profile offline_access send:command&" +
        "response_type=code&" +
        "client_id=" +
        AUTH0_CLIENT_ID +
        "&" +
        "redirect_uri=" +
        AUTH0_REDIRECT_URI
    );
}

async function refreshTokens() {
    const refreshToken = await keytar.getPassword(KEYTAR_SERVICE, keytarAccount);

    if (refreshToken) {
        const refreshOptions = {
            method: 'POST',
            url: `https://${AUTH0_DOMAIN}/oauth/token`,
            headers: { 'content-type': 'application/json' },
            data: {
                grant_type: 'refresh_token',
                client_id: AUTH0_CLIENT_ID,
                refresh_token: refreshToken,
            }
        };

        try {
            const response = await axios(refreshOptions);

            accessToken = response.data.access_token;
            profile = jwtDecode(response.data.id_token);
        } catch (error) {
            await logout();

            throw error;
        }
    } else {
        throw new Error("No available refresh token.");
    }
}

async function loadTokens(callbackURL) {
    const urlParts = url.parse(callbackURL, true);
    const query = urlParts.query;

    const exchangeOptions = {
        'grant_type': 'authorization_code',
        'client_id': AUTH0_CLIENT_ID,
        'code': query.code,
        'redirect_uri': AUTH0_REDIRECT_URI,
    };

    const options = {
        method: 'POST',
        url: `https://${AUTH0_DOMAIN}/oauth/token`,
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify(exchangeOptions),
    };

    try {
        const response = await axios(options);

        accessToken = response.data.access_token;
        profile = jwtDecode(response.data.id_token);
        refreshToken = response.data.refresh_token;

        if (refreshToken) {
            await keytar.setPassword(KEYTAR_SERVICE, keytarAccount, refreshToken);
        }
    } catch (error) {
        await logout();

        throw error;
    }
}

async function logout() {
    await keytar.deletePassword(KEYTAR_SERVICE, keytarAccount);
    accessToken = null;
    profile = null;
    refreshToken = null;
}

function getLogOutUrl() {
    return `https://${AUTH0_DOMAIN}/v2/logout`;
}

module.exports = {
    getAccessToken,
    getAuthenticationURL,
    getLogOutUrl,
    getProfile,
    loadTokens,
    logout,
    refreshTokens,
};