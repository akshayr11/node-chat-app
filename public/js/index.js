var socket = io();
socket.on('connect', function() {
	console.log('Connected to the server');
	// socket.emit('createMessage', {
	// 	from: 'Client',
	// 	text: 'Message from Client'
	// });
});
socket.on('disconnect', function() {
	console.log('Disonnected from the server');
});

socket.on('newMessage', function(data) {
	console.log('New Message', JSON.stringify(data, undefined, 2));
});
