//samuel li emily wen

//game is not active initially
var onGame=false;

//display game page
function actualGame()
{
    var coverPage=document.getElementById("coverPage");
    var instructions=document.getElementById("instructions");
    var actualGame=document.getElementById("actualGame");
    var title=document.getElementById("title");
    var blankSpace=document.getElementById("blankSpace");
    var gameButton=document.getElementById("gameButton");
    blankSpace.style.display="none";
    gameButton.style.display="block";
    title.style.display="block";
    coverPage.style.display="none";
    instructions.style.display="none";
    actualGame.style.display="block";
    onGame=true;
    console.log("game start", onGame);
}

//display instruction page
function instructions()
{
    var coverPage=document.getElementById("coverPage");
    var instructions=document.getElementById("instructions");
    var actualGame=document.getElementById("actualGame");
    var title=document.getElementById("title");
    var blankSpace=document.getElementById("blankSpace");
    var gameButton=document.getElementById("gameButton");
    blankSpace.style.display="block";
    gameButton.style.display="none";
    title.style.display="none";
    coverPage.style.display="none";
    instructions.style.display="block";
    actualGame.style.display="block";
    onGame=false;
    console.log("game start", onGame);
}

//player1
var x1=100;
var y1=200;
var d1=45;
var c1="red";
var C1="orange";

//player2
var x2=700;
var y2=200;
var d2=45;
var c2="blue";
var C2="green";

//default variables
var r=30;
var k;
var ofArray;
var minY, maxY, minX, maxX;

//take cos x
function cosd(x)
{
    return Math.cos(x*Math.PI/180);
}
//take sin x
function sind(x)
{
    return Math.sin(x*Math.PI/180);
}
//clear canvas
function clear()
{
    var canvas=document.getElementById("myCanvas");
    var pen=canvas.getContext("2d");
    pen.clearRect(0,0,canvas.width,canvas.height);
}
//create squares x y degrees color Color pen
function drawSquare(x,y,d,c,C,pen)
{
    pen.fillStyle=c;
    pen.beginPath();
    pen.moveTo(x+r*cosd(d),y+r*sind(d));
    for (var i=0; i<4;i++){
        pen.lineTo(x+r*cosd(90*i+d),y+r*sind(d+90*i));
    }
    pen.closePath();
    pen.stroke();
    pen.fill();
    
    pen.fillStyle=C;
    pen.beginPath();
    pen.moveTo(x,y);
    pen.lineTo(x+r*cosd(d+180),y+r*sind(d+180));
    pen.lineTo(x+r*cosd(d+270),y+r*sind(270+d));
    pen.closePath();
    pen.stroke();
    pen.fill();
}
//bottom boundaries y degrees
function bottomYoverflow(y,d)
{
    var canvas=document.getElementById("myCanvas");
    maxY=y+r*sind(d);
    for (var i=1; i<4;i++)
    {
        if (maxY<y+r*sind(90*i+d))
        {
            maxY=y+r*sind(90*i+d);
        }
    }
    return maxY-canvas.height;
}
//top boundaries y degrees
function topYoverflow(y,d)
{
    minY=y+r*sind(d);
    for (var i=1; i<4;i++)
    {
        if (minY>y+r*sind(90*i+d))
        {
            minY=y+r*sind(90*i+d);
        }
    }
    return minY;
}
//right boundaries x degrees
function rightXoverflow(x,d)
{
    var canvas=document.getElementById("myCanvas");
    maxX=x+r*cosd(d);
    for (var i=1; i<4;i++)
    {
        if (maxX<x+r*cosd(90*i+d))
        {
            maxX=x+r*cosd(90*i+d);
        }
    }
    return maxX-canvas.width;    
}
//left boundaries x degrees
function leftXoverflow(x,d)
{
    minX=x+r*cosd(d);
    for (var i=1; i<4;i++)
    {
        if (minX>x+r*cosd(90*i+d))
        {
            minX=x+r*cosd(90*i+d);
        }
    }
    return minX;
}
//test collisions for player1 player2 x y degrees
function checkOverflow(x,y,d)
{
    k=topYoverflow(y,d);
    if (k<0)
    {
        y=y-k;
        x=x-k/sind(45+d)*cosd(d+45);
    }   
    k=bottomYoverflow(y,d);
    if (k>0)
    {
        console.log("start: " +x + " " +y);
        y=y-k;
        x=x-k/sind(45+d)*cosd(d+45);
    }
    k=rightXoverflow(x,d);
    if (k>0)
    {
        x=x-k;
        y=y-k/cosd(45+d)*sind(d+45);
    }
    k=leftXoverflow(x,d);
    if (k<0)
    {
        x=x-k;
        y=y-k/cosd(45+d)*sind(d+45);
    }
    return [x,y]; 
}

//draw canvas boundaries for bullets using hardcoded values pen
function drawBoundaries(pen){
    pen.fillStyle="black";
    pen.fillRect(0,0,1,400);
    pen.fillRect(0,0,800,1);
    pen.fillRect(799,0,1,400);
    pen.fillRect(0,399,800,1);
}

