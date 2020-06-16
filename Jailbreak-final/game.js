const levels =[ 
	//level 0
	["coin","","wall","","coin",
	"wall","lava","lava","lava","",
	"jaildoor","rock","soldier-up","rock","key",
	"wall","lava","bridge","lava","",
	"animate","animate","animate","animate","coin"],

	//level 1
	["coin","","rock","coin","key",
	"lava","bridge","lava","rock","",
	"animate","animate","animate","animate","animate",
	"lava","lava","bridge","lava","lava",
	"soldier-up","","","wall","jaildoor"],

	//level 2
	["coin","","wall","coin","",
	"key","rock","rock","","rock",
	"animate","animate","animate","animate","animate",
	"rock","rock","jaildoor","rock","coin",
	"soldier-up","","","",""],

	//level 3
	["jaildoor","wall","coin","","",
	"coin","lava","","lava","",
	"wall","lava","soldier-up","lava","key",
	"coin","lava","coin","lava","coin",
	"animate","animate","animate","animate","animate"]

	]; //end of level

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock","lava"];
const passable = ["", "bridge"];

var currentLevel = 0; //starting level
var riderOn = false; //is the rider on?
var currentLocationOfSoldier = 0;
var currentAnimation; //allows 1 animation per level
var currentAnimation2;
var widthOfBoard = 5; 
var controlPlay; //control stop or pause

var currentLocationofEnemy = 0;
let directionOfEnemy = "";
let directionOfZombie = "";
let animateBoxes;

var countCoins = 0;

//start game
window.addEventListener("load",function(){
	loadLevel();
});

function key(e){
	switch (e.keyCode){
	case 37: // left
		if(currentLocationOfSoldier % widthOfBoard !== 0){
			tryToMove("left");
		}
		break;
	case 38: // up
		if(currentLocationOfSoldier - widthOfBoard >= 0){
			tryToMove("up");
		}
		break;			
	case 39: // right
		if(currentLocationOfSoldier % widthOfBoard < widthOfBoard - 1){
			tryToMove("right");
		}
		break;
		
	case 40: // down
		if(currentLocationOfSoldier + widthOfBoard < widthOfBoard * widthOfBoard){
			tryToMove("down");
		}		
	}
}

document.addEventListener('keydown', key, true);

