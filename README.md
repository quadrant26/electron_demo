# electron_demo
electron

1. 环境配置

    安装 node 和 NPM   

        https://nodejs.org/en/download/

    配置 cnpm

        npm install -g cnpm --registry=https://registry.npm.taobao.org

    安装 electron

        cnpm install electron --save

2. vsCode 配置

    配置 调试

        launch.json ( 注意文件的目录层级 )

        "configurations": [
            {
                "name": "Debug Main Process",
                "type": "node",
                "request": "launch",
                "program": "${workspaceRoot}/main.js",
                "cwd": "${workspaceRoot}",
                "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron"
            }
        ]

    开启智能提示功能

        npm install -g typings //　全局安装typings
        typings install dt~node --global --save　//　安装node的类型接口信息文件。其中dt表示源，node表示名称
        typings install dt~electron --global --save // 安装electron接口信息。

        1. 在需要进行智能提示的文件最上行增加提示信息文件所在目录

            /// <reference path="./typings/index.d.ts" />

        2. 项目的根目录增加一个名为jsconfig.json的空文件,往其中写入

            {
                "compilerOptions": {
                    "target": "ES6"
                },
                "exclude": [
                    "node_modules"
                ]
            }

3. 属性 APIs

    BrowserWindow

        width                               宽度 

        height                              高度 

        backgroundColor                     背景颜色

        parent                              是否指定其父窗口。如果要指定，则需要输入父窗口的变量名。如果父窗口被关闭，则子窗口也被关
        
        show                                是否立即显示。如果=true，则立即显示；如果=false，则在以后调用win.show()显示。一般来讲，可以在放在’ready-to-show’的情况下

        icon                                如果要指定应用的图标，则需要指定图标位置

    win.on(channel,callback)

        closed 和 window-all-closed，分别表示当前窗口关闭和所有窗口关闭时的行为。其他的还有responsive, focus等很多其他事件

    win.once(channel,callback)

        ready-to-show
    
    static方法

        BrowserWindow.getAllWindows() 返回BrowserWindow[]，返回所有窗口。 
        BrowserWindow.getFocusedWindow() 返回当前锁定的窗口 
        BrowserWindow.fromWebContents(webContents) 看样子是从网页获得一个窗口

    win.show()

        show=false, 则调用win.show()能够让窗口显示

    destory()

    close()

    focus()

    isFocused()

    hide()

4. main进程与renderer进程通信

    在electron下，renderer进程与main进程相互通信要通过ipc(Inter-Process Communication，进程间通信)模块来完成。注意，main与renderer进程调用的ipc模块是不一样的。main进程需要调用electron.ipcMain,而renderer进程则要调用electron.ipcRenderer

    renderer进程

        const ipcr = require('electron').ipcRenderer ;
        const btn = document.getElementById('msg-button') ;
        btn.addEventListener('click', ()=>{
            ipcr.send('event-msg', 'ping') ;
        });

        ipcr.on('event-reply', (event, arg)=>{
            const message = `message reply: ${arg}` ;
            document.getElementById('msg-reply').innerHTML = message ;
        });

    main进程

        const ipcm = require('electron').ipcMain

        ipcm.on('event-msg', (event, arg)=>{
            event.sender.send('event-reply', 'pong')
        })

    直行顺序

        1. 首先在renderer进程内，有一个id=msg-button的组件被按下，ipcRenderer向ipcMain发送了一个名叫event-msg的事件，附带参数’ping’
        2. ipcMain收到了ipcRenderer发来的event-msg事件，并做出响应：向ipcRenderer返回一个叫做event-reply的事件，也附带参数’pong’
        3. ipcRenderer收到了event-reply事件，同样做出响应：找到页面内id=msg-reply的元素，将其值更改为:message reply: pong

5. 引入 jquery 和 bootstrap

    1. electron 的 Renderer 端因为注入了 Node 环境，存在全局函数 require，导致jquery 内部环境判断出现问题。

        引入jQuery之前添加这段代码

        window.nodeRequire = require;
        delete window.require;
        delete window.exports;
        delete window.module;

    2. 先用npm安装好bootstrap和jquery，然后使用require来调用(如果无法安装，则加上–global参数)

        window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery.min.js');
        require('../node_modules/bootstrap/dist/js/bootstrap.min.js');

        <link href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
        <script>
            window.$ = window.jQuery = require('../node_modules/jquery/dist/jquery.min.js');
            require('../node_modules/bootstrap/dist/js/bootstrap.min.js');
        </script>

    3. 使用

        $("button").click((e)=>{
            var btn = e.target ;
        })

