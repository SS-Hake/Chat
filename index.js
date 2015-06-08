var port = 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile('index.html');
});


io.on('connection', function(socket) {
	io.emit('joined', socket.id);
	console.log(socket.id + "connected");
	socket.on('chat', function(msg) {
		io.emit('chat', msg);
	});

	socket.on('typing', function(blean) {
		console.log("Recieved typing.")
		io.emit('typing', blean);
	});

	io.on('disconnect', function(socket) {
		io.emit('chat', socket.id);
		console.log("called");
	});
});


http.listen(port, function() {
	console.log('Running on port: ' + port);
});