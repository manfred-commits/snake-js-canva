const canvas= document.getElementById("game");
const context=canvas.getContext("2d");

import * as Utils from "./script2.js";

class SnakePart{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
}
// speed of the game, it get's divided by 1000 milliseconds to 
// get the equivalent in seconds
let speed=2;

// variables for size
let cellsCount=20;
let cellSize=canvas.width/ cellsCount;

// snake
let headX=10;
let headY=10;

const snakeParts=[];
let tailLenght=2;

// variables for position
let xSpeed=0;
let ySpeed=0;

// apple
let appleX=5;
let appleY=5;

// score
let score=0;

// function that is 
function gameLoop(){

    changeSnakePosition();

    // if game over is true, so the game encountered an occurence that produces a game over
    if(gameOver()){
        document.getElementById("game_text").innerHTML="Game over";
        return;

    }

    gameBoard();
    appleCollision();
    appleCreation();
    snakeCreation();
    scoreCreation();
    

    setTimeout(gameLoop, 1000/ speed);
    // Utils.hello();
}

function scoreCreation(){
    context.fillStyle="white";
    context.font="bold 1.5rem DotGothic16";
    context.fillText("Punteggio "+score, 10, canvas.height-10)
}

function gameOver(){
    let gameCondition=false;

    if(xSpeed==0 && ySpeed==0){
        return false;
    }
    if(headX<0){
        gameCondition=true;
    }else if(headX>cellsCount-1){
        gameCondition=true;
    }else if(headY<0){
        gameCondition=true;
    }else if(headY>cellsCount-1){
        gameCondition=true;
    }
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i];
        if(part.x == headX && part.y==headY){
            gameCondition=true;
            return gameCondition;
        }
    }
    // snakeParts.forEach((part)=>{

        // if(part.x == headX && part.y){
        //     gameCondition=true;
        //     return;
        // }

    // });    
    return gameCondition;
}


function gameBoard(){
    // gameBoard color
    context.fillStyle='black';

    // method of the Canvas 2D API draws a rectangle that is filled according
    //  to the current fillStyle
    // .fillRect(x, y, width, height);
    context.fillRect(0,0,canvas.width,canvas.height);
}
function snakeCreation(){
    
    context.fillStyle="green";
    for(let i=0;i<snakeParts.length;i++){
        let part=snakeParts[i];
        context.fillRect(part.x*cellsCount,part.y*cellsCount,cellSize,cellSize);
    }
    // pushes a an item (tail piece) in the array snake pars that generates the tails
    snakeParts.push(new SnakePart(headX,headY));
    if(snakeParts.length>tailLenght){
        //remove first element in the list
        snakeParts.shift();

    }
    // head of the snake
    context.fillStyle="green";
    context.fillRect(headX*cellsCount,headY*cellsCount,cellSize,cellSize);
}

function changeSnakePosition(){
    headX=headX+xSpeed;
    headY=headY+ySpeed;
}
function appleCollision(){
    if(headX==appleX && headY==appleY){
        appleX=Math.floor(Math.random() * cellsCount);
        appleY=Math.floor(Math.random() * cellsCount);
        tailLenght++;
        score++;
        speed=speed+0.2;
    }
}
function appleCreation(){
    context.fillStyle="red";
    context.fillRect(appleX*cellsCount,appleY*cellsCount,cellSize,cellSize);
}
// key input eventListener
document.body.addEventListener("keydown", function (event){

    if(event.key=="ArrowUp"){
        console.log("up")
        if(ySpeed ==1){
            return;
        }
        // applies a constant decrement to change the position of the snake head
        ySpeed=-1;
        xSpeed=0;
    }
    if(event.key=="ArrowDown"){
        console.log("down")
        if(ySpeed ==-1){
            return;
        }
        // applies a constant decrement to change the position of the snake head
        ySpeed=1;
        xSpeed=0;
    }
    if(event.key=="ArrowLeft"){
        console.log("left")
        if(xSpeed==1){
            return;
        }
        // applies a constant decrement to change the position of the snake head
        ySpeed=0;
        xSpeed=-1;
    }
    if(event.key=="ArrowRight"){
        console.log("right")
        if(xSpeed ==-1){
            return;
        }
        // applies a constant decrement to change the position of the snake head
        ySpeed=0;
        xSpeed=1;
    }

});


gameLoop();