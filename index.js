const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', ' <i>' + socket.username + ' ist dem Raum beigetreten. </i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', ' <i>' + socket.username + ' hat den Raum verlassen. </i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

    socket.on('create', function(id, name, pw){
        io.emit('join_room', {id, name, pw});
    })

});

const server = http.listen(1337, function() {
    console.log("Der Server läuft unter dem port 1337.")
});