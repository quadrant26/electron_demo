const electorn = require('electron');
const app = electorn.app;
const BrowserWindow = electorn.BrowserWindow;
const ipcMain = electorn.ipcMain;

const path = require('path');
const url = require('url');

// let myNotification = new Notification('Title', {
//     'body' : 'Lorem Ipsum Dolor Sit Amet'
// })

// myNotification.onclick = () => {
//     console.log('Notification clicked');
// }

let win;
// 在线离线事件探测
let onlineStatusWindow;

function createWindow(){
    win = new BrowserWindow({width: 800, height: 600});

    win.loadURL(url.format({
        pathname : path.join(__dirname, 'index.html'),
        protocol : 'file',
        slashes: true
    }))

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    })

    // 加载菜单栏
    require("./main-process/menu.js");

    // ipcMain and ipcRenderer 通信
    require('./main-process/msg-a');

    // 通知栏图标
    // require('./main-process/tray');

    // dialog
    // require("./main-process/dialog")

    // 快捷键注册
    require('./main-process/shortcut');

    // 保存为pdf
    require('./main-process/pdf');


    // ipcMain.on('ondragstart', (event, filePath) => {
    //     event.sender.startDrag({
    //         file: __dirname + filePath,
    //         icon: '/images/icon_expressive.png'
    //     })
    // })

    // win.setProgressBar(0.5);

    // win.setThumbarButtons([
    //     {
    //       tooltip: 'button1',
    //       icon: path.join(__dirname, '/images/app_logo02.png'),
    //       click () { console.log('button1 clicked') }
    //     },
    //     {
    //       tooltip: 'button2',
    //       icon: path.join(__dirname, '/images/app_logo02.png'),
    //       flags: ['enabled', 'dismissonclick'],
    //       click () { console.log('button2 clicked.') }
    //     }
    // ])

    
    // 当页面加载完成时，会触发`did-finish-load`事件。
    // win.webContents.on('did-finish-load', () => {
    //     win.webContents.send('main-process-messages', 'webContents event "did-finish-load" called');
    // });

    // ipcMain.on('asynchronous-message', (event, arg) => {
    //     // 返回消息
    //     event.sender.send('asynchronous-reply', 'ok');
    // });
}

app.on('ready', createWindow);

app.on('window-all-closed', () =>{
    if( process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('avtivate', ()=>{
    if(win === null){
        createWindow();
    }
})

// console.log(app.addRecentDocument);

app.addRecentDocument('/Users/USERNAME/Desktop/work.type');

ipcMain.on('online-status-changed', (event, status) => {
    console.log(status)
})


// ipcMain.on('synchronous-message', (event, arg) => {
//     event.returnValue = 'ok';
// });