/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// Collaboration

var io = require('socket.io').listen(8080);

var users = {};

var documents = ['welcomedoc'];

io.sockets.on('connection', function (socket) {

    socket.on('adduser', function (username) {
        socket.username = username;
        socket.doc = 'welcomedoc';
        users[username] = username;
        socket.join(documents[0]);
        socket.emit('updatechat', 'SERVER', 'you have connected to the welcomedoc');
        socket.broadcast.to(socket.doc).emit('updatechat', 'SERVER', username + ' has connected to this room');
    });

    socket.on('sendChat', function (data) {
        io.sockets.in(socket.room).emit('updateChat', socket.username, data);
    });

    socket.on('sendUpdate', function (data) {
        console.log();
        io.sockets.in(socket.room).emit('updateDocument', socket.username, data);
    });

    socket.on('switchRoom', function (newdoc) {
        socket.leave(socket.room);
        socket.join(newdoc);
        socket.emit('updatechat', 'SERVER', 'you have connected to ' + newdoc);
        socket.broadcast.to(socket.doc).emit('updatechat', 'SERVER', socket.username + ' has left this room');
        socket.doc = newdoc;
        socket.broadcast.to(newdoc).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    });

    socket.on('disconnect', function () {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });
});

