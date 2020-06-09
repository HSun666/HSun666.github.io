const levels =[ 
	//level 0
	["jaildoor","rock","","","",
	"wall","rock","","","key",
	"","rock","animate","animate","animate",
	"","lava","","","",
	"","wall","","soldier-up",""],

	//level 1
	["jaildoor","lava","","","",
	"wall","lava","","","key",
	"animate","bridge animate","animate","animate","animate",
	"","lava","","","",
	"","lava","soldier-up","",""],

	//level 2
	["rock","rock","jaildoor","rock","rock",
	"animate","animate","animate","animate","animate",
	"lava","bridge","lava","lava","lava",
	"","","","wall","",
	"key","rock","","","soldier-up"
	]

	]; //end of level

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock","lava"];

var currentLevel = 0; //starting level
var riderOn = false; //is the rider on?
var currentLocationOfSoldier = 0;
var currentAnimation; //allows 1 animation per level
var widthOfBoard = 5; 
var controlPlay = true; //control stop or pause

//start game
window.addEventListener("load",function(){
	loadLevel();
});

//move soldier
document.addEventListener("keydown",function(e){

	switch(e.keyCode){
		case 37: //left arrow
			if(currentLocationOfSoldier % widthOfBoard !== 0){
				tryToMove("left");
			}
			break;
		case 38: //right arrow
			if(currentLocationOfSoldier - widthOfBoard >= 0){
				tryToMove("up");
			}
			break;
		case 39: //down arrow
			if(currentLocationOfSoldier % widthOfBoard < widthOfBoard-1){
				tryToMove("right");
			}
			break;
		case 40: //down arrow
			if(currentLocationOfSoldier + widthOfBoard < widthOfBoard * widthOfBoard){
				tryToMove("down");
			}
			break;
	} //switch
}); //key event listener


//try to move the soldier
function tryToMove(direction){

	//location before move
	let oldLocation = currentLocationOfSoldier;

	//class of location before move
	let oldClassName = gridBoxes[oldLocation].className;

	let nextLocation = 0; // location we wish to move to
	let nextClass = ""; // class of location we wish to move to

	let nextLocation2 = 0;
	let nextClass2 = "";

	let newClass = ""; // new class to switch to if move successful 
	let jumpTrue = false; //if have to jump

	switch(direction){
		case "left":
			console.log("move Left");
			nextLocation = currentLocationOfSoldier - 1;
			break;
		case "right":
			console.log("move right");
			nextLocation = currentLocationOfSoldier + 1;
			break;
		case "up":
			console.log("move up");
			nextLocation = currentLocationOfSoldier - widthOfBoard;
			break;
		case "down":
			console.log("move down");
			nextLocation = currentLocationOfSoldier + widthOfBoard;
			break;
	} //switch

	nextClass = gridBoxes[nextLocation].className;

	//if the obstacle is not possible, don't move
	if(noPassObstacles.includes(nextClass)) {return;}

	// if it's a wall, and there is no key, don't move
	if(!riderOn && nextClass.includes("wall")) {return;}

	//if there is a fence, move two spaces with animation
	if(nextClass.includes("wall")){

		//rider must be on to jump
		if(riderOn){
			gridBoxes[currentLocationOfSoldier].className = "";
			oldClassName = gridBoxes[nextLocation].className;
		}

		//set value according to the direction
		if(direction == "left"){
			nextClass = "jump-left";
			nextClass2 = "soldier-key-left";
			nextLocation2 = nextLocation - 1;
			jumpTrue = true;
		}else if(direction == "right"){
			nextClass = "jump-right";
			nextClass2 = "soldier-key-right";
			nextLocation2 = nextLocation + 1;
			jumpTrue = true;
		}else if(direction == "up"){
			nextClass = "jump-up";
			nextClass2 = "soldier-key-up";
			nextLocation2 = nextLocation - widthOfBoard;
			jumpTrue = true;
		}else if(direction == "down"){
			nextClass = "jump-down";
			nextClass2 = "soldier-key-down";
			nextLocation2 = nextLocation + widthOfBoard;
			jumpTrue = true;
		}

		if(jumpTrue){
			//show soldier jumping
			gridBoxes[nextLocation].className = nextClass;

			setTimeout(function(){

				//set jump back to just a wall
				gridBoxes[nextLocation].className = oldClassName;

				//update current location of soldier to be 2 spaces past take offscreenBufferin
				currentLocationOfSoldier = nextLocation2;

				//get class of box after jump
				nextClass = gridBoxes[currentLocationOfSoldier].className;

				//show soldier and the key on the other side of the wall
				gridBoxes[currentLocationOfSoldier].className = nextClass2;

				//if next box is a flag, go up a level
				levelUp(nextClass);
			},350);
		}
		return;

	}// if class has fence

	//if there is a key, add key
	if(nextClass == "key"){
		riderOn = true;
	}

	//if there is a bridge in the old location, keep it 
	if(oldClassName.includes("bridge")){
		gridBoxes[oldLocation].className = "bridge";
	}else{
		gridBoxes[oldLocation].className = "";
	} //else

	//build name of new class
	newClass = (riderOn) ? "soldier-key-" : "soldier-";
	newClass += direction;

	//if there is a bridge in the next location, keep it
	if(gridBoxes[nextLocation].classList.contains("bridge")){
		newClass += " bridge";
	}

	//move one space
	currentLocationOfSoldier = nextLocation;
	gridBoxes[currentLocationOfSoldier].className = newClass;

	//if it is an enemy
	if(nextClass.includes("robin")){
		console.log("game lost");
		document.getElementById("lose").style.display = "block";
		return;
	}

	//move up to next level if it is needed
	levelUp(nextClass);

}//try to move


//level up
function levelUp(nextClass){
	if(nextClass=="jaildoor" && riderOn && currentLevel!=gridBoxes.length-1){
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout(function(){
			document.getElementById("levelup").style.display = "none";
			currentLevel++;
			if(currentLevel==3){
				pauseGame();
				return;
			}
			loadLevel();
		},1000);
	}
}//levelUp

//load level 0-max
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes; 
	riderOn = false;

	//load the board
	for(var i=0;i<gridBoxes.length;i++){
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("soldier-up")) currentLocationOfSoldier = i;
	}//for

	animateBoxes = document.querySelectorAll(".animate");

	animateEnemy(animateBoxes, 0, "right");

}//loadLevel


//animate enemy left to right
function animateEnemy(boxes,index,direction){

	//exit the function if no animation
	if(boxes.length<=0){return;}

	//update images
	if(direction == "right"){
		boxes[index].classList.add("robin-right");
	}else{
		boxes[index].classList.add("robin-left");
	}

	//remove images from other boxes
	for(i=0;i<boxes.length;i++){
		if(i!=index){
			boxes[i].classList.remove("robin-right");
			boxes[i].classList.remove("robin-left");
		}
	}//for

	//moving right
	if(direction=="right"){
		//turn around if hit right side
		if(index==boxes.length-1){
			index--;
			direction = "left";
		}else{
			index++;
		}
	}else{ //moving left
		//turn around if hit left side
		if(index==0){
			index++;
			direction = "right";
		}else{
			index--;
		}
	}

	currentAnimation = setTimeout(function(){
		animateEnemy(boxes,index,direction);
	}, 750);
}//animateEnemy


function pauseGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
}