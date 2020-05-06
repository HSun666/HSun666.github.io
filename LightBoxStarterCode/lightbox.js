function changeVis(divID){
	var element = document.getElementById(divID);
	if(element){
		element.className = (element.className=='hidden') ? 'unhidden' : 'hidden';
	}
}

function displayLightBox(imageFile,alt){
	var image = new Image();
	var bigImage = document.getElementById("bigImage");

	image.src = "images/" + imageFile;
	image.alt = alt;

	image.onload = function(){
		var width = image.width;
		document.getElementById("boundaryBigImage").style.width = width + "px";
	};

	bigImage.src = image.src;
	bigImage.alt = image.alt;

	changeVis('lightbox');
	changeVis('boundaryBigImage');
}

