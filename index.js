// This goes in the server



const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4001, function(){
  console.log('listening to requests on port 4001')
});

//Static files

app.use(express.static('public'));

// Socket setup
// takes a parameter which is the server we want to work with

const io = socket(server);

// Every user has a unique socket and the socket variable refers to each users' socket
// connection is the connection to the server 

io.on('connection', function(socket){
  console.log('Made contact with the socket', socket.id);

  //Handle Chat Event
  socket.on('chat', function(data){
    //Should add the db.something right here for full stack chat and enable persistence 
    io.sockets.emit('chat', data);
  });

  //Handle Typing Event
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data)
  });

});