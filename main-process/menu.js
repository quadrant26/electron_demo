const electron = require('electron');
const { Menu, app, ipcMain, BrowserWindow } = electron;

// console.log(Menu);

let template = [
    {
        label : 'Edit',
        submenu : [
            {
                label : 'Undo',
                accelerator : 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label : 'haha',
                click: () => {
                    console.log('haha');
                }
            }
        ]
    },
    {
        label : 'View',
        submenu : [
            {
                label : 'reload',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    console.log('reload')
                }
            }
        ]
    }
]

// 设置任务栏菜单
let menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// OS X
// app.dock.setMenu(menu);

ipcMain.on('show-context-menu', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    menu.popup(win);

})