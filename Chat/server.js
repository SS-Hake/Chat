//Connect to the database and set up the socketio variable.
var mongo = require('mongodb').MongoClient,
	client = require('socket.io').listen(8080).sockets;

//Log to show the server has started.
console.log("[+] Server running...")

//Connect to the database, handle any error if the db cannot be found.
mongo.connect('mongodb://127.0.0.1/chat', function(err, db) {
	if(err) throw(err)

	//When a client connects, handle the socket interaction.
	client.on('connection', function(socket) {
		//Log to show someone connecting.
		console.log("[+] Someone has connected...")
		//Grab the collection within the db to store the messages.
		var col = db.collection('messages')

		socket.on('input', function(data) {
			//Log the data to the console.
			console.log(data)

			//Grab data from the passed object.
			var name = data.name,
				message = data.message,
				whitespacePattern = /^\s*$/;

			if (whitespacePattern.test(name)|| whitespacePattern.test(message)) {
				console.log('[-] Invalid...')
			} else {
				col.insert({name: name, message: message}, function(){
					console.log("[+] Inserted...")
				})
			}

		})

	})
})
