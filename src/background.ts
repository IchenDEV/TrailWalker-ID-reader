'use strict'

import { app, protocol, BrowserWindow, screen } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { ipcMain } from 'electron'
import {machineId, machineIdSync} from 'node-machine-id';

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
let mainWin: BrowserWindow;
let screenWin: BrowserWindow;
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: false, standard: true } }
])


async function createWindow() {
  // Create the browser window.
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) mainWin.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWin.loadURL('app://./index.html/#/')
    //mainWin.webContents.openDevTools()
  }
}


async function createLargeScreenWindow() {
  let displays = screen.getAllDisplays();
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  });
  if (externalDisplay) {
    screenWin = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      x: externalDisplay.bounds.x + 500,
      y: externalDisplay.bounds.y + 50,
      fullscreen: true,
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: true,
        webSecurity: false
      }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await screenWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string + "/#/show")
      if (!process.env.IS_TEST) screenWin.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      screenWin.loadURL('app://./index.html/#/show')
    }
  }


}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()

})



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('createLargeScreenWindow', e => {
  if (screenWin === undefined || screenWin.isDestroyed())
    createLargeScreenWindow()
});
ipcMain.on('closeLargeScreenWindow', e => {
  if (!screenWin?.isDestroyed())
    screenWin?.close();
});
ipcMain.on('window-min', e => {
  mainWin?.minimize();
})
//接收最大化命令
ipcMain.on('window-max', e => {
  if (mainWin.isMaximized()) {
    mainWin?.restore();
  } else {
    mainWin?.maximize();
  }
})
//接收关闭命令
ipcMain.on('window-close', e => {
  if (!screenWin?.isDestroyed())
    screenWin?.close();
  if (!mainWin?.isDestroyed())
    mainWin?.close();
})

ipcMain.on('messagePush', (event, message) => {
  if (!screenWin?.isDestroyed())
    screenWin?.webContents.send('messagePushFromMain', message);
});

ipcMain.on('showInfo', (event, message) => {
  if (!screenWin?.isDestroyed())
    screenWin?.webContents.send('showInfoFromMain', message);
});