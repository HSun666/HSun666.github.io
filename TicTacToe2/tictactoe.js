let currentPlayer = "X";
let gameStatus = "";
let numTurns = 0;
let idNames = ["cell1","cell2","cell3","cell4","cell5","cell6","cell7","cell8","cell9"];

function newGame(){

	//reset the board
	for(var i=0;i<idNames.length;i++){
		document.getElementById(idNames[i]).innerHTML = "";
	}

	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";

	changeVis("controls");
}

function computerTakeTurn(){
	let idName = "";
	let cb = [];
	cb[0] = "";
	cb[1] = document.getElementById("cell1").innerHTML;
	cb[2] = document.getElementById("cell2").innerHTML;
	cb[3] = document.getElementById("cell3").innerHTML;
	cb[4] = document.getElementById("cell4").innerHTML;
	cb[5] = document.getElementById("cell5").innerHTML;
	cb[6] = document.getElementById("cell6").innerHTML;
	cb[7] = document.getElementById("cell7").innerHTML;
	cb[8] = document.getElementById("cell8").innerHTML;
	cb[9] = document.getElementById("cell9").innerHTML;

	if(cb[5]==""){ //controls the centre if possible
		console.log("set cb5");
		document.getElementById("cell5").innerHTML = "O";
	}else if (cb[5] == "X" && cb[7] == "X" && cb[3] == ""){ //positive slope line
		console.log("set cb3");
		document.getElementById("cell3").innerHTML = "O";		
	}else if (cb[5] == "X" && cb[3] == "X" && cb[7] == ""){ 
		console.log("set cb7");
		document.getElementById("cell7").innerHTML = "O";		
	}else if (cb[5] == "X" && cb[1] == "X" && cb[9] == ""){ //negative slope line
		console.log("set cb9");
		document.getElementById("cell9").innerHTML = "O";		
	}else if (cb[5] == "X" && cb[9] == "X" && cb[1] == ""){
		console.log("set cb1");
		document.getElementById("cell1").innerHTML = "O";		
	}else if (cb[1] == "X" && cb[2] == "X" && cb[3] == ""){ //horizontal top line possibility
		console.log("set cb3");
		document.getElementById("cell3").innerHTML = "O";		
	}else if(cb[1]=="" && cb[2]=="X" && cb[3]=="X"){
		console.log("set cb1");
		document.getElementById("cell1").innerHTML = "O";
	}else if(cb[1]=="X"&&cb[2]==""&&cb[3]=="X"){
		console.log("set cb2");
		document.getElementById("cell2").innerHTML = "O";
	}else if(cb[4]=="X"&&cb[5]=="X"&&cb[6]==""){ //second horizontal line possibilty
		console.log("set cb6");
		document.getElementById("cell6").innerHTML = "O";
	}else if(cb[4]==""&&cb[5]=="X"&&cb[6]=="X"){
		console.log("set cb4");
		document.getElementById("cell4").innerHTML = "O";
	}else if(cb[4]=="X"&&cb[5]==""&&cb[6]=="X"){
		console.log("set cb5");
		document.getElementById("cell5").innerHTML = "O";
	}else if(cb[7]=="X"&&cb[8]=="X"&&cb[9]==""){ //bottom line possibility
		console.log("set cb9");
		document.getElementById("cell9").innerHTML = "O";
	}else if(cb[7]==""&&cb[8]=="X"&&cb[9]=="X"){
		console.log("set cb7");
		document.getElementById("cell7").innerHTML = "O";
	}else if(cb[7]=="X"&&cb[8]==""&&cb[9]=="X"){
		console.log("set cb8");
		document.getElementById("cell8").innerHTML = "O";
	}else if(cb[1]=="X"&&cb[4]=="X"&&cb[7]==""){ //left line possibility
		console.log("set cb7");
		document.getElementById("cell7").innerHTML = "O";
	}else if(cb[1]==""&&cb[4]=="X"&&cb[7]=="X"){
		console.log("set cb1");
		document.getElementById("cell1").innerHTML = "O";
	}else if(cb[1]=="X"&&cb[4]==""&&cb[7]=="X"){
		console.log("set cb4");
		document.getElementById("cell4").innerHTML = "O";
	}else if(cb[2]=="X"&&cb[5]=="X"&&cb[8]==""){ //second vertical line possibility
		console.log("set cb8");
		document.getElementById("cell8").innerHTML = "O";
	}else if(cb[2]==""&&cb[5]=="X"&&cb[8]=="X"){
		console.log("set cb2");
		document.getElementById("cell2").innerHTML = "O";
	}else if(cb[2]=="X"&&cb[5]==""&&cb[8]=="X"){
		console.log("set cb5");
		document.getElementById("cell5").innerHTML = "O";
	}else if(cb[3]=="X"&&cb[6]=="X"&&cb[9]==""){ //right vertical line possibility
		console.log("set cb9");
		document.getElementById("cell9").innerHTML = "O";
	}else if(cb[3]==""&&cb[6]=="X"&&cb[9]=="X"){
		console.log("set cb3");
		document.getElementById("cell3").innerHTML = "O";
	}else if(cb[3]=="X"&&cb[6]==""&&cb[9]=="X"){
		console.log("set cb6");
		document.getElementById("cell6").innerHTML = "O";
	}else{
		do{
			let rand = parseInt(Math.random()*9) + 1;
			idName = idNames[rand-1];

			if(document.getElementById(idName).innerHTML == ""){
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
			}
		}while(true);
	}

}




