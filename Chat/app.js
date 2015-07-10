$(document).ready(function() {

	var getElement = function(s) {
		return document.querySelector(s);
	},

	status = getElement('.chat-status span'),
	textarea = getElement('.chat-textarea'),
	chatName = getElement('.chat-name'),

	statusDefault = status.textContent,
	
	setStatus = function(s) {
		status.textContent = s

		if(s !== statusDefault) {
			var delay = setTimeout(function() {
				setStatus(statusDefault)
				clearInterval(delay)
			}, 3000)
		}	
	};

	setStatus("Testing...")

	try {
		var socket = io.connect('http://127.0.0.1:8080');
	} catch(e) {
		//Set warning
		console.log(e)
	}
	console.log(socket)
	if(socket !== undefined) {

		socket.on('status', function(data) {
			setStatus((typeof data === 'object') ? data.message : data)

			if(data.clear === true) {
				textarea.value = ''
			}
		})

		textarea.addEventListener('keydown', function(evt) {
			var self = this,
				name = chatName.value;

			//Handy for keyvalues.
			console.log(event.which)

			if(event.which === 13 && event.shiftKey === false) {
				console.log("send")
				socket.emit('input', {name: name, message: self.value})
			
				event.preventDefault();
			}

		})
	}
})