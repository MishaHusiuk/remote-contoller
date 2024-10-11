const robot = require('robotjs');
const { systemPreferences } = require('electron');

let interval = null
async function accessibilityFeaturesSafeguard() {
    console.log('process.platform: ', process.platform);
    
    return new Promise((res, rej) => {
        try {
        let hasAccessibilityAccess = systemPreferences.isTrustedAccessibilityClient(false);
        if (hasAccessibilityAccess) { return res(); }
        // Safely simulate a Shift key press to test or request accessibility
        robot.keyTap('shift');
        
        interval = setInterval(() => {
            hasAccessibilityAccess = systemPreferences.isTrustedAccessibilityClient(false);
            if(hasAccessibilityAccess) {
                clearInterval(interval);
                return res();
            }
        }, 1000);
        } catch(err) {
            rej(err);
        }
    });
}

module.exports = {
    accessibilityFeaturesSafeguard
}