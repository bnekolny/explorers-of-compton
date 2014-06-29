

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

	var webviewPlayerName = "";
	var webviewGameIDSelection;
	var webviewGamePlayer1Name = "";
	var webviewGamePlayer2Name = "";



	// Create a game on button click
	function createGame(player1Name, player2Name) {
		$.post('/tictactoe/api', 
		       { player1 : player1Name,
		         player2 : player2Name} );
	};
	$("#create_game_btn").click(function(){
		createGame($("#create_game_form input[name=player1]").val(),$("#create_game_form input[name=player2]").val());
	});



	// Create a game on button click
	function listGames() {
		$.getJSON('/tictactoe/api', function(data){
			var items = [];
			for(var entry in data){
				var gameDatabase = data[entry];
				for(var gameEntry in gameDatabase){
					var gameInfo = gameDatabase[gameEntry];
					// Only add games to display if player1 and player2 are defined.
					// eventually check agains my player name and if the games are complete
					if(webviewPlayerName == ""){
						if(gameInfo["player1"] && gameInfo["player2"]){
							$("<div class='gameSelect' id='" + gameInfo["_id"] + "'>" + gameInfo["player1"] + " vs " +  gameInfo["player2"] + "</div>" ).appendTo("#listOfGames");
						}
					}
					else{
						if((gameInfo["player1"] && gameInfo["player2"]) && ((gameInfo["player1"] == webviewPlayerName)||(gameInfo["player2"] == webviewPlayerName))){
							$("<div class='gameSelect' id='" + gameInfo["_id"] + "'>" + gameInfo["player1"] + " vs " +  gameInfo["player2"] + "</div>" ).appendTo("#listOfGames");
						}
					}

				}
			}

		});
	};
		listGames();
		populateGameInformation();



	function loadGameInfo(gameID){
		$.getJSON('/tictactoe/api/:' + gameID, function(data){
			var items = [];
			for(var entry in data){
				var gameEntryData = data[entry];
				webviewGamePlayer1Name = gameEntryData["player1"];
				webviewGamePlayer2Name = gameEntryData["player2"];
				populateGameInformation();
			}
		});
	}





    $("#listOfGames").on("click",".gameSelect",function(event) {
		webviewGameIDSelection = event.target.id;
		$("div").removeClass("highlight");
		$("#" + webviewGameIDSelection).addClass("highlight");

		// Request game information specifically about this game using id
		loadGameInfo(webviewGameIDSelection);
    });

    $("#login_form").change(function(){
    	webviewPlayerName = $("#login_form input[name=playerName]").val();
    	$(".gameSelect").remove();
    	listGames();

    });


    function populateGameInformation(){
    	$('.currentGameInformation').remove();
    	$("<div class='currentGameInformation' >" +
    	"Player1: " + webviewGamePlayer1Name + " <BR> " +
    	"Player2: " + webviewGamePlayer2Name + " <BR> " +
    	"</div >" ).appendTo("#gameInformation");
    }

});


