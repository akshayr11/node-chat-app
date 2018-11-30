var socket = io();
socket.on('connect', function() {
	console.log('Connected to the server');
	socket.on('newMessage', function(message) {
		var chatBox = document.querySelector('ul');
		var newMessage = document.createElement('li');
		newMessage.textContent = message.from + " " + moment(message.createdAt).format('h:mma') + ': ' + message.text;
		chatBox.appendChild(newMessage, chatBox.firstElementChild);
	});
});
socket.on('disconnect', function() {
	console.log('Disonnected from the server');
});
const messageForm = document.getElementById('message-form');
messageForm.addEventListener('submit', function(event) {
	event.preventDefault();
	var message = messageForm.elements[0].value;
	socket.emit(
		'createMessage',
		{
			from: 'User',
			text: message
		},
		function(data) {
			messageForm.elements[0].value = '';
		}
	);
});

// function getGeoLocation() {
// 	if ('geolocation' in navigator) {
// 		/* geolocation is available */
// 		navigator.geolocation.getCurrentPosition(
// 			function(position) {
// 				socket.emit('createLocationMessage', {
// 					latitude: position.coords.latitude,
// 					longitude: position.coords.longitude
// 				});
// 			},
// 			function() {
// 				alert('Unable to fetch location');
// 			}
// 		);
// 	} else {
// 		alert('Geolocation not supported by your browser');
// 		/* geolocation IS NOT available */
// 	}
// }
