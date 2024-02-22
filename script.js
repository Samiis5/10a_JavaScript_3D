const world = document.getElementById('world');
//[x(0),y(1),z(2),rx(3),ry(4),rz(5),width(6),heigth(7),"rgba(124, 34, 46, 0.5)"],
var map = [
    [0,0,0,0,0,0,200,200,"rgba(124, 34, 46, 0.5)"],
    [200,330,-200,0,0,0,200,200,"rgba(112, 124, 34, 0.5)"],
    [200,430,-100,90,0,0,200,200,"rgba(124, 34, 46, 0.5)"],
    [200,230,-100,90,0,0,200,200,"rgba(124, 34, 46, 0.5)"]
];

for(let i = 0; i < 4; i++){
    let newElement = document.createElement('div');
    newElement.className = "square";
    newElement.id = "square"+i;
    newElement.style.position = "absolute";
    newElement.style.height = map[i][7] + "px";
    newElement.style.width = map[i][6]+"px";
    newElement.style.background = map[i][8];
    newElement.style.transform = `translate3d(
        ${1200/2 - map[i][6]/2 + map[i][0]}px, 
        ${800/2 - map[i][7]/2 + map[i][1]}px, 
        ${map[i][2]}px) 
        rotateX(${map[i][3]}deg)
        rotateY(${map[i][4]}deg)
        rotateZ(${map[i][5]}deg)`;
    world.appendChild(newElement);
}