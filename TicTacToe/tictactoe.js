let currentPlayer = "X";
let gameStatus = "";
let numTurns = 0;

function playerTakeTurn(e){
	if(e.innerHTML==""){
		e.innerHTML = currentPlayer;
		checkGameStatus();
	}else{
		showLightBox("The box is already selected.","Please try another!");
		console.log("This box is already selected, please try another!");
		return;
	}

	if(gameStatus!=""){
		showLightBox(gameStatus,"Game Over.");
		console.log("Game is over, " + gameStatus);
	}
}

function checkGameStatus(){
	numTurns++;

	if(checkWins()){
		gameStatus = currentPlayer+" wins!";
		console.log("Game Status: " + gameStatus);
	}

	if(numTurns==9){
		gameStatus = "Tie Game";
		console.log("Game Status: " + gameStatus);
	}

	currentPlayer = (currentPlayer == "X" ? "O" : "X");
}

function checkWins(){
	let cb = [];
	cb[0] = "";
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;

	if(cb[1]!=""&&cb[1]==cb[2]&&cb[2]==cb[3]){
		return true;
	}

	if(cb[4]!=""&&cb[4]==cb[5]&&cb[5]==cb[6]){
		return true;
	}

	if(cb[7]!=""&&cb[7]==cb[8]&&cb[8]==cb[9]){
		return true;
	}

	if(cb[1]!=""&&cb[1]==cb[4]&&cb[4]==cb[7]){
		return true;
	}

	if(cb[2]!=""&&cb[2]==cb[5]&&cb[5]==cb[8]){
		return true;
	}

	if(cb[3]!=""&&cb[3]==cb[6]&&cb[3]==cb[9]){
		return true;
	}

	if(cb[1]!=""&&cb[1]==cb[5]&&cb[5]==cb[9]){
		return true;
	}

	if(cb[3]!=""&&cb[3]==cb[5]&&cb[3]==cb[7]){
		return true;
	}

}

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
	changeVis("lightbox");
	changeVis("boundaryMessage");

}
