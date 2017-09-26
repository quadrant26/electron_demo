const { ipcMain } = require('electron');

ipcMain.on('msg-a', (event)=>{
    event.returnValue = 'Hello';
})

ipcMain.on('msg-a-1', (event) => {
    event.sender.send('msg-a-1-back', {name : "quadrant"})
})