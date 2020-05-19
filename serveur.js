var express = require('express');
var app = express();
var server = require('http').Server(app);
var io  =  require ( 'socket.io' ) . listen ( server ) ;  
var log4js = require('log4js');
const fs = require('fs');
const api = require('http')

log4js.configure({
  appenders: {
    everything: { type: 'file', filename: 'logs/all-the-logs.log' },
    emergencies: { type: 'file', filename: 'logs/error.log' },
     console : {    type: "console" ,layout: {
        type: 'pattern',
        pattern: '%[[%d{dd-MM-yyyy hh:mm:ss.SSS}] [%p] %c -%] %m',
    }},
    'just-errors': { type: 'logLevelFilter', appender: 'emergencies', level: 'error' }
  },
  categories: {
    default: { appenders: ['just-errors', 'everything','console' ], level: 'debug' }
  }
});
var log = log4js.getLogger('SERVER');

// On charge le fichier de config
let rawdata = fs.readFileSync('config.json');
let configJSON = JSON.parse(rawdata);

const optionsPingAPI = {
  hostname: configJSON.api.address,
  port: configJSON.api.port,
  path: '/',
  method: 'GET'
} 

server.listen(configJSON.port,configJSON.address, function () {
  log.info(`Listening ${server.address().address} on ${server.address().port}`);

  // Call de l'api : Si il n'est pas présent, le serveur se ferme (vu que on peut rien faire sans)
  const req = api.request(optionsPingAPI, res => {
      log.info('API présente');
  });
  
  req.on('error', error => {
      log.error(error)
      server.close(() => {
        log.error('API non présente, arrêt du serveur');
      })
  });

  req.end();

	
io.on('connection', function (socket) {
  log.info('A user connected ');
  
  socket.emit('authentification', {  });

  socket.on('Ping', function () {
    log.info('Ping');
     
    // ** Test de réponse ** //
    
    socket.emit('Pong');
  });
  
  socket.on('authentification', function (receiveData) {
    log.info(receiveData);
    
    var etat; 
    var data;

    // ** Traitement pour l'authentification d'un utilisateur ** //

    if (receiveData.username === '')
      {
        etat = "error";
        socket.emit('authentification_Data',etat,data);
        socket.disconnect();
      }
    else
      {
        socket.emit('authentification_Data',etat,data);
      }
    
  });

  socket.on('disconnect', function () {
    log.info('user disconnected');

  });
});




});

