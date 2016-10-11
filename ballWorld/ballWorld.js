var color="#000000";
var radius=50;
var times=0;
var redLevel=0;
var greenLevel=0;
var blueLevel=0;
function drawCircle(x,y,pen){
    pen.fillStyle=color;
    pen.beginPath();
    pen.arc(x,y,radius,0,2*Math.PI);
    pen.closePath();
    pen.fill();
}
function getMousePos(canvas, e){
    var rect=canvas.getBoundingClientRect();
    return{x:e.clientX-rect.left,y:e.clientY-rect.top};
}
function createHexCode(r,g,b){
    var rs=r.toString(16);
    var gs=g.toString(16);
    var bs=b.toString(16);
    if (rs.length==1){
        rs="0"+rs;
    }
    if (gs.length==1){
        gs="0"+gs;
    }
    if (bs.length==1){
        bs="0"+bs;
    }
    return "#"+rs+gs+bs;
}
function updateRed(value){
    redLevel=parseInt(value);
    color=createHexCode(redLevel,greenLevel,blueLevel);
    updateHexSpot();
    updateColorSwatch();
}
function updateGreen(value){
    greenLevel=parseInt(value);
    color=createHexCode(redLevel,greenLevel,blueLevel);
    updateHexSpot();
    updateColorSwatch();
}
function updateBlue(value){
    blueLevel=parseInt(value);
    color=createHexCode(redLevel,greenLevel,blueLevel);
    updateHexSpot();
    updateColorSwatch();
}
function updateHexSpot(){
    var hexString="0x"+color.substring(1);
    document.getElementById("hexSpot").innerHTML = hexString;
}
function updateColorSwatch(){
    document.getElementById("swatch").style.backgroundColor=color;
}
function main(){
    var canvas=document.getElementById("myCanvas");
    var pen=canvas.getContext("2d");
    pen.fillStyle="green";
    pen.fillRect(100,100,50,50);
    canvas.addEventListener('click',function(e){
        pen.fillStyle=color;
        var center=getMousePos(canvas, e);
        drawCircle(center.x,center.y,pen);
    });
    
}
