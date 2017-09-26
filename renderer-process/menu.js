var menu = document.querySelector("#menu");

const ipcRenderer = require('electron').ipcRenderer;

document.oncontextmenu = menu.onclick = () =>{
    ipcRenderer.send('show-context-menu')
};