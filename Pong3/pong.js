//global variables
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var bounce = new sound("jump.mp3");
var off = new sound("buzz.mp3");

//start ball motion
window.addEventListener('load',function(){
	startBall();
});

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

});

//object constructor to play sound
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}




function startBall(){
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;

	//50% chance of starting in either direction (Left or Right)
	if(Math.random()<0.5){
		direction = 1;
	}else{
		direction = -1;
	}
	topSpeedOfBall = Math.random() * 2 + 3; //3-4.999
	leftSpeedOfBall = direction * (Math.random()*2+3);

}





//update locations of the paddles and balls
window.setInterval(function show(){

	//update positions of the elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;


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

	// if ball hits top, or bottom of game board, change direction
	if(topPositionOfBall<=0||topPositionOfBall>=gameboardHeight-ballHeight){
		topSpeedOfBall *= -1;
	}

	//ball on left edge of gameboard
	if(leftPositionOfBall <= paddleWidth){

		//if ball hits the left paddle, change direction
		if(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1;
		}else{
			off.play();
			startBall();
		}
	}

	//ball on right edge of gameboard
	if(leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		//if ball hits the right paddle, change direction
		if(topPositionOfBall > positionOfPaddle2 && 
		   topPositionOfBall < positionOfPaddle2 + paddleHeight){
		   	bounce.play();
			leftSpeedOfBall *= -1;
		}else{
			off.play();
			startBall();
		}
	}

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
}, 1000/60);