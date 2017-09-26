const { dialog } = require('electron');

dialog.showErrorBox('title', 'content');

dialog.showMessageBox({
    type : 'info',
    title : 'message',
    message : 'hello',
    buttons : ["ok", 'cancel']
}, (index) => {
    if( index === 0){
        console.log('you clicked ok!');
    }else{
        console.log('you clicked failed!');
    }
})

dialog.showOpenDialog({
    properties : ['openFile', 'openDirectory']
}, (files) => {
    console.log(files);
})

dialog.showSaveDialog({
    title : '保存文件',
    filters : [
        { name : 'some', extensions : ['.js'] }
    ]
}, (filename) => {
    console.log(filename);
})