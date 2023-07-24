var el, g, ratio, shapes, my = {}

function hanoiMain(mode, rel) {
    var version = '0.935';
    this.mode = typeof mode !== 'undefined' ? mode : 'asc';
    rel = typeof rel !== 'undefined' ? rel : '../';
    var w = 500;
    var h = 300;
    my.clrs = [
        ["PaleGreen", '#98FB98'],
        ["SpringGreen", '#00FF7F'],
        ["Thistle", '#D8BFD8'],
        ["Yellow", '#FFFF00'],
        ["Gold", '#FFD700'],
        ["Pink", '#FFC0CB'],
        ["LightSalmon", '#FFA07A'],
        ["Lime", '#00FF00'],
        ["DarkSeaGreen", '#8FBC8F'],
        ["Orange", '#FFA500'],
        ["Khaki", '#F0E68C'],
        ["Violet", '#EE82EE'],
        ["Teal", '#008080'],
        ["LightBlue", '#ADD8E6'],
        ["SkyBlue", '#87CEEB'],
        ["Blue", '#0000FF'],
        ["Navy", '#000080'],
        ["Purple", '#800080'],
        ["Wheat", '#F5DEB3'],
        ["Tan", '#D2B48C'],
        ["AntiqueWhite", ["SlateBlue", '#6A5ACD'], '#FAEBD7'],
        ["Aquamarine", '#7FFFD4'],
        ["Silver", '#C0C0C0']
    ];
    my.startX = 50
    my.startY = 200
    my.diskHt = 17
    my.poleX = 90;
    my.poleDist = 160;
    my.poleY = 240;
    my.drag = {
        type: 'block',
        q: false,
        n: 0,
        hold: {
            x: 0,
            y: 0
        }
    }
    my.moves = []
    var s = "";
    s += '<style>'
    s += '.btn { display: inline-block; position: relative; text-align: center; margin: 2px; text-decoration: none; font: bold 14px/25px Arial, sans-serif; color: #268; border: 1px solid #88aaff; border-radius: 10px;cursor: pointer; background: linear-gradient(to top right, rgba(170,190,255,1) 0%, rgba(255,255,255,1) 100%); outline-style:none;}'
    s += '.btn:hover { background: linear-gradient(to top, rgba(255,255,0,1) 0%, rgba(255,255,255,1) 100%); }'
    s += '.yy { border: solid 2px #eeeeaa; background: linear-gradient(to top, rgba(255,220,130,1) 0%, rgba(255,255,255,1) 100%);  }'
    s += '.hi { border: solid 2px #eeeeaa; background: linear-gradient(to top, rgba(130,220,255,1) 0%, rgba(255,255,255,1) 100%); box-shadow: 2px 2px 6px #66a; }'
    s += '.lo { border: solid 1px #888888; background: linear-gradient(to top, rgba(170,170,170,1) 0%, rgba(205,205,205,1) 100%);  }'
    s += '</style>'
    s += '<div style="position:relative; width:' + w + 'px; height:' + h + 'px;  margin:auto; display:block; border: none;  border-radius: 10px; box-shadow: 0px 0px 19px 10px rgba(0,0,68,0.46); ">';
    s += '<div id="btns0" style="position:absolute; left:5px; top:3px;">';
    s += '<span style="font: 20px Arial; text-align: center; color: black;">Đĩa: </span>';
    s += '<div id="num" style="display: inline-block; text-align: center; padding: 2px 20px 2px 20px; border-radius: 10px; font: 24px Arial; color: black; background-color: #00bfff ">3</div>';
    s += '<button id="dnBtn" style="margin:0 0 0 2px; font-size: 16px; color: #000aae; " class="btn"  onclick="numDn()" >&#x25BC;</button>';
    s += '<button id="upBtn" style="margin:0;  font-size: 16px; color: #000aae; " class="btn"  onclick="numUp()" >&#x25B2;</button>';
    s += '<span id="moves" style="text-align: center; margin-left: 15px; font: bold 20px Arial; color: darkblue; ">Moves: 0</span>';
    s += '<button style="margin-left: 20px; font-size: 15px; color: #000aae; " class="btn"  onclick="gameNew()" >Thử lại</button>';
    s += '<button style="margin-left: 2px; font-size: 15px; color: #000aae; " class="btn"  onclick="logOpen()" >Dữ liệu</button>';
    s += '<button style="margin-left: 2px; font-size: 15px; color: #000aae; " class="btn"  onclick="solveIt()" >Giải!</button>';
    s += '</div>';
    s += `<div id="logPop" style="position:absolute; left:0; top:40px; font: bold 36px Arial; text-align: center; color: gold;">
  <textarea id="log" style="width:400px; height:200px;"></textarea>
  </div>`
    s += '<div id="disks" style="position:absolute; left:0; top:0;">YO!</div>'
    s += '<div id="success" style="position:absolute; left:0; top:40px; width:' + w + 'px; font: bold 36px Arial; text-align: center; color: gold;">Well Done !</div>';
    s += '<canvas id="canvasId" width="' + w + '" height="' + h + '" style="z-index:2;"></canvas>';
    s += '<div id="info" style="position:absolute; right:20px; bottom:5px; margin-left: 30px; font: 16px Arial; text-align: center; color: black;">Minimum Moves: 7</div>';
    s += '<div id="copyrt" style="position:absolute; left:3px; bottom:3px; font: 10px Arial; font-weight: bold; color: blue; ">&copy; GameVui.VN</div>';
    s += '</div>';
    document.write(s);
    el = document.getElementById('canvasId');
    ratio = 2;
    el.width = w * ratio;
    el.height = h * ratio;
    el.style.width = w + "px";
    el.style.height = h + "px";
    g = el.getContext("2d");
    g.setTransform(ratio, 0, 0, ratio, 0, 0);
    shapes = [];
    my.poles = [];
    this.moveN = 0;
    this.my.diskTot = 3;
    my.logPop = new Pop('logPop', '', '', '', '')
    gameNew();
    el.addEventListener("mousedown", mouseDown, false);
    el.addEventListener('touchstart', touchStart, false);
    el.addEventListener("mousemove", doPointer, false);
}

