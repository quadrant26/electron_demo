const { app, dialog, globalShortcut } = require('electron');

console.log(globalShortcut.register);

app.on('ready', () => {
    globalShortcut.register('CtrlOrCmd+X', () => {
        console.log("已经注册 Ctrl+X");

        dialog.showMessageBox({
            message : '快捷键',
            type : 'info',
            detail : "已经成功触发快捷键",
            buttons : ['ok']
        })
    })
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
})