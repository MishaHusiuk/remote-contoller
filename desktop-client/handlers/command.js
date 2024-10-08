var robot = require("robotjs");

function handle(command) {
    switch(command) {
        case "ESC": 
            robot.keyTap("escape");
            break;
        case "ENTER": 
            robot.keyTap("enter");
            break;
        case "TAB": 
            robot.keyTap("tab");
            break;
        case "LEFT": 
            robot.keyTap("left");
            break;
        case "RIGHT": 
            robot.keyTap("right");
            break;
        case "UP": 
            robot.keyTap("up");
            break;
        case "DOWN": 
            robot.keyTap("down");
            break;
        case "SPACE": 
            robot.keyTap("space");
            break;
        case "AUDIO_MUTE": 
            robot.keyTap("audio_mute");
            break;
        case "AUDIO_VOLUME_DOWN": 
            robot.keyTap("audio_vol_down");
            break;
        case "AUDIO_VOLUME_UP": 
            robot.keyTap("audio_vol_up");
            break;
        case "AUDIO_PLAY": 
            robot.keyTap("audio_play");
            break;
        case "AUDIO_STOP": 
            robot.keyTap("audio_stop");
            break;
        case "AUDIO_PAUSE": 
            robot.keyTap("audio_pause");
            break;
        case "AUDIO_PREVIOUS": 
            robot.keyTap("audio_prev");
            break;
        case "AUDIO_NEXT": 
            robot.keyTap("audio_next");
            break;
        default: 
            console.log('command not recognized');
    }
}



module.exports = handle;