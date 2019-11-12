const {app, BrowserWindow, ipcMain} = require('electron')
const {autoUpdater} = require("electron-updater");
const url = require("url");
const path = require("path");

let mainWindow;

function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send('message', text);
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },

  });

  setTimeout(() => {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/IntegratedScreen/index.html`),
        protocol: "file:",
        slashes: true
      })
    );
  }, 2000); // 1 second wasn't enough lol

  // Open the DevTools
  mainWindow.webContents.toggleDevTools();
  mainWindow.maximize();

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow();
});

// autoupdater
autoUpdater.on('update-available', (info) => {
  mainWindow.webContents.send('update_available');
})
autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('update_downloaded');
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
  autoUpdater.checkForUpdatesAndNotify();
})

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
