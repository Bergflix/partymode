var socket = io.connect('http://localhost:1337');

async function createRoom(name, pw){
    let id = Math.floor(Math.random()*16777215).toString(32);
    socket.emit('create', {id, name, pw});
    return id;
}


$(document).ready(function(){
    $('form').submit(function(e){
        e.preventDefault(); 
        socket.emit('chat_message', $('#newMessage').val());
        $('#newMessage').val('');
        return false;
    })
})


//bro ka was genau ich da mache aber auf jeden fall ist es noch lange nicht ausgereift
socket.on('join_room', function(id, name, pw) {
    socket.join(name);
    window.location.href = 'https://localhost:1337/' + id; 
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

