var arr = ["Welcome to 2081! <br><br> The zombies have taken over the earth. <br><br> You are the only survived man in this jail. <br><br> Tonight, you will escape the jail. <br><br> Click continue for more instructions.",
		 "Use the four arrow keys to navigate yourself. <br><br> You must protect yourself from the zombies. <br><br> Your goal is to get the key, and then open the jaildoor. <br><br> Remember: You may only jump over the wall once you have the key. <br><br> Click continue to start the game!",];
var count = 0;

function button(){
	if(count<2){
		document.getElementById("display").innerHTML = arr[count];
		count++;
	}else{
		window.location.href = "index.html";
	}
}



