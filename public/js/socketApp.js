$(document).ready(function() {
	
	function timer() {
		typing = false;
	}


	var socket = io();
	$('#messages').append($('<li>')
		.text("------ Hello and welcome to my chat app! ------"));

	/*$('#m').is(':focus')*/
	//Prototype typing code. - broken
	/*if ($('#m').is(':focus')) {
		socket.emit('typing', 'true');
		console.log("True!")
	} else {
		socket.emit('typing', 'false');
		console.log("false");
	}*/

	$('form').submit(function() {
		socket.emit('chat', $('#m').val());
		$('#m').val('');
		return false;

	});

	socket.on('joined', function(id) {
		$('#messages').append($('<li>').text(id + " has joined the chat."));
	});
	socket.on('typing', function(blean) {
		if(blean === 'true') {
			console.log(blean);
			$('#typing').addClass('yes');
		} else if (blean === 'false') {
			console.log(blean);
			$('#typing').removeClass('yes');
		}
	});
	socket.on('chat', function(msg) {
		$('#messages').append($('<li>').text(msg));
	});
	socket.on('disconnect', function(msg) {
		$('#messages').append($('<li>').text(msg + " has left the chat."));
	});
});