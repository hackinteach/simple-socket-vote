const data = {};
var debug = require('debug')('socket:server');
const express = require('express');
const app = express();
const logger = require('morgan');


const server = require('http').createServer(app);
const io = require('./io.js')({server, data});
const cookieParser = require('cookie-parser');


const voteRouter = require('./routes/vote')({"io": io, data: data});
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/vote', voteRouter);

server.listen(3000);
server.on('error', onError);
server.on('listening', onListening);
