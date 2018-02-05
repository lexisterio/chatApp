const express = require('express');
const app = express();
const io = require('socket.io')();


app.use(express.static('public'));


//This is to get express to use the routers file we made in index (Set up Routes)
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));


const server = app.listen(3000, () => {
  console.log('app running on port 3000!');
});

//socket - get it up and running
io.attach(server);

io.on('connection', socket => { // function(socket) {...}
  console.log('a user has been connected');
  io.emit('chat message', { for: 'everyone', message : `${socket.id} is here!`});

  //handle messages sent from the client
  socket.on('chat message', msg => {
  io.emit('chat message', { for: 'everyone', message : msg});

});

  socket.on('disconnect', () => {
    console.log('a user has disconnected');

    io.emit('disconnect message', `${socket.id} has left the building`);

  });

});
