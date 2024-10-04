const robot = require('robotjs');
const { systemPreferences } = require('electron');

let interval = null
async function accessibilityFeaturesSafeguard() {
    if (!process.platform === 'darwin') return;
    
    return new Promise((res, rej) => {
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
    });
}

module.exports = {
    accessibilityFeaturesSafeguard
}