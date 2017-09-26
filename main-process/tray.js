const { Tray, Menu } = require('electron');
const path = require('path');

let appIcon = new Tray(path.join(__dirname, '../images/app_logo02.png'));

const menu = Menu.buildFromTemplate([{
    label : '关闭',
    click: () => {
        console.log("windows 出现在右下角任务栏中")
        appIcon.destroy();
    }
}])

appIcon.setToolTip('我的 app');

appIcon.setContextMenu(menu);