function logOpen() {
    document.getElementById('log').value = my.log
    my.logPop.open()
}

function getNum() {
    return this.my.diskTot;
}

function numDn() {
    var num = getNum();
    if (num > 3) {
        num--;
        chgNumPts(num);
    }
}

function numUp() {
    var num = getNum();
    if (num < 8) {
        num++;
        chgNumPts(num);
    }
}

function chgNumPts(n) {
    document.getElementById('num').innerHTML = n;
    this.my.diskTot = n;
    gameNew();
}

function drawPoles() {
    for (var i = 0; i < my.poles.length; i++) {
        drawPole(my.poleX + i * my.poleDist, my.poleY);
    }
}

function drawPole(x, y) {
    var wd = 150;
    var ht = 145;
    g.lineWidth = 1;
    g.strokeStyle = "black";
    g.fillStyle = "#d43";
    g.beginPath();
    g.roundRect(x - 3, y - ht, 6, ht, 6, 3);
    g.roundRect(x - wd / 2, y - 3, wd, 8, 4);
    g.closePath();
    g.stroke();
    g.fill();
}

function gameNew() {
    moveNChg(0);
    stopAnim();
    var p0 = [];
    for (var i = my.diskTot - 1; i >= 0; i--) {
        p0.push(i);
    }
    my.poles = [p0, [],
        []
    ];
    disksMake()
    disksPlace()
    g.clearRect(0, 0, g.canvas.width, g.canvas.height)
    drawPoles();
    successTest();
    my.log = ''
    my.logStt = performance.now()
    document.getElementById('info').innerHTML = 'Lần tối thiểu: ' + ((1 << my.diskTot) - 1).toString();
}

function disksMake() {
    var div = document.getElementById('disks')
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    my.disks = [];
    for (var i = 0; i < my.diskTot; i++) {
        var disk = new Disk(0, 0, i)
        div.appendChild(disk.div)
        my.disks.push(disk);
    }
    disksToPoles()
    console.log('disksMake', my.disks)
}

function disksPlace(fastQ = true) {
    for (var i = 0; i < my.disks.length; i++) {
        var disk = my.disks[i];
        disk.x = my.poleX + my.poleDist * disk.pole - disk.wd / 2
        disk.y = my.poleY - disk.polePos * my.diskHt - disk.ht / 5
        disk.moveMe(fastQ)
    }
}

