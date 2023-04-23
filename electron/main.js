const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const { spawn } = require("child_process");
const url = require('url')

const core_launch = spawn("py", ["C:/Users/Watchman/watchman_core/launcher.py"]);


core_launch.stdout.on("data", data => {
    console.log(data.toString());
});

core_launch.on("close", code => {
    console.log(`child process exited with code ${code}`);
});

const main_menu = [
    {
        label: 'Сервис',
        submenu: [
            {
                role: 'quit',
                label: 'Выход'
            },
            { role: 'toggleDevTools' },
            {type: 'separator'}
        ]
    }
]

app.disableHardwareAcceleration()
app.whenReady().then(() => {
    let win = new BrowserWindow({
        show: false,
        useContentSize: true,
        minimizable: false,
        title: 'Страж | Omega Copter',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        icon: 'Assets/img/logo.png'
    })
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl).then(r => {
        console.log(r)
        win.webContents.setFrameRate(30)
        win.maximize()
        win.show()
    });

})

const menu = Menu.buildFromTemplate(main_menu)
Menu.setApplicationMenu(null)

app.on('window-all-closed', () => {
    core_launch.stdin.pause();
    core_launch.kill('SIGINT');
    app.quit()
})