5. 桌面环境集成

    桌面通知

        let myNotification = new Notification('Title', {
            'body' : 'Lorem Ipsum Dolor Sit Amet'
        })

        myNotification.onclick = () => {
            console.log('Notification clicked');
        }

    最近文件列表

        var app = require('app');
        app.addRecentDocument('/Users/USERNAME/Desktop/work.type');

    清除文件列表

        app.clearRecentDocuments();

    mac 定制菜单

        const electron = require('electron')
        const app = electron.app;
        const Menu = electron.app;

        const dockMenu = Menu.buildFromTemplate([
        {label: 'New Window', click () { console.log('New Window') }},
        {label: 'New Window with Settings',
            submenu: [
            {label: 'Basic'},
            {label: 'Pro'}
            ]
        },
        {label: 'New Command...'}
        ])
        app.dock.setMenu(dockMenu)

    设置应用中的用户任务

        app.setUserTasks([
            {
                program: process.execPath,
                arguments: '--new-window',
                iconPath: process.execPath,
                iconIndex: 0,
                title: 'New Window',
                description: 'Create a new window'
            }
        ])

    清除任务列表

        app.setUserTasks([])

    缩略图工具栏 ( BrowserWindow.setThumbarButtons )

        let win = new BrowserWindow({
            width: 800,
            height: 600
        })
        win.setThumbarButtons([
            {
                tooltip: 'button1',
                icon: path.join(__dirname, 'button1.png'),
                click () { console.log('button1 clicked') }
            },
            {
                tooltip: 'button2',
                icon: path.join(__dirname, 'button2.png'),
                flags: ['enabled', 'dismissonclick'],
                click () { console.log('button2 clicked.') }
            }
        ])

    清空缩略图工具栏    ( 传入空数组即可清空缩略图工具栏 )

        win.setThumbarButtons([])

    快捷方式 

    任务栏的进度条 ( BrowserWindow.setProgressBar )

         win.setProgressBar(0.5)

    任务栏中的叠加层图标 ( windows => BrowserWindow.setOverlayIcon )

        win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
    
    突出显示框架

        win.once('focus', () => win.flashFrame(false))
        win.flashFrame(true) // 在调用 flashFrame 方法后，设置 false 来关闭突出显示

    展示文件窗口 (macOS) => ( 可以使用 BrowserWindow.setRepresentedFilename 和 BrowserWindow.setDocumentEdited  )

        let win = new BrowserWindow()
        win.setRepresentedFilename('/etc/passwd')
        win.setDocumentEdited(true)

    文件拖出窗口

        html:

            <a href="#" id="drag">item</a>
            <script type="text/javascript" charset="utf-8">
            document.getElementById('drag').ondragstart = (event) => {
                event.preventDefault()
                ipcRenderer.send('ondragstart', '/path/to/item')
            }
            </script>

        主进程

            const {ipcMain} = require('electron').ipcMain
            ipcMain.on('ondragstart', (event, filePath) => {
                event.sender.startDrag({
                    file: filePath,
                    icon: '/path/to/icon.png'
                })
            })

6. 在线/离线事件探测

    navigator

        window.alert(navigator.onLine ? 'online' : 'offline')

7. Menu 模块

    Menu

        let m = [
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
            }
        ];
        var menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

8. 通知栏

    Tray

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

9. 弹出框

    dialog

        // 弹出错误提示
        dialog.showErrorBox('title', 'content');

            
        // 弹出选择提示框
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

        // 成功使用这个方法的话，就返回一个可供用户选择的文件路径数组，失败返回 undefined.
        dialog.showOpenDialog([browserWindow, ]options[, callback])

            browserWindow BrowserWindow (可选)
                options Object
                title String
                defaultPath String
                filters Array
                properties Array - 包含了对话框的特性值, 可以包含 openFile, openDirectory, multiSelections and createDirectory
            callback Function (可选)

            filters 当需要限定用户的行为的时候，指定一个文件数组给用户展示或选择. 例如:

                {
                    filters: [
                        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
                        { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
                        { name: 'Custom File Type', extensions: ['as'] },
                        { name: 'All Files', extensions: ['*'] }
                    ]
                }
            extensions 数组应当只包含扩展名，不应该包含通配符或'.'号 (例如 'png' 正确，但是 '.png' 和 '*.png' 不正确). 展示全部文件的话, 使用 '*' 通配符 (不支持其他通配符).

        如果 callback 被调用, 将异步调用 API ，并且结果将用过 callback(filenames) 展示.

        dialog.showOpenDialog({ 
            properties : ['openFile', 'openDirectory']
        }, (files) => {
            console.log(files);
        })

        // 弹出保存文件
        dialog.showSaveDialog({
            title : '保存文件',
            filters : [
                { name : 'some', extensions : ['.js'] }
            ]
        }, (filename) => {
            console.log(filename);
        })

10. 消息通知框 notification

    消息

        Notification.requestPermission();

        Notification.permission == "granted"

        let myNotification = new Notification('Title', {
            'body' : 'Lorem Ipsum Dolor Sit Amet'
        })

        myNotification.onclick = () => {
            console.log('Notification clicked');
        }

11. shell

    在用户默认浏览器中打开URL的示例

        shell.openExternal('url')

    打开文件所在文件夹

        showItemInFolder(fullpath)

    默认打开方式打开文件

        shell.openItem(fullPath)
    
    删除指定路径文件,并返回此操作的状态值(boolean类型).

        shell.moveItemToTrash(fullPath)

11. shortcut ( 注册快捷键 )

    注册快捷键

        const { app, globalShortcut, dialog } = require('electron');

        app.on('ready', () => {
            globalShortcut.register('ctrl+x', function (){
                console.log("已经注册 ctrl+x");

                dialog.showMessageBox({
                    message : '快捷键',
                    type : 'info  ',
                    detail : "已经成功触发快捷键",
                    buttons : ['ok']
                })
            })
        })

        app.on('will-quit', () => {
            globalShortcut.unregisterAll();
        })

12. cliboard, nativeImage

        clipboard.writeText(string)

        let img = nativeImage.createFromPath("../images/app_logo02.png");
        clipboard.writeImage(img);
        const img2 = clipboard.readImage().toDataURL();

13. pdf 

        const pdfPath = path.join(os.tmpdir(), 'myapp.pdf');

        const win = BrowserWindow.getFocusedWindow();

        win.webContents.printToPDF({}, (err, data) => {
            if (err) console.error(err);

            fs.writeFile(pdfPath, data, (error) => {
                if(error) console.error(error);

                shell.openExternal('file://' + pdfPath);
            })
        })


