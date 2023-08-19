let candies=["Red","Blue","Purple","Orange","Yellow","Green"];
let board=[];
var cols=10;
var rows=9;
var score=0;
var currentCandy;
var targetCandy;
window.onload=function(){
    startGame();
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
            // candyTile.addEventListener("dragover",moveCandy);
            // candyTile.addEventListener("dragenter",candyOverAnother);
            // candyTile.addEventListener("dragleave",leaveCandy);
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
function leaveCandy(){

}
function dropCandy(){
    targetCandy=this;
}
function shiftCandy(){
    //swap current and target means their image source
    let current=currentCandy.src;
    console.log(current);
    let target=targetCandy.src;
    console.log(target);
    currentCandy.src=target;
    targetCandy.src=current;
    console.log(current);
    console.log(target);
}