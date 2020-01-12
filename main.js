const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
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
  mainWindow.maximize();

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow();
});







