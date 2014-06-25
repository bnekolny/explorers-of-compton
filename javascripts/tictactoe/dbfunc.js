function createGame(form) {
    $.post('/tictactoe/api', 
   	       { player1 : form.player1.value,
   	         player2 : form.player2.value } );
};

//$('#create_game_btn').addEventListener('click', function () {
//    createGame($('#create_game_form'));
//});
