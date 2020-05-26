//global variables
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var paddleHeight = document.getElementById("paddle1").offsetHeight;
var gameboardHeight = document.getElementById("gameBoard").offsetHeight;

//Move Paddles
document.addEventListener('keydown', function(e) {
	//console.log("key down" + e.keyCode);
	if(e.keyCode==87||e.which==87){ //W
		speedOfPaddle1 = -10;
	}
	if(e.keyCode==83||e.which==83){ //S
		speedOfPaddle1 = 10;
	}
	if(e.keyCode==38||e.which==38){ //up
		speedOfPaddle2 = -10;
	}
	if(e.keyCode==40||e.which==40){ //down
		speedOfPaddle2 = 10;
	}
	show();
});


document.addEventListener('keyup', function(e) {
	//console.log("key up" + e.keyCode);
	if(e.keyCode==87||e.which==87){ // W
		speedOfPaddle1 = 0;
	}
	if(e.keyCode==83||e.which==83){ //S
		speedOfPaddle1 = 0;
	}
	if(e.keyCode==38||e.which==38){ // up
		speedOfPaddle2 = 0;
	}
	if(e.keyCode==40||e.which==40){ //down
		speedOfPaddle2 = 0;
	}
	show();
});

//update locations of the paddles and balls
function show(){

	//update positions of the elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;

	//stop paddle from leaving the top of the gameboard
	if(positionOfPaddle1<=0){
		positionOfPaddle1 = 0;
	}

	if(positionOfPaddle2<=0){
		positionOfPaddle2 = 0;
	}

	//stop paddle from leaving the bottom of the gameboard
	if(positionOfPaddle1 >= gameboardHeight-paddleHeight){
		positionOfPaddle1 = gameboardHeight-paddleHeight;
	}

	if(positionOfPaddle2 >= gameboardHeight-paddleHeight){
		positionOfPaddle2 = gameboardHeight-paddleHeight;
	}

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
}