const levels =[ 
	//level 0
	["jaildoor","rock","","","",
	"wall","rock","","","key",
	"","rock","animate","animate","animate",
	"","lava","","","",
	"","wall","","soldier-front",""],

	//level 1
	["jaildoor","lava","","","",
	"wall","lava","","","key",
	"animate","bridge animate","animate","animate","animate",
	"","lava","","","",
	"","lava","soldier-front","",""],

	//level 2
	["rock","rock","jaildoor","rock","rock",
	"animate","animate","animate","animate","animate",
	"lava","bridge","lava","lava","lava",
	"","","","wall","",
	"key","rock","","","soldier-front"
	]

	]; //end of level

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0; //starting level
var riderOn = false; //is the rider on?
var currentLoactionOfSoldier = 0;
var currentAnimation; //allows 1 animation per level


//start game
window.addEventListener("load",function(){
	loadLevel();
});

//load level 0-max
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes; 
	riderOn = false;

	//load the board
	for(var i=0;i<gridBoxes.length;i++){
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("soldier-front")) currentLocationOfSoldier = i;
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