function main()
{
    //array of bullets for player1 player2 and array of maze
    var player1Bullets=[];
    var player2Bullets=[];
    var mazeArray=[];

    var coverPage=document.getElementById("coverPage");
    var instructions=document.getElementById("instructions");
    var actualGame=document.getElementById("actualGame");
    var title=document.getElementById("title");
    var blankSpace=document.getElementById("blankSpace");
    var gameButton=document.getElementById("gameButton");
    blankSpace.style.display="none";
    gameButton.style.display="none";
    title.style.display="none";
    coverPage.style.display="block";
    instructions.style.display="none";
    actualGame.style.display="none";

    //canvas
    var canvas=document.getElementById("myCanvas");
    var pen=canvas.getContext("2d");

    //draw player1 player2
    drawSquare(x1,y1,d1,c1,C1,pen);
    drawSquare(x2,y2,d2,c2,C2,pen);

    //draw boundaries for bouncing off canvas edge
    drawBoundaries(pen);
    //create boundaries in middle of canvas x y w h pen
    var m1=new Maze(195,100,10,200,pen);
    var m2=new Maze(585,100,10,200,pen);
    var m3=new Maze(395,0,10,100,pen);
    var m4=new Maze(395,300,10,100,pen);
    var m5=new Maze(300,195,200,10,pen);
    mazeArray.push(m1,m2,m3,m4,m5);

    
    console.log("game start", onGame);
    //keep track keypresses in map to allow for multiple keypresses
    var map={};
    //define keydown=keyup for reasons
    onkeydown=onkeyup=function(e){
        e=e||window.event;
        map[e.keyCode]=e.type=='keydown';
        //player 1 is red
        if (onGame){
        if (map[38]) //up arrow
        {
            
                y1=y1-5*sind(d1+45);
                x1=x1-5*cosd(d1+45);
        }
        else if (map[40]) //down arrow
        {
                y1=y1+5*sind(d1+45);
                x1=x1+5*cosd(d1+45);
        }
        else if (map[39]) //right arrow
        {
            d1=d1+5;
        }
        else if (map[37]) //left arrow
        {
            d1=d1-5;  
        }
        else if (map[32]) //space
        {   
            //max 5 bullets
            if (player2Bullets.length<5){
                var bullet = new Bullet(x1,y1,d1,"orange",pen);
                player2Bullets.push(bullet);
                if (player2Bullets.length>0){
                    //despawn bullets
                    setTimeout(function(){player2Bullets.shift()},4000);
                }
            }
        }
       
       //player 2 is blue
        if (map[87]) //w
        {
            
                y2=y2-5*sind(d2+45);
                x2=x2-5*cosd(d2+45);
        }
        else if (map[83]) //s
        {
                y2=y2+5*sind(d2+45);
                x2=x2+5*cosd(d2+45);
        }
        else if (map[68]) //d
        {
            d2=d2+5;
        }
        else if (map[65]) //a
        {
            d2=d2-5;   
        }
        else if (map[81]) //q
        {
            //max 5 bullets
            if (player1Bullets.length<5){
                var bullet = new Bullet(x2,y2,d2,"green",pen);
                player1Bullets.push(bullet);
                if (player1Bullets.length>0){
                    //despawn bullets
                    setTimeout(function(){player1Bullets.shift()},4000);
                }
            }
        }
        

        ofArray=checkOverflow(x1,y1,d1); 
        x1=ofArray[0];
        y1=ofArray[1];
        ofArray=checkOverflow(x2,y2,d2); 
        x2=ofArray[0];
        y2=ofArray[1];
        //clear and redraw canvas
        clear();  
        drawSquare(x1,y1,d1,c1,C1,pen);
        drawSquare(x2,y2,d2,c2,C2,pen);
        drawBoundaries(pen);
        //draw maze
        mazeArray.forEach(function(m){
            m.mazeDraw();
        });

        }  
        
        //update bullets
        player1Bullets.forEach(function(bullet){
            bullet.bulletUpdate();
            bullet.bulletDraw();
        });
        player2Bullets.forEach(function(bullet){
            bullet.bulletUpdate();
            bullet.bulletDraw();
        });
    };

    //move bullets
    var updateBullet=setInterval(update,50);
    function update(){
        clear();
        drawSquare(x1,y1,d1,c1,C1,pen);
        drawSquare(x2,y2,d2,c2,C2,pen);
        drawBoundaries(pen);

        mazeArray.forEach(function(m){
            m.mazeDraw();
        });
        if (onGame){
            player1Bullets.forEach(function(bullet){
                bullet.bulletUpdate();
                bullet.bulletDraw();
            });
            player2Bullets.forEach(function(bullet){
                bullet.bulletUpdate();
                bullet.bulletDraw();
            });
        }else{
            player1Bullets.forEach(function(bullet){
                bullet.bulletDraw();
            });
            player2Bullets.forEach(function(bullet){
                bullet.bulletDraw();
            });
        }
    }
}

//draw maze x y width height pen
function Maze(x,y,w,h,pen){
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.mazeDraw=function(){
        pen.fillStyle="black";
        pen.fillRect(this.x,this.y,this.w,this.h);
    }
}

//creates bullets x y degrees color pen
function Bullet(x,y,d,c,pen)
{
    var bulletspeed=15;
    var incrementer=0;
    this.x=x+5;
    this.y=y+5;
    this.xvel=cosd(d-135)*bulletspeed;
    this.yvel=sind(d-135)*bulletspeed;

    //update position
    this.bulletUpdate=function(){
        if(this.y<10||this.y>390){
            this.yvel=-this.yvel;
        }
        if(this.x<10||this.x>790){
            this.xvel=-this.xvel;
        }
        //collide with the maze walls
        if(this.y<310&&this.y>90){
            if(this.x<215&&this.x>185||this.x<615&&this.x>585){
                this.xvel=-this.xvel;
            }
        }
        if(this.y<110||this.y>290){
            if(this.x<415&&this.x>385){
                this.xvel=-this.xvel;
            }
        }
        if(this.y<215&&this.y>185){
            if(this.x<510&&this.x>290){
                this.yvel=-this.yvel;
            }
        }
        this.x+=this.xvel;
        this.y+=this.yvel;
    }

    //draw bullet
    this.bulletDraw=function(){
        pen.beginPath();
        pen.arc(this.x,this.y,10,0,2*Math.PI);
        pen.fillStyle=c;
        pen.closePath();
        pen.fill();
    }
}

