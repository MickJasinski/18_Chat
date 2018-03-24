// Load modules.
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const UsersService = require('./UsersService');


// Create app, server and user service.
const app = express();
const server = http.createServer(app);
const userService = new UsersService();

// Load socketIo, create directiory for serving files.
const io = socketIo(server);
app.use(express.static(__dirname + '/public'));

// Serv index.html on home call
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Set channel.
server.listen(3000, function() {
  console.log('listening on *:3000');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Create connection
io.on('connection', function(socket) {

  // Method 'io.on()' is listening for client's connection. 
  // After connection run callback

  // Space for functions to be added after connecting client. Argument 'socket' snands for person entered the chat.

  // Client is listening for joining chat message.
  socket.on('join', function(name) {
    // User who joined app is added to service that holds a list of active users.
    userService.addUser({
      id: socket.id,
      name
    });
    // App sends updates that keep a list up to date for all users waiting for updates.
    io.emit('update', {
      users: userService.getAllUsers()
    });
  });
  // If connection is lost run this to remove user from userService and send update to other users
  socket.on('disconnect', () => {
    userService.removeUser(socket.id);
    socket.broadcast.emit('update', {
      users: userService.getAllUsers()
    });
  });
  socket.on('message', function(message) {
    const { name } = userService.getUserById(socket.id);
    socket.broadcast.emit('message', {
      text: message.text,
      from: name
    });
  });
});



server.listen(3000, function() {
  console.log('listening on *:3000');
});