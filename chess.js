$(document).ready(function() {

	// generate an 8x8 board
	generatePieces(8);





});

function generatePieces(len) {
	var boardContainer = document.getElementById("boardContainer");

	for(var i=0; i<len; i++) {
		for(var j=0; j<len; j++) {
			var square = document.createElement("div");

			square.classList.add("square");
			if( (i+j) % 2 ) {
				square.classList.add("dark");
			} else {
				square.classList.add("light");
			}

			square.id = "(" + i + "," + j + ")";

			boardContainer.appendChild(square);
		}
		boardContainer.appendChild(document.createElement("br"));
	}



}