function playerTakeTurn(e){

	if(e.innerHTML==""){
		e.innerHTML = currentPlayer;
		checkGameStatus();

		//if game not over, computer goes
		if(gameStatus == ""){
			setTimeout(function(){
					computerTakeTurn();
					checkGameStatus();
				}, 500
			);
			
		}

	}else{
		showLightBox("The box is already selected.","Please try another!");
	}

	
}



function checkGameStatus(){
	numTurns++;

	if(checkWins()){
		gameStatus = currentPlayer+" wins!";
		console.log("Game Status: " + gameStatus);
	}

	if(numTurns==9&&!checkWins()){
		gameStatus = "Tie Game";
		console.log("Game Status: " + gameStatus);
	}

	currentPlayer = (currentPlayer == "X" ? "O" : "X");

	if(gameStatus!=""){
		setTimeout(function(){showLightBox(gameStatus,"Game Over.");}, 500);

	}
}

function checkWins(){
	let cb = [];
	cb[0] = "";
	cb[1] = document.getElementById("cell1").innerHTML;
	cb[2] = document.getElementById("cell2").innerHTML;
	cb[3] = document.getElementById("cell3").innerHTML;
	cb[4] = document.getElementById("cell4").innerHTML;
	cb[5] = document.getElementById("cell5").innerHTML;
	cb[6] = document.getElementById("cell6").innerHTML;
	cb[7] = document.getElementById("cell7").innerHTML;
	cb[8] = document.getElementById("cell8").innerHTML;
	cb[9] = document.getElementById("cell9").innerHTML;

	if(cb[1]!=""&&cb[1]==cb[2]&&cb[2]==cb[3]){
		console.log("returning true");
		return true;
	}

	if(cb[4]!=""&&cb[4]==cb[5]&&cb[5]==cb[6]){
		console.log("returning true");
		return true;
	}

	if(cb[7]!=""&&cb[7]==cb[8]&&cb[8]==cb[9]){
		console.log("returning true");
		return true;
	}

	if(cb[1]!=""&&cb[1]==cb[4]&&cb[4]==cb[7]){
		console.log("returning true");
		return true;
	}

	if(cb[2]!=""&&cb[2]==cb[5]&&cb[5]==cb[8]){
		console.log("returning true");
		return true;
	}

	if(cb[3]!=""&&cb[3]==cb[6]&&cb[3]==cb[9]){
		console.log("returning true");
		return true;
	}

	if(cb[1]!=""&&cb[1]==cb[5]&&cb[5]==cb[9]){
		console.log("returning true");
		return true;
	}

	if(cb[3]!=""&&cb[3]==cb[5]&&cb[3]==cb[7]){
		console.log("returning true");
		return true;
	}

	return false;
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

	//if the game is over, shows controls
	if(gameStatus!=""){
		changeVis("controls");
	}

}

