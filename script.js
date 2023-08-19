let candies=["Red","Blue","Purple","Orange","Yellow","Green"];
let board=[];
var cols=10;
var rows=10;
var score=0;
var currentCandy;
var targetCandy;
window.onload=function(){
    startGame();
    window.setInterval(function(){
        candyCrush();
        slideDownCandy();
        generateNewCandies();
    },100);
}
function randomCandy(){
    return candies[Math.floor(Math.random()*candies.length)];
}
function startGame(){
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<cols;c++){
            let candyTile=document.createElement("img");
            candyTile.id=r.toString()+"-"+c.toString();
            candyTile.src="./assets/"+randomCandy()+".png";
            
            
            //dragging and dropping or shifting
            candyTile.addEventListener("dragstart",clickCandy);
            candyTile.addEventListener("dragover",moveCandy);
            candyTile.addEventListener("dragenter",candyOverAnother);
            candyTile.addEventListener("drop",dropCandy);//drop=dragleave
            candyTile.addEventListener("dragend",shiftCandy);

            document.getElementById("candy-board").append(candyTile);
            row.push(candyTile);
        }
        board.push(row);
    }
}
function clickCandy(){
    currentCandy=this;
}
function moveCandy(e){
    e.preventDefault();
}
function candyOverAnother(e){
    e.preventDefault();
}
function dropCandy(){
    targetCandy=this;
}
function shiftCandy(){
    if(currentCandy.src.includes("blank") || targetCandy.src.includes("blank")){
        return;//no swapping happen in this case???
    }


    //swap current and target means their image source if nearer and shiftable
    let currentIndex=currentCandy.id.split("-");//gives the array with 2 element x-y i.e x and y
    let currentRow=parseInt(currentIndex[0]);
    let currentColumn=parseInt(currentIndex[1]);
    let targetIndex=targetCandy.id.split("-");//gives the array with 2 element x-y i.e x and y
    let targetRow=parseInt(targetIndex[0]);
    let targetColumn=parseInt(targetIndex[1]);
    
    let moveLeft=(targetColumn==currentColumn-1) && (targetRow==currentRow);
    let moveRight=(targetColumn==currentColumn+1) && (targetRow==currentRow);
    let moveUp=(targetColumn==currentColumn) && (targetRow==currentRow-1);
    let moveDown=(targetColumn==currentColumn) && (targetRow==currentRow+1);

    let adjacent=moveDown||moveUp||moveLeft||moveRight;
    if(adjacent){
        let current=currentCandy.src;
        let target=targetCandy.src;
        currentCandy.src=target;
        targetCandy.src=current;
        /**checking for a valid or invalid swapping */
        let isValidMove=checkValidMoves();
        if(!isValidMove){
            let current=currentCandy.src;
            let target=targetCandy.src;
            currentCandy.src=target;
            targetCandy.src=current;
        }
    }
}
function candyCrush(){
    crushCandyFive();
    crushCandyFour();
    crushCandyThree();
    document.getElementById("score").textContent=score.toString();
}
function crushCandyThree(){
    //three in a row condition
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols-2;c++){
            let candyFirst=board[r][c];
            let candySecond=board[r][c+1];
            let candyThird=board[r][c+2];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && !candyFirst.src.includes("blank")){
                candyFirst.src="./assets/blank.png";
                candySecond.src="./assets/blank.png";
                candyThird.src="./assets/blank.png";
                score+=15;
            }
        }
    }
    //three in a column condition
    for(let c=0;c<cols;c++){
        for(let r=0;r<rows-2;r++){
            let candyFirst=board[r][c];
            let candySecond=board[r+1][c];
            let candyThird=board[r+2][c];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && !candyFirst.src.includes("blank")){
                candyFirst.src="./assets/blank.png";
                candySecond.src="./assets/blank.png";
                candyThird.src="./assets/blank.png";
                score+=15;
            }
        }
    }
}
function crushCandyFour(){
    //four in a row condition
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols-3;c++){
            let candyFirst=board[r][c];
            let candySecond=board[r][c+1];
            let candyThird=board[r][c+2];
            let candyFourth=board[r][c+3];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && candyThird.src==candyFourth.src && !candyFirst.src.includes("blank")){
                candyFirst.src="./assets/blank.png";
                candySecond.src="./assets/blank.png";
                candyThird.src="./assets/blank.png";
                candyFourth.src="./assets/blank.png";
                score+=40;
            }
        }
    }
    //four in a column condition
    for(let c=0;c<cols;c++){
        for(let r=0;r<rows-3;r++){
            let candyFirst=board[r][c];
            let candySecond=board[r+1][c];
            let candyThird=board[r+2][c];
            let candyFourth=board[r+3][c];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && candyThird.src==candyFourth.src && !candyFirst.src.includes("blank")){
                candyFirst.src="./assets/blank.png";
                candySecond.src="./assets/blank.png";
                candyThird.src="./assets/blank.png";
                candyFourth.src="./assets/blank.png";
                score+=40;
            }
        }
    }
}
function crushCandyFive(){
    //five in a row condition
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols-4;c++){
            let candyFirst=board[r][c];
            let candySecond=board[r][c+1];
            let candyThird=board[r][c+2];
            let candyFourth=board[r][c+3];
            let candyFifth=board[r][c+4];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && candyThird.src==candyFourth.src && candyFourth.src==candyFifth.src && !candyFirst.src.includes("blank")){
                candyFirst.src="./assets/blank.png";
                candySecond.src="./assets/blank.png";
                candyThird.src="./assets/blank.png";
                candyFourth.src="./assets/blank.png";
                candyFifth.src="./assets/blank.png";
                score+=100;
            }
        }
    }
    //five in a column condition
    for(let c=0;c<cols;c++){
        for(let r=0;r<rows-4;r++){
            let candyFirst=board[r][c];
            let candySecond=board[r+1][c];
            let candyThird=board[r+2][c];
            let candyFourth=board[r+3][c];
            let candyFifth=board[r+4][c];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && candyThird.src==candyFourth.src && candyFourth.src==candyFifth.src && !candyFirst.src.includes("blank")){
                candyFirst.src="./assets/blank.png";
                candySecond.src="./assets/blank.png";
                candyThird.src="./assets/blank.png";
                candyFourth.src="./assets/blank.png";
                candyFifth.src="./assets/blank.png";
                score+=100;
            }
        }
    }
}
function checkValidMoves(){
    //three in a row condition milne condition is valid for swapping
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols-2;c++){
            let candyFirst=board[r][c];
            let candySecond=board[r][c+1];
            let candyThird=board[r][c+2];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && !candyFirst.src.includes("blank")){
                return true;
            }
        }
    }
    //three in a column condition milne condition is valid for swapping
    for(let c=0;c<cols;c++){
        for(let r=0;r<rows-2;r++){
            let candyFirst=board[r][c];
            let candySecond=board[r+1][c];
            let candyThird=board[r+2][c];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && !candyFirst.src.includes("blank")){
                return true;
            }
        }
    }
     //four in a row condition
     for(let r=0;r<rows;r++){
        for(let c=0;c<cols-3;c++){
            let candyFirst=board[r][c];
            let candySecond=board[r][c+1];
            let candyThird=board[r][c+2];
            let candyFourth=board[r][c+3];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && candyThird.src==candyFourth.src && !candyFirst.src.includes("blank")){
                return true;
            }
        }
    }
    //four in a column condition
    for(let c=0;c<cols;c++){
        for(let r=0;r<rows-3;r++){
            let candyFirst=board[r][c];
            let candySecond=board[r+1][c];
            let candyThird=board[r+2][c];
            let candyFourth=board[r+3][c];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && candyThird.src==candyFourth.src && !candyFirst.src.includes("blank")){
                return true;
            }
        }
    }
    //five in a row condition
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols-4;c++){
            let candyFirst=board[r][c];
            let candySecond=board[r][c+1];
            let candyThird=board[r][c+2];
            let candyFourth=board[r][c+3];
            let candyFifth=board[r][c+4];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && candyThird.src==candyFourth.src && candyFourth.src==candyFifth.src && !candyFirst.src.includes("blank")){
                return true;
            }
        }
    }
    //five in a column condition
    for(let c=0;c<cols;c++){
        for(let r=0;r<rows-4;r++){
            let candyFirst=board[r][c];
            let candySecond=board[r+1][c];
            let candyThird=board[r+2][c];
            let candyFourth=board[r+3][c];
            let candyFifth=board[r+4][c];
            if(candyFirst.src==candySecond.src && candySecond.src==candyThird.src && candyThird.src==candyFourth.src && candyFourth.src==candyFifth.src && !candyFirst.src.includes("blank")){
                return true;
            }
        }
    }
}
function slideDownCandy(){
    //if empty /blank
    for(let c=0;c<cols;c++){
        let targetRowFromBottom=rows-1;
        for(let r=rows-1;r>=0;r--){
            if(!board[r][c].src.includes("blank")){
                let temp=board[r][c].src;
                board[r][c].src="./assets/blank.png";
                board[targetRowFromBottom][c].src=temp;
                targetRowFromBottom-=1;
            }
    }
    }
}
function generateNewCandies(){
    //if the top column candy-tile is blank generate random and fill it
    for(let c=0;c<cols;c++){
        let topRow=0;
        if(board[topRow][c].src.includes("blank")){
            board[topRow][c].src="./assets/"+randomCandy()+".png";
        }
    }
}