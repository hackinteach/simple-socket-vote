
const outputReducer = require('./util/reducer')

module.exports = ({server, data}) => {
  const io = require('socket.io')(server);
  
  io.on('connect', (client) => {
    const a = outputReducer(data)
    io.emit("result", a)
    
    client.on('reset', (_c) => {
      for (var key in data) {
        delete data[key];
    }
      const reducer = outputReducer(data)
      io.emit("result", reducer)
    })
  });



  return io
}