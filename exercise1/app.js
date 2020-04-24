// Write your JS in here
alert("Leave this page if you are under 18!");
var pics = [
	"imgs/cat-drinking-vodka.jpg",
	"imgs/kitty_bed.jpg",
	"imgs/kitty_basket.jpg", 
	"imgs/kitty_laptop.jpg",
	"imgs/kitty_door.jpg",
	"imgs/kitty_sink.jpg",
	"imgs/kitty_wall.jpg"
]

var btn = document.querySelector("button")
var img = document.querySelector("img")
var counter = 1

btn.addEventListener("click", function(){
	if(counter === pics.length-1){
		counter = 0
	}
	img.src = pics[counter]
	counter = counter + 1
});



