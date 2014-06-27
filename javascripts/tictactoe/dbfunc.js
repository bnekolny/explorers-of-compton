

// $(document).ready( function(){

// 	var myButton = document.getElementById("create_game_btn");
// 	var myForm = document.getElementById("create_game_form");

// 	function createGame(form) {
// 		$.post('/tictactoe/api', 
// 		       { player1 : form.player1.value,
// 		         player2 : form.player2.value } );
// 	};

// 	function clickedCreateGame(){

// 		createGame(myForm);
// 	};

// 	myButton.addEventListener('click', clickedCreateGame,false);
// });


$(document).ready(function(){

	// On load get the game database and display list of games





	// Create a game on button click
	function createGame(player1Name, player2Name) {
		$.post('/tictactoe/api', 
		       { player1 : player1Name,
		         player2 : player2Name} );
	};
	$("#create_game_btn").click(function(){
		createGame($("#create_game_form input[name=player1]").val(),$("#create_game_form input[name=player2]").val());
	});

});