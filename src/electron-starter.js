/**
 * Electron-Starter is the entry point of the application.
 *
 * It handels several events, like state changes, initiates authentication and also handels
 * connections to native API's
 *
 * Lars Bärtschi, 27.11.2018
 */

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow() {
    // Create the browser window.
    app.mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || `file://${__dirname}/../build/index.html`;
    app.mainWindow.loadURL(startUrl);

    app.mainWindow.on('closed', function () {
        app.mainWindow = null
    })
}

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

// Log the user out, clear browser history and cache
app.on('logout', function() {
    console.log('Logging out...');
    app.mainWindow.webContents.session.clearCache(() => {});
    app.mainWindow.webContents.session.clearStorageData();
    app.mainWindow.webContents.clearHistory();

    app.emit('ready');

    app.mainWindow.close();
});

// If the app content is loaded, start the authentication
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

    // After the user gets redirected to the frontend, close the app window and fetch the JWT token
    app.authWindow.webContents.on('did-navigate', function (event, newUrl) {
        const beginning = "https://panel-beta.twasi.net/?jwt=";

        if (newUrl.startsWith(beginning)) {
            const jwt = newUrl.replace(beginning, '');
            createWindow();

            app.mainWindow.webContents.on('did-finish-load', function() {
                app.mainWindow.webContents.executeJavaScript("window.signin('" + jwt + "')");
            });

            app.authWindow.close();
        }
    });

    // Open OAuth provider in browser
    app.authWindow.loadURL('https://api-beta.twasi.net/auth?environment=https://panel-beta.twasi.net');
});
