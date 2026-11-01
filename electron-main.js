const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280, 
    height: 720,
    title: "停車大師",
    icon: path.join(__dirname, 'icons/icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false // 允許讀取本機 res/ 與 src/ 目錄的資源
    }
  });
  win.loadFile('index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});