// try to move
function tryToMove(direction){

	// location before move
	let oldLocation = currentLocationOfSoldier;
	// class of location before move
	let oldClassName = gridBoxes[oldLocation].className;
	let nextLocation = 0; // location player wants to move to
	let nextClass = ""; // class of location player wish to move to
	let newClass = ""; // new class to swtich to if moved
	let nextLocation2 = 0; 
	let nextClass2 = "";
	var obstacle1 = "";

	switch(direction){
		case "left":
			nextLocation = currentLocationOfSoldier - 1;
			break;
		case "right":
			nextLocation = currentLocationOfSoldier + 1;			
			break;
		case "up":
			nextLocation = currentLocationOfSoldier - widthOfBoard;			
			break;			
		case "down":
			nextLocation = currentLocationOfSoldier + widthOfBoard;			
			break;
	}// switch

	nextClass = gridBoxes[nextLocation].className;

	// if the obstacle is not passable, don't move
	if (noPassObstacles.includes(nextClass)){return;}

	// if there is a fence, and there's no rider don't move
	if(!riderOn && nextClass.includes("wall")){return;}

	// if there is a flag, and there's no rider, don't move
	if(!riderOn && nextClass.includes("jaildoor")){return;}

	// if there is a fence, and rider is on, move 2 grid and animate the process
	if(nextClass.includes ("wall")){

		document.removeEventListener('keydown', key, true);

		// there must be a rider
		if(riderOn){
			if(direction == "left"){
				nextLocation2 = nextLocation - 1;
				obstacle1 = gridBoxes[nextLocation2].className;
				if(nextLocation2 % widthOfBoard== 4 ){
					document.addEventListener('keydown', key, true);
					return;
				} else if(noPassObstacles.includes(obstacle1) || obstacle1.includes("wall")) {
					document.addEventListener('keydown', key, true);
					return;				
				} else {
					gridBoxes[currentLocationOfSoldier].className = "";
					oldClassName = gridBoxes[nextLocation].className;
					nextClass = "jump-left";
					nextClass2 = "soldier-key-left";	
				}
			} else if(direction == "right"){
				nextLocation2 = nextLocation + 1;
				if(nextLocation % widthOfBoard== 4){
					document.addEventListener('keydown', key, true);
					return;
				} else {
					obstacle1 = gridBoxes[nextLocation2].className;
				} 

				if(noPassObstacles.includes(obstacle1) || obstacle1.includes("wall")) {
					document.addEventListener('keydown', key, true);
					return;				
				} else {
					gridBoxes[currentLocationOfSoldier].className = "";
					oldClassName = gridBoxes[nextLocation].className;
					nextClass = "jump-right";
					nextClass2 = "soldier-key-right";
				}	
			} else if(direction == "up"){
				nextLocation2 = nextLocation - widthOfBoard;
				if(nextLocation2 < 0){
					document.addEventListener('keydown', key, true);
					return;
				} else {
					obstacle1 = gridBoxes[nextLocation2].className;
				} 

				if(noPassObstacles.includes(obstacle1) || obstacle1.includes("wall")) {
					document.addEventListener('keydown', key, true);					
					return;				
				}else{
					gridBoxes[currentLocationOfSoldier].className = "";
					oldClassName = gridBoxes[nextLocation].className;
					nextClass = "jump-up";
					nextClass2 = "soldier-key-up";
				}	
			} else if(direction == "down"){
				nextLocation2 = nextLocation + widthOfBoard;
				if(nextLocation2 > 24){
					document.addEventListener('keydown', key, true);
					return;
				} else {
					obstacle1 = gridBoxes[nextLocation2].className;
				} 

				if(noPassObstacles.includes(obstacle1) || obstacle1.includes("wall")) {
					document.addEventListener('keydown', key, true);
					return;				
				} else {
					gridBoxes[currentLocationOfSoldier].className = "";
					oldClassName = gridBoxes[nextLocation].className;
					nextClass = "jump-down";
					nextClass2 = "soldier-key-down";
				}	
			}
				// show horse jumping
				gridBoxes[nextLocation].className = nextClass;
				//console.log(oldClassName);
				setTimeout(function(){
					// set jump back to just a fence 
					gridBoxes[nextLocation].className = oldClassName;
					// update current location of horse to 2 space past take off
					currentLocationOfSoldier = nextLocation2;
					// get class of box after jump
					nextClass = gridBoxes[currentLocationOfSoldier].className;
					// show horse and rider after landing
					gridBoxes[currentLocationOfSoldier].className = nextClass2;
					//if next box is a flag, go up level
					levelUp(nextClass);
					document.addEventListener('keydown', key, true);
				}, 350);
			return;
		}	
	} // fence animation

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
	if(nextClass.includes("robin")||nextClass.includes("zombie")){
		document.removeEventListener('keydown', key, true);
		clearTimeout(currentAnimation);
		window.clearInterval(controlPlay);
		controlPlay = false;
		document.getElementById("lose").style.display = "block";

		setTimeout(function(){

			loadLevel();
			document.addEventListener('keydown', key, true);

			document.getElementById("lose").style.display = "none";
		}, 2000);

		return;
	}

	//if there is a coin
	if(nextClass.includes("coin")){
		countCoins+=1;
		document.getElementById("coins").innerHTML = countCoins;
	}

	//move up to next level if it is needed
	levelUp(nextClass);
	

}// try to move


//level up
function levelUp(nextClass){
	if(nextClass == "jaildoor" && riderOn){
		if(currentLevel==3){
			window.location.href = "end.html";
		}
		document.getElementById("levelup").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout(function(){
			document.getElementById("levelup").style.display = "none";
			currentLevel++;
			loadLevel();
		},1000);
	}
}//levelUp

//load level 0-max
function loadLevel(){
	let levelMap = levels[currentLevel]; 
	riderOn = false;

	//load the board
	document.addEventListener('keydown', key, true);

	for(var i=0;i<gridBoxes.length;i++){
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("soldier-up")) currentLocationOfSoldier = i;
	}//for

	animateBoxes = document.querySelectorAll(".animate");
	znimateBoxes = document.querySelectorAll(".znimate");

	animateEnemy(animateBoxes, 0, "right");
	znimateEnemy(znimateBoxes, 0, "right");

}//loadLevel

