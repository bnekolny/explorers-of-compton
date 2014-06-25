var createGame = function() {
	var form = document.getElementById('createGame');

   alert($.post('/tictactoe/api', 
   	{player1 : form.elements.player1,
   	player2 : form.elements.player2
}));
};