import {IpcRenderer,app,remote} from 'electron';
 
declare global {
  interface Window {
    require: (module: 'electron') => {
      ipcRenderer: IpcRenderer,
      app:app,
      remote:remote
    };
  }
}
 
const { ipcRenderer,app,remote } = window.require('electron');
