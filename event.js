const remote = require('electron').remote;

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
