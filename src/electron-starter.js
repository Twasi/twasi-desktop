/**
 * Electron-Starter is the entry point of the application.
 *
 * It handels several events, like state changes, initiates authentication and also handels
 * connections to native API's
 *
 * Lars Bärtschi, 27.11.2018
 */

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

function createWindow() {
    // Create the browser window.
    app.mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || `file://${__dirname}/../build/index.html`;
    app.mainWindow.loadURL(startUrl);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    app.mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        app.mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (app.mainWindow === null) {
        createWindow()
    }
});

app.on('logout', function() {
    console.log('Logging out...');
    app.mainWindow.webContents.session.clearCache(() => {});
    app.mainWindow.webContents.session.clearStorageData();
    app.mainWindow.webContents.clearHistory();

    app.emit('ready');

    app.mainWindow.close();
});

// Auth
app.on('ready', () => {
    app.authWindow = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false
        }
    });

    app.authWindow.setTitle("Signing in with Twasi.net...");

    app.authWindow.webContents.on('did-navigate', function (event, newUrl) {
        const beginning = "https://panel-beta.twasi.net/?jwt=";

        if (newUrl.startsWith(beginning)) {
            const jwt = newUrl.replace(beginning, '');
            createWindow();

            app.mainWindow.webContents.on('did-finish-load', function() {
                console.log('loaded, app ready');
                app.mainWindow.webContents.executeJavaScript("window.signin('" + jwt + "')");
            });

            app.authWindow.close();
        }
    });
    app.authWindow.loadURL('https://api-beta.twasi.net/auth?environment=https://panel-beta.twasi.net');
});
