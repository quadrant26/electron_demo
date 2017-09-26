const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const path = require('path');

let win;

// console.log(electron);

var click = document.querySelector("#click");

click.onclick = () => {
    // window.open("http://www.baidu.com");

    win = new BrowserWindow({
        width : 300, 
        height: 300,
        frame : false,     // 是否显示窗口栏
        transparent: true // 透明
    })

    win.on('closed', () => {
        win = null;
    })

    // win.on('show')
    // win.on('hide')

    win.loadURL(path.join('file:', __dirname, '../model.html'))

    // open('../model.html');
}