function disksToPoles() {
    my.poles = [
        [],
        [],
        []
    ];
    for (var i = my.disks.length - 1; i >= 0; i--) {
        var disk = my.disks[i];
        my.poles[disk.pole].unshift(i);
        disk.polePos = my.poles[disk.pole].length
    }
}

function touchStart(evt) {
    var touch = evt.targetTouches[0];
    evt.clientX = touch.clientX;
    evt.clientY = touch.clientY;
    evt.touchQ = true;
    mouseDown(evt)
}

function touchMove(evt) {
    var touch = evt.targetTouches[0];
    evt.clientX = touch.clientX;
    evt.clientY = touch.clientY;
    evt.touchQ = true;
    mouseMove(evt);
    evt.preventDefault();
}

function touchEnd(evt) {
    el.addEventListener('touchstart', touchStart, false);
    window.removeEventListener("touchend", touchEnd, false);
    if (my.drag.q) {
        my.drag.q = false;
        my.disks[my.drag.n].hiliteQ = false;
        doDrop(my.drag.n);
        my.drag.n = -1;
        window.removeEventListener("touchmove", touchMove, false);
    }
}

function doPointer(e) {
    var bRect = el.getBoundingClientRect();
    var mouseX = (e.clientX - bRect.left) * (el.width / ratio / bRect.width);
    var mouseY = (e.clientY - bRect.top) * (el.height / ratio / bRect.height);
    var inQ = false;
    for (var i = 0; i < my.disks.length; i++) {
        var disk = my.disks[i]
        if (hitTest(disk, mouseX, mouseY)) {
            if (topDiskQ(i)) {
                inQ = true;
            }
        }
    }
    if (inQ) {
        document.body.style.cursor = "pointer";
    } else {
        document.body.style.cursor = "default";
    }
}

function mouseDown(evt) {
    var i;
    var bRect = el.getBoundingClientRect();
    var mouseX = (evt.clientX - bRect.left) * (el.width / ratio / bRect.width);
    var mouseY = (evt.clientY - bRect.top) * (el.height / ratio / bRect.height);
    for (i = 0; i < my.disks.length; i++) {
        var shape = my.disks[i]
        console.log('mouseDown', my.drag, shape)
        console.log('hitTest', shape.x, shape.y, mouseX, mouseY, shape.wd, shape.ht, hitTest(shape, mouseX, mouseY))
        if (hitTest(shape, mouseX, mouseY)) {
            if (topDiskQ(i)) {
                my.dragStt = performance.now()
                my.drag.q = true;
                console.log('asd', my.drag, shape)
                my.drag.hold.x = mouseX - shape.x;
                my.drag.hold.y = mouseY - shape.y;
                my.drag.n = i;
                my.disks[my.drag.n].hilite(true)
            }
        }
    }
    if (my.drag.q) {
        if (evt.touchQ) {
            window.addEventListener('touchmove', touchMove, false);
        } else {
            window.addEventListener("mousemove", mouseMove, false);
        }
    }
    if (evt.touchQ) {
        el.removeEventListener("touchstart", touchStart, false);
        window.addEventListener("touchend", touchEnd, false);
    } else {
        el.removeEventListener("mousedown", mouseDown, false);
        window.addEventListener("mouseup", mouseUp, false);
    }
    if (evt.preventDefault) {
        evt.preventDefault();
    } else if (evt.returnValue) {
        evt.returnValue = false;
    }
    return false;
}

function mouseUp(evt) {
    el.addEventListener("mousedown", mouseDown, false);
    window.removeEventListener("mouseup", mouseUp, false);
    if (my.drag.q) {
        my.drag.q = false;
        my.disks[my.drag.n].hiliteQ = false;
        doDrop(my.drag.n);
        my.drag.n = -1;
        window.removeEventListener("mousemove", mouseMove, false);
    }
}

function mouseMove(evt) {
    if (my.drag.n < 0) return;
    var bRect = el.getBoundingClientRect();
    var mouseX = (evt.clientX - bRect.left) * (el.width / ratio / bRect.width);
    var mouseY = (evt.clientY - bRect.top) * (el.height / ratio / bRect.height);
    var posX = mouseX - my.drag.hold.x;
    var posY = mouseY - my.drag.hold.y;
    my.disks[my.drag.n].x = posX;
    my.disks[my.drag.n].y = posY;
    my.disks[my.drag.n].moveMe(true)
}

