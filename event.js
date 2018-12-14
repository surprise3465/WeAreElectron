const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

const {ipcRenderer}= require('electron');
const ipcMain = remote.ipcMain;

ipcMain.on('other',(event, obj)=>{
    const labelReturn = document.getElementById("label_return");
    labelReturn.innerText += "\r\n"+obj.data;
})

function onClick_GetSizePosition(){
    const win = remote.getCurrentWindow();
    console.log("X:"+win.getPosition()[0]+" Y:"+win.getPosition()[1]);
    console.log("Width:"+win.getSize()[0]+" Length:"+win.getSize()[1]);
}

function onClick_SetSizePosition(){
    const win = remote.getCurrentWindow();
    win.setSize(1024,768);
    win.setPosition(200,300);
    console.log("X:"+win.getPosition()[0]+" Y:"+win.getPosition()[1]);
    console.log("Width:"+win.getSize()[0]+" Length:"+win.getSize()[1]);
}

function onKSClick(){
    const button = document.getElementById("button")
    const win = remote.getCurrentWindow();
    if(win.isKiosk())    {
        win.setKiosk(false);
        button.innerText = "进入锁定模式"
    }else{
        win.setKiosk(true);
        button.innerText = "离开锁定模式"
    }
}

function onCloseCurrentWinClick(){
    const win = remote.getCurrentWindow();
    win.close();
}

function onCloseAllWinClick(){
    if(global.windows != undefined)
    {
        global.windows.forEach(element => {
            element.close();
        });
        global.windows.length = 0;
        global.windows = undefined;
    }
}

function onCreateMultiWin(){
    if(global.windows == undefined)
    {
        global.windows = [];
    }
    var win = new BrowserWindow({width: 800,height: 600,});
    win.loadURL('www.baidu.com');
    global.windows.push(win);
}

function onClick_SendData(){
    var win = new BrowserWindow({show:false,width: 800,height: 600});
    win.loadURL('file://' + __dirname + '/other.html');
    win.once('ready-to-show', () => {
        win.show();
        win.webContents.send('data',{name:'Bill',salary:23145});
    });
}

function onStartLoad(){
    ipcRenderer.on('data', (event, obj) => {
        const labelName = document.getElementById("label_name");
        const labelSalary = document.getElementById("label_salary");
        labelName.innerText = obj.name;
        labelSalary.innerText = obj.salary;
    });
}

function onCloseOtherClick(){
    const win = remote.getCurrentWindow();   
    ipcRenderer.send('other',{data:'Windows Closed'});  
    win.close();
}