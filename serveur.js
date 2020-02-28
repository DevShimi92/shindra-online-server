var express = require('express');
var app = express();
var server = require('http').Server(app);
var io  =  require ( 'socket.io' ) . listen ( server ) ;  

server.listen(8081, function () {
  console.log(`Listening ${server.address().address} on ${server.address().port}`);
	
io.on('connection', function (socket) {
  console.log('a user connected ');
  
  socket.emit('authentification', {  });

  socket.on('Ping', function () {
    console.log('Ping');
     
    // ** Test de réponse ** //
    
    socket.emit('Pong');
  });
  
  socket.on('authentification', function (receiveData) {
    console.log(receiveData);
    
    var etat; 
    var data;

    // ** Traitement pour l'authentification d'un utilisateur ** //

    if (receiveData.username === '')
      {
        etat = "error";
      }
    
    socket.emit('authentification_Data',etat,data);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');

  });
});




});

