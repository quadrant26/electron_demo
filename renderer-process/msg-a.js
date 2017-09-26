const { ipcRenderer } = require('electron');

var msga = document.querySelector('#msga');

msga.onclick = () => {
    const msg = ipcRenderer.sendSync('msg-a');
    console.log(msg);

    ipcRenderer.send('msg-a-1')

    ipcRenderer.on('msg-a-1-back', (event, arg) => {
        console.log(arg);
    })  
}