function topDiskQ(n) {
    for (var i = 0; i < my.poles.length; i++) {
        var pole = my.poles[i];
        if (pole.length > 0) {
            if (n == pole[0]) return true;
        }
    }
    return false;
}

function hitTest(shape, mx, my) {
    if (mx < shape.x) return false;
    if (my < shape.y) return false;
    if (mx > (shape.x + shape.wd)) return false;
    if (my > (shape.y + shape.ht)) return false;
    return true;
}

function doDrop(dropNo) {
    var disk = my.disks[dropNo];
    disk.hilite(false)
    var p = Math.round((disk.x - my.poleX) / my.poleDist);
    p = Math.max(0, Math.min(p, 2));
    if (p != disk.pole) {
        var okQ = false;
        var pole = my.poles[p];
        if (pole.length == 0) {
            okQ = true;
        } else {
            var top = pole[0];
            console.log('doDrp', dropNo, top)
            if (dropNo < top) okQ = true;
        }
        if (okQ) {
            console.log("doDrop chg:", disk, disk.pole, p);
            my.log += parseInt(my.dragStt - my.logStt) / 1000 + ', ' + parseInt(performance.now() - my.logStt) / 1000 + ', ' + disk.n + ', ' + disk.pole + ', ' + p + '\n'
            moveNChg(1);
            disk.pole = p;
        }
    }
    disksToPoles()
    disksPlace()
    console.log('my.poles', my.poles)
    successTest();
}

function successTest() {
    document.getElementById('success').innerHTML = "";
    if (isSuccess()) {
        successDo()
    }
}

function isSuccess() {
    var p2 = my.poles[2];
    console.log('isSuccess p2', p2)
    if (p2.length != my.diskTot) return false;
    for (var i = 0; i < my.diskTot; i++) {
        if (p2[i] != i) return false;
    }
    return true;
}

function successDo() {
    document.getElementById('success').innerHTML = "Rất tốt!";
    my.log += parseInt(performance.now() - my.logStt) / 1000 + ', ' + 'Success!' + '\n'
}

function moveNChg(n) {
    if (n == 1) {
        this.moveN++;
    } else {
        this.moveN = 0;
    }
    document.getElementById('moves').innerHTML = 'Lượt: ' + this.moveN;
}

function solveIt() {
    gameNew();
    my.moves = [];
    hanoi(0, 2, 1, this.my.diskTot);
    console.log("solveIt", my.moves.join(':'));
    my.frame = 25;
    my.moveNo = 0;
    moveNChg(0)
    solveAnim();
}

function stopAnim() {
    my.moveNo = my.moves.length + 1;
}

function solveAnim() {
    if (my.moveNo > my.moves.length) return;
    my.frame++;
    if (my.frame > 60) {
        my.frame = 0;
        var move = my.moves[my.moveNo];
        var poleFr = my.poles[move[0]];
        var diskFr = poleFr[0];
        my.disks[diskFr].pole = move[1]
        console.log('anim', poleFr, diskFr, my.disks[diskFr])
        disksToPoles()
        disksPlace(false)
        my.moveNo++;
        moveNChg(1)
    }
    if (my.moveNo < my.moves.length) requestAnimationFrame(solveAnim);
}

