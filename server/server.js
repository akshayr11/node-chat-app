const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', socket => {
	console.log(`New user connected`);

	// Emit a message
	socket.emit(
		'newMessage',
		generateMessage('Admin', 'Welcome to chat App!')
		// socket.emit Emits event to the connected socket (single)
	);

	// Broadcast a message
	socket.broadcast.emit(
		'newMessage',
		generateMessage('Admin', 'New User joined')
		// socket.broadcast.emit emits event to all connection excluding to the socket who sent the event
	);

	socket.on('createMessage', (message, callback) => {
		// io.emit emits event to all connection including to the user who sent the event
		io.emit(
			'newMessage',
			generateMessage(message.from, message.text)
			// message (object) sent from client by emitting createMessage event
		);
		callback({ text: 'This is from the server' });
	});

	socket.on('createLocationMessage', cords => {
		io.emit('newMessage', generateMessage('Admin', `${cords.latitude}, ${cords.longitude}`));
	});

	socket.on('disconnect', () => {
		console.log('User Disconnected');
	});
});
app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
