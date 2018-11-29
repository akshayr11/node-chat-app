var socket = io();
socket.on('connect', function() {
	console.log('Connected to the server');
	socket.on('newMessage', function(message) {
		const li = document.createElement('div');
		var textnode = document.createTextNode(`${message.from}: ${message.text} `);
		li.appendChild(textnode);
		var list = document.getElementById('messages');
		list.insertBefore(li, list.childNodes[0]);
	});
});
socket.on('disconnect', function() {
	console.log('Disonnected from the server');
});
// socket.emit(
// 	'createMessage',
// 	{
// 		from: 'Akshay',
// 		text: 'Hi!!'
// 	},
// 	function(data) {
// 		console.log('Got It', data);
// 	}
// );
document.getElementById('message-form').addEventListener('submit', function(event) {
	event.preventDefault();
	const message = document.getElementById('message-form').elements[0].value;
	socket.emit(
		'createMessage',
		{
			from: 'User',
			text: message
		},
		function(data) {
			console.log('Got It', data);
			// console.log(document.getElementById('message-form').elements[0]);
		}
	);
});
