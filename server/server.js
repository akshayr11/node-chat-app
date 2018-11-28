const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', socket => {
	console.log(`New user connected`);

	// Emit a message
	socket.emit('newMessage', {
		// socket.emit Emits event to the connected socket (single)
		from: 'Admin',
		text: 'Welcome to the chat app!!',
		createdAt: new Date().getTime()
	});

	// Broadcast a message
	socket.broadcast.emit('newMessage', {
		// socket.broadcast.emit emits event to all connection excluding to the socket who sent the event
		from: 'Admin',
		text: 'New User joined',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (message, callback) => {
		// io.emit emits event to all connection including to the user who sent the event
		io.emit('newMessage', {
			// message (object) sent from client by emitting createMessage event
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
		callback({text: 'This is from the server'});
	});

	socket.on('disconnect', () => {
		console.log('User Disconnected');
	});
});
app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
