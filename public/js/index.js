var socket = io();
socket.on('connect', function() {
	console.log('Connected to the server');
	socket.on('newMessage', function(message) {
		var chatBox = document.querySelector('ul');
		var newMessage = document.createElement('li');
		newMessage.textContent = message.from + ':' + message.text;
		chatBox.appendChild(newMessage, chatBox.firstElementChild);
	});
});
socket.on('disconnect', function() {
	console.log('Disonnected from the server');
});
document.getElementById('message-form').addEventListener('submit', function(event) {
	event.preventDefault();
	var message = document.getElementById('message-form').elements[0].value;
	socket.emit(
		'createMessage',
		{
			from: 'User',
			text: message
		},
		function(data) {
			document.getElementById('message-form').elements[0].value = '';
		}
	);
});

// var locationButton = document.getElementById('send-location');
function getGeoLocation() {
	if ('geolocation' in navigator) {
		/* geolocation is available */
		navigator.geolocation.getCurrentPosition(
			function(position) {
				socket.emit('createLocationMessage', {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			},
			function() {
				return alert('Unable to fetch location');
			}
		);
	} else {
		return alert('Geolocation not supported by your browser');
		/* geolocation IS NOT available */
	}
}
