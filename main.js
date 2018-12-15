//采用javascript严格模式
'use strict';

// 应用的控制模块
const path = require('path');
const {app, BrowserWindow} = require('electron');

var mainWindow = null;

// 当所有窗口都关闭的时候退出应用
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    console.log("window-all-closed");
    app.quit();
  }
});

function createWindow(){

  const windowOptions = {
    width: 1024,
    height: 758,
    backgroundColor: 'FFFF00',
    title: 'We Are Electron',
    icon: 'pic.ico',
    show:false,
  }

  mainWindow = new BrowserWindow(windowOptions);

  /*let child = new BrowserWindow({parent: mainWindow,modal: false, show: false});
  child.loadURL("https://github.com");
  child.once('ready-to-show', () => {
    child.show()
  });*/

// 载入应用的 index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('ready-to-show',function(){
    mainWindow.show();
  })
// 打开开发工具
  //mainWindow.openDevTools();

  // 窗口关闭时触发
  mainWindow.on('closed', function () {
// 想要取消窗口对象的引用，如果你的应用支持多窗口，
    // 通常你需要将所有的窗口对象存储到一个数组中，
    // 在这个时候你应该删除相应的元素
    mainWindow = null;
    console.log("closed");
  });
}
// 当 Electron 结束的时候，这个方法将会生效
// 初始化并准备创建浏览器窗口
app.on('ready', createWindow);

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});