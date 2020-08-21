var socket = io.connect('http://localhost:1337');

async function createRoom(name, pw){
    let id = Math.floor(Math.random()*16777215).toString(32);
    socket.emit('create', {id, name, pw});
}

$(document).ready(function(){
    $('form').submit(function(e){
        e.preventDefault();
        socket.emit('chat_message', $('#newMessage').val());
        $('#newMessage').val('');
        return false;
    })
})

socket.on('join_room', function(id, name, pw) {
    socket.join(name);
})

socket.on('chat_message', function(msg) {
    $('#messages').append($('<li>').html(msg));
    console.log(msg)
});

socket.on('is_online', function(username) {
    $('#messages').append($('<li>').html(username));
});

function dec2hex (dec) {
  return dec < 10
    ? '0' + String(dec)
    : dec.toString(16)
}

function generateId (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}


function createRoom(){
  let id = generateId(15);
  let name = document.getElementById('');
  let pw = document.getElementById('');
  socket.emit('create', {id, name, pw});
}


/*
var username = prompt('Gib hier deinen Benutzernamen ein: ');
socket.emit('username', username);
*/
