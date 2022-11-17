var ip = require('ip');
var fs = require('fs');
var PeerServer = require('peer').PeerServer;

var port = 9000;
var server = new PeerServer({
  port: port,
  host: '0.0.0.0',
  allow_discovery: true,
  ssl: {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
    ca: fs.readFileSync('./ssl/ca.crt')
  }
});

server.on('connection', function (id) {
  console.log('new connection with id ' + id);
});

server.on('disconnect', function (id) {
  console.log('disconnect with id ' + id);
});

server.on('error', function (err) {
  console.log(err.type);
});

console.log('peer server running on ' + ip.address() + ':' + port);
