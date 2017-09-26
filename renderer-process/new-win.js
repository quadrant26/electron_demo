const { ipcRenderer } = require('electron');
const BrowserWindow = require('electron').remote.BrowserWindow;

const btn = document.querySelector("#new");

const path = require('path');

let win;

btn.onclick = () => {

    var winId = BrowserWindow.getFocusedWindow().id;

    win = new BrowserWindow({
        width : 100,
        height: 100,
        show: true
    })
    

    win.loadURL(path.join("file:", __dirname, '../new-win.html'));
    win.webContents.openDevTools();
    win.webContents.on('did-finish-load', (event) => {
        win.webContents.send('msg', winId, { name : "king", text : "helloworld"})
    })

    ipcRenderer.on('back', (event, winId, msg) => {
        console.log(msg);
    })
}
