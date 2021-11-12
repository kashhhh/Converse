const app = require('express')();
const http = require('http').createServer(app);
const cors= require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});


io.on('connection', socket => {
  console.log(socket.id);
  
  socket.on('message', ({username, message, room_key, user_id, sent_on}) => {

    console.log({username, message, room_key, user_id, sent_on}, socket.id);

    io.emit('message', {username, message, room_key, user_id, sent_on});

  })
});


http.listen(4000, () => {
  console.log("Listening on port 4000");
})