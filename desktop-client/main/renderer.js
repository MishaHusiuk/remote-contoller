const commandsLog = document.getElementById('commands-log')

window.electronAPI.onCommand((message) => {
    const newCommand = document.createElement('div');
    newCommand.innerHTML = message;
    commandsLog.appendChild(newCommand);
})