function changeVisibility (divID){
	var element = document.getElementById(divID);
	if(element){
		element.className = (element.className == 'hidden')? 'unhidden':'hidden';
	}// if
}

function continueGame(){
	changeVisibility("boundaryRule");
}

function showPause (){
	changeVisibility("pauseNavigation");
	changeVisibility("lightbox2");	
	window.clearInterval(controlPlay);
	controlPlay = false;
	clearTimeout(currentAnimation);
	document.removeEventListener('keydown', key, true);
}

// fix
function resumeGame(){
	console.log("resume game");
	changeVisibility("pauseNavigation");
	changeVisibility("lightbox2");
	document.addEventListener('keydown', key, true);
	
	animateEnemy(animateBoxes, 0, directionOfEnemy);
	znimateEnemy(znimateBoxes, 0, directionOfZombie);
}

function showLightBox(message,message2){
	document.getElementById("text1").innerHTML = message;
	document.getElementById("text2").innerHTML = message2;

	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

}

function restartGame(){
	loadLevel();
	changeVisibility("");
	changeVisibility("pauseNavigation");
	changeVisibility("lightbox2");
	document.addEventListener('keydown', key, true);
	countCoins = 0;
}


function animateEnemy(boxes, index, direction){
	//exit of no animation
	if(boxes.length <= 0){return; }

	//update image
	if(direction == "right") {
		boxes[index].classList.add("robin-right");
		directionOfEnemy = direction;
	}else{
		boxes[index].classList.add("robin-left");
		directionOfEnemy = direction;
	}
	//remove image
	for(i = 0; i < boxes.length; i++){
		if(i != index){
			boxes[i].classList.remove("robin-right");
			boxes[i].classList.remove("robin-left");
		}
	}
	//moving right
	if(direction == "right"){
		//turn around if hit right side
		if(index == boxes.length - 1){
			index--;
			direction = "left";
		}else{
			index++;
		}
	//moving left	
	}else{
		if(index == 0){
			index++;
			direction = "right";
		}else{
			index--;
		}	
	}//else

	var currentClass = gridBoxes[currentLocationOfSoldier].className;

	if(currentClass.includes("robin")){
		document.removeEventListener('keydown', key, true);
		clearTimeout(currentAnimation);
		window.clearInterval(controlPlay);
		controlPlay = false;
		document.getElementById("lose").style.display = "block";

		setTimeout(function(){

			loadLevel();
			document.addEventListener('keydown', key, true);

			document.getElementById("lose").style.display = "none";
		}, 2000);

		return;
	}

		currentAnimation = setTimeout(function(){
		animateEnemy(boxes, index, direction);
		}, 400);

}//animateEnemy


function znimateEnemy(boxes, index, direction){

	//exit of no animation
	if(boxes.length <= 0) {return; }

	//update image
	if(direction == "right") {
		boxes[index].classList.add("zombie-right");
		directionOfZombie = direction;
	}else{
		boxes[index].classList.add("zombie-left");
		directionOfZombie = direction;
	}
	//remove image
	for(i = 0; i < boxes.length; i++){
		if(i != index){
			boxes[i].classList.remove("zombie-right");
			boxes[i].classList.remove("zombie-left");
		}
	}
	//moving right
	if(direction == "right"){
		//turn around if hit right side
		if(index == boxes.length - 1){
			index--;
			direction = "left";
		}else{
			index++;
		}
	//moving left	
	}else{
		if(index == 0){
			index++;
			direction = "right";
		}else{
			index--;
		}	
	}//else

	var currentClass = gridBoxes[currentLocationOfSoldier].className;

	if(currentClass.includes("zombie")){
		document.removeEventListener('keydown', key, true);
		clearTimeout(currentAnimation2);
		window.clearInterval(controlPlay);
		controlPlay = false;
		document.getElementById("lose").style.display = "block";

		setTimeout(function(){

			loadLevel();
			document.addEventListener('keydown', key, true);

			document.getElementById("lose").style.display = "none";
		}, 2000);

		return;
	}

		currentAnimation2 = setTimeout(function(){
		znimateEnemy(boxes, index, direction);
		}, 1200);
 
}//znimateEnemy
