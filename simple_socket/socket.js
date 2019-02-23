const app = require('./app')
const server = require('http').Server(app);
const io = require('socket.io')(server,{ origins: '*:*'});
io.set( 'origins', '*domain.com*:*' );

module.exports = {io, server}
