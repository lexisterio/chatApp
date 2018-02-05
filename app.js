const express = require('express');
const app = express();

const io = require('socket.io')(); //The () at the end incentiates it so you can use it

app.use(express.static('public'));


//This is to get express to use the routers file we made in index (Set up Routes)
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));


//Added sever = to the listen
const server = app.listen(3000, () => {
  console.log('app running on port 3000!');
});


//Socket - Get it up and running
io.attach(server);

io.on('connection', socket => {
  console.log('a user has connected!');


  io.emit('chat message', { for: 'everyone', message: `${socket.id} is here!`});

//Handle message from sent for the client
socket.on('chat message', msg => {

io.emit('chat message', { for: 'everyone', message: msg}); //here we pass in the message not the user name

})


  socket.on('disconnect', () => {
    console.log('A user has been disconnectted');

  io.emit('disconnect message', `${socket.id} has left the building`);

  });


});
