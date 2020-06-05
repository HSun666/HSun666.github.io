//global variables
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
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

var score1 = 0;
var score2 = 0;

var bounce = new sound("jump.mp3");
var off = new sound("buzz.mp3");

//used to control game start/stop
var controlPlay;

var playedTime = 0;
var numBounce = 0;

var choice = 0;
var flag = false;
/*
//start ball motion
window.addEventListener('load',function(){
	startBall();
});*/


//code for the light box
function changeVis(divID){
	var element = document.getElementById(divID);
	if(element){
		element.className = (element.className=='hidden') ? 'unhidden' : 'hidden';
	}
}

function showLightBox(message,message2){
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;

	changeVis("lightbox");
	changeVis("boundaryMessage");

}

function continueGame(){
	console.log("clicked");	
	changeVis("lightbox");
	changeVis("boundaryMessage");
}
//end lightbox




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

	topSpeedOfBall=5;
	leftSpeedOfBall=5;

	if(choice == 1){
		if(topSpeedOfBall>=5&&leftSpeedOfBall>=5){
			topSpeedOfBall = Math.random() * 6 + 10; //3-4.999
			leftSpeedOfBall = direction * (Math.random()*6+10);
		}
	}else{
		topSpeedOfBall = Math.random() * 6 + 3; //3-4.999
		leftSpeedOfBall = direction * (Math.random()*6+5);
	}
}

//update locations of the paddles and balls
function show(){

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
		if(topPositionOfBall + ballHeight> positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1;
		}else{
			score1 += 1;
			console.log(score1);
			document.getElementById("score2").innerHTML = score1;			
			off.play();
			startBall();
		}
	}

	//ball on right edge of gameboard
	if(leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		//if ball hits the right paddle, change direction
		if(topPositionOfBall + ballHeight > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
		   	bounce.play();
			leftSpeedOfBall *= -1;
		}else{
			score2 += 1;
			console.log(score1);
			document.getElementById("score1").innerHTML = score2;				
			off.play();
			startBall();
		}
	}

	if (score1 == 9 || score2 == 9) {
		stopGame();
	}


	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
}


//resume game
function resumeGame(){
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}
}

function pauseGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
}

function startGame(){
	score1 = 0;
	document.getElementById("score2").innerHTML = score1;
	score2 = 0;
	document.getElementById("score1").innerHTML = score2;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;

	startBall();

	if(choice == 2){
		changeVis("fog");
	}

	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}

}

function stopGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;

	let message1 = "Tie Game";
	let message2 = "Close to Continue.";

	if(score2 > score1){
		message1 = "Player 1 wins the game with " + score2 + " points!";
		message2 = "Player 2 had " + score1 + " points!";
	}else if(score1 > score2){
		message1 = "Player 2 wins the game with " + score1 + " points!";
		message2 = "Player 1 had " + score2 + " points!";
	}

	startGame();
	pauseGame();
	if(flag){
		flag = false;
	}else{
		showLightBox(message1,message2);
		return;
	}
}

function back(){
	flag = true;
	stopGame();
	changeVis("lightbox");
	changeVis("positionNavigation");
}


function classic (){
	console.log("classic");
	changeVis("lightbox");
	changeVis("positionNavigation");
	var text1 = "True talent wins up to 9 rounds";
	var text2 = "Click start game";
	showLightBox(text1, text2);
}

function speedy(){
	choice = 1;
	changeVis("lightbox");
	changeVis("positionNavigation");
	var text1 = "You Sluggish Loser!";
	var text2 = "The ball bounds harder than you think!";
	showLightBox(text1, text2);
}

function foggy(){
	choice = 2;
	changeVis("lightbox");
	changeVis("positionNavigation");
	var text1 = "You Ain't Blind!";
	var text2 = "Well, I don't think that will make any difference!";
	showLightBox(text1, text2);
}