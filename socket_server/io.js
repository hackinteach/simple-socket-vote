const _ = require('lodash')

module.exports = ({server, data}) => {
  const io = require('socket.io')(server);
  io.on('connect', (client) => {
    const reducer = _.reduce(data, (result, value, key) => {
      
      if (value === false){
        result['NO']++
      } else if (value === true){
        result['YES']++
      }

      return result
    }, {'NO': 0, 'YES': 0})
    
    client.emit("result",reducer)
  });

  return io
}