function hanoi(from, to, buf, nmv) {
    if (nmv > 1) {
        hanoi(from, buf, to, nmv - 1);
        my.moves.push([from, to]);
        hanoi(buf, to, from, nmv - 1);
    } else {
        my.moves.push([from, to]);
    }
}
class Pop {
    constructor(id, yesStr, yesFunc, noStr, noFunc) {
        this.id = id;
        this.div = document.getElementById(this.id);
        this.div.style = "position:absolute; left:-450px; top:10px; width:auto; padding: 5px; border-radius: 9px; background-color: #88aaff; box-shadow: 10px 10px 5px 0px rgba(40,40,40,0.75); transition: all linear 0.3s; opacity:0; text-align: center; ";
        this.bodyDiv = document.createElement("div");
        this.div.appendChild(this.bodyDiv);
        var yesBtn = document.createElement("button");
        this.div.appendChild(yesBtn);
        if (yesStr.length < 1) {
            yesStr = "&#x2714;";
            yesBtn.style = 'font: 22px Arial;';
        }
        yesBtn.innerHTML = yesStr;
        yesBtn.classList.add('togglebtn');
        yesBtn.onclick = this.yes.bind(this);
        if (false) {
            var noBtn = document.createElement("button");
            this.div.appendChild(noBtn);
            if (noStr.length < 1) {
                noStr = "&#x2718;";
                noBtn.style = 'font: 22px Arial;';
            }
            noBtn.innerHTML = noStr;
            noBtn.classList.add('togglebtn');
            noBtn.onclick = this.no.bind(this);
        }
        this.yesFunc = yesFunc;
        this.noFunc = noFunc;
        return this;
    }
    open() {
        var div = this.div;
        div.style.transitionDuration = "0.3s";
        div.style.opacity = 1;
        div.style.zIndex = 12;
        div.style.left = 10 + 'px';
    }
    yes(me) {
        console.log("me", me);
        var div = document.getElementById(this.id);
        div.style.opacity = 0;
        div.style.zIndex = 1;
        div.style.left = '-999px';
        if (typeof this.yesFunc === "function") {
            this.yesFunc();
        }
    }
    no() {
        console.log("Pop no");
        var div = this.div;
        div.style.opacity = 0;
        div.style.zIndex = 1;
        div.style.left = '-999px';
        if (typeof this.noFunc === "function") {
            this.noFunc();
        }
    }
    bodySet(s) {
        this.bodyDiv.innerHTML = s;
        return s;
    }
}
class Disk {
    constructor(x, y, n) {
        this.x = x;
        this.y = y;
        this.n = n;
        this.wd = (n + 2) * my.diskHt
        this.ht = my.diskHt
        this.pad = 4
        this.pole = 0
        this.hiliteQ = false;
        var ratio = 2
        this.div = document.createElement('div');
        this.div.style.position = "absolute";
        this.div.style.pointerEvents = 'none';
        this.div.style.transitionDuration = "0s";
        document.getElementById('disks').appendChild(this.div);
        this.elFG = document.createElement('canvas');
        this.elFG.style.position = "absolute";
        this.div.appendChild(this.elFG);
        var canWd = (this.wd + this.pad * 2);
        var canHt = (this.ht + this.pad * 2);
        this.elFG.width = canWd * ratio;
        this.elFG.height = canHt * ratio;
        this.elFG.style.width = canWd + "px";
        this.elFG.style.height = canHt + "px";
        this.elFG.style.zIndex = 2;
        this.gFG = this.elFG.getContext("2d");
        this.gFG.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.elBG = document.createElement('canvas');
        this.elBG.style.position = "absolute";
        this.div.appendChild(this.elBG);
        this.elBG.width = canWd * ratio;
        this.elBG.height = canHt * ratio;
        this.elBG.style.width = canWd + "px";
        this.elBG.style.height = canHt + "px";
        this.elBG.style.zIndex = 1;
        this.gBG = this.elBG.getContext("2d");
        this.gBG.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.moveMe(true);
        this.drawMe();
        return this;
    }
    removeMe() {
        this.elFG.parentNode.removeChild(this.elFG);
        this.elBG.parentNode.removeChild(this.elBG);
    }
    moveMe(fastQ = true) {
        if (fastQ) {
            this.div.style.transitionDuration = "0s";
        } else {
            this.div.style.transitionDuration = "0.8s";
        }
        this.div.style.left = (this.x - this.pad) + 'px';
        this.div.style.top = (this.y - this.pad) + 'px';
    }
    drawMe() {
        console.log("drawMe", this.hiliteQ);
        var g = this.gFG;
        g.clearRect(0, 0, g.canvas.width, g.canvas.height)
        if (this.hiliteQ) {
            console.log("hilite", this);
            g.strokeStyle = "rgba(150, 150, 33, 1)";
            g.lineWidth = 1;
        } else {
            g.strokeStyle = "black";
            g.lineWidth = 1;
        }
        g.fillStyle = my.clrs[this.n][1];
        g.beginPath();
        g.roundRect(this.pad, this.pad, this.wd, this.ht, 10);
        g.closePath();
        g.stroke();
        g.fill();
    }
    hilite(onQ) {
        this.hiliteQ = onQ
        this.drawMe()
    }
}

function hex2rgba(hex, opacity) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    return this;
};