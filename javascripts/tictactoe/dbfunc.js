

$(document).ready( function(){

	var myButton = document.getElementById("create_game_btn");
	var myForm = document.getElementById("create_game_form");

	function createGame(form) {
		$.post('/tictactoe/api', 
		       { player1 : form.player1.value,
		         player2 : form.player2.value } );
	};

	function clickedCreateGame(){

		createGame(myForm);
	};

	myButton.addEventListener('click', clickedCreateGame,false);
});
