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
        default: 
            console.log('command not recognized');
    }
}



module.exports = handle;