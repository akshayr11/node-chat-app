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
	socket.emit('newMessage', {
		from: 'server',
		text: 'Message from Server'
	});

	socket.on('createMessage', message => {
		console.log('From Client', message);
	});

	socket.on('disconnect', () => {
		console.log('User Disconnected');
	});
});
app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});
