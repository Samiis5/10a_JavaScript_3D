const container = document.getElementById('container');
const world = document.getElementById('world');
//[x(0),y(1),z(2),rx(3),ry(4),rz(5),width(6),heigth(7),"rgba(124, 34, 46, 0.5)"],
var map = [
    [0,100,0,90,0,0,2000,2000,"rgba(124, 34, 46, 0.5)"],//grida
    [0,0,-1000,0,0,0,2000,200,"rgba(135, 234, 146, 0.5)"],//priekseja siena
    [-1000,0,0,0,90,0,2000,200,"rgba(95, 4, 146, 0.5)"],//kreisa siena
    [1000,0,0,0,90,0,2000,200,"rgba(17, 73, 255, 0.5)"],//laba siena
    [0,0,1000,0,0,0,2000,200,"rgba(74, 88, 69, 0.5)"]
];

var mape = [
    [0,100,0,90,0,0,2000,2000,"red"],//grida
    [0,0,-1000,0,0,0,2000,200,"pink"],//priekseja siena
    [-1000,0,0,0,90,0,2000,200,"black"],//kreisa siena
    [1000,0,0,0,90,0,2000,200,"cyan"],//laba siena
    [0,0,1000,0,0,0,2000,200,"green"],
    [0,-100,0,90,0,0,2000,2000,"yellow"],
];

function player(x, y, z, rx, ry, rz) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
}

var pawn = new player(0, 0, 0, 0, 0, 0);

const deg = Math.PI/180;
var vel = 5;
var forward = 0;
var backward = 0;
var left = 0;
var right = 0;
var lock = false;
var canlock = false;
var mouseX = mouseY = 0;

function move(ev, atrums) {
    if(ev.keyCode == 87){
        forward = atrums;
    }
    if(ev.keyCode == 83){
        backward = atrums;
    }
    if(ev.keyCode == 65){
        left = atrums;
    }
    if(ev.keyCode == 68){
        right = atrums;
}
}

document.addEventListener("keydown", (event) => {this.move(event, vel)});

document.addEventListener("keyup", (event) => {this.move(event, 0)});

document.addEventListener("mousemove", (event) => {
    mouseX = event.movementX;
    mouseY = event.movementY;
});

document.addEventListener("pointerlockchange", (event) => {
    lock = !lock;
});

container.onclick = function(){
    if(!lock){
        container.requestPointerLock();
    }
}

function createWorld(pasaule, nosaukums) {
    for(let i = 0; i < pasaule.length; i++){
        let newElement = document.createElement('div');
        newElement.className = "square" + nosaukums;
        newElement.id = "square" + nosaukums + i;
        newElement.style.position = "absolute";
        newElement.style.height = pasaule[i][7] + "px";
        newElement.style.width = pasaule[i][6]+"px";
        newElement.style.background = pasaule[i][8];
        newElement.style.transform = `translate3d(
            ${1200/2 - pasaule[i][6]/2 + pasaule[i][0]}px, 
            ${800/2 - pasaule[i][7]/2 + pasaule[i][1]}px, 
            ${pasaule[i][2]}px) 
            rotateX(${pasaule[i][3]}deg)
            rotateY(${pasaule[i][4]}deg)
            rotateZ(${pasaule[i][5]}deg)`;
        world.appendChild(newElement);
    }
}

createWorld(mape, "pasaule2");

function update() {
    dzt = forward - backward;
    dxt = right - left;
    
    dx = dxt * Math.cos(pawn.ry*deg) - dzt * Math.sin(pawn.ry*deg);
    dz = - dxt * Math.sin(pawn.ry*deg) - dzt * Math.cos(pawn.ry*deg);

    drx = mouseY;
    dry = -mouseX;

    mouseX = mouseY = 0;

    pawn.z += dz;
    pawn.x += dx;

    if(lock){   
        if(pawn.rx + drx < -35){
            pawn.rx = -35;
        }
        if(pawn.rx + drx > 35){
            pawn.rx = 35;
        } else {
            pawn.rx += drx;
        }
        
        pawn.ry += dry;
        console.log(`pawn.rx = ${pawn.rx} un drx = ${drx}`)
    }
    

    world.style.transform = `
        translateZ(600px)
        rotateX(${-pawn.rx}deg)
        rotateY(${-pawn.ry}deg)
        rotateZ(${-pawn.rz}deg)
        translate3d(
            ${-pawn.x}px, 
            ${-pawn.y}px, 
            ${-pawn.z}px
        ) 
    `;
}

game = setInterval(update, 10);