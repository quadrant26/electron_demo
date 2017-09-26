// 渲染进程

// 引入 ipcRenderer 对象
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

// 设置监听
ipcRenderer.on('main-process-messages', (event, message) => {
    console.log('message from main Process:' , message); // Prints Main Process Message.
})

// 渲染进程需要给主进程发生消息
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log('asynchronous-reply: %O %O', event, arg);
});
ipcRenderer.send('asynchronous-message', 'hello');
  
// console.log('synchronous-message: ', ipcRenderer.sendSync('synchronous-message', 'hello'));