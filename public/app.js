var socket = io.connect('http://localhost:1337');
$(document).ready(function(){
    $('form').submit(function(e){
        e.preventDefault(); 
        socket.emit('chat_message', $('#newMessage').val());
        $('#newMessage').val('');
        return false;
    })
})

socket.on('chat_message', function(msg) {
    $('#messages').append($('<li>').html(msg));
    console.log(msg)
});

socket.on('is_online', function(username) {
    $('#messages').append($('<li>').html(username));
});

//this is only for testing.
var username = prompt('Gib hier deinen Benutzernamen ein: ');
socket.emit('username', username);

