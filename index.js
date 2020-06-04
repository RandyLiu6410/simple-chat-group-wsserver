const webSocketsServerPort = process.env.PORT || 5000;
const express = require('express')
const app = express()
const http = require('http');

const server = http.Server(app)
    .listen(webSocketsServerPort,()=>{console.log(`webserver listening on port ${webSocketsServerPort}`)})

const io = require('socket.io')(server)

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

io.on('connection', socket => {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + socket.client + '.');

  console.log('success connect!')
  //監聽透過 connection 傳進來的事件
  socket.on('getMessage', message => {
      //回傳 message 給發送訊息的 Client
      socket.emit('getMessage', message)
  })

  socket.on('disconnect', () => console.log(socket.client + 'left'));
})