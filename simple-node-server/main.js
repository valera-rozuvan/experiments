var http = require('http'),

  serveStatic = require('./server/serve-static.js'),
  serveRest = require('./server/serve-rest.js'),

  port = process.argv[2] || 8888;

http.createServer(function (request, response) {
  serveStatic.checkIfFileExists(
    request, response,
    serveStatic.serveFile,
    // serveStatic.fileNotFound
    serveRest.apiCall
  );
}).listen(parseInt(port, 10));

console.log(
  'Static file server running at\n' +
  '  => http://localhost:' + port + '\n' +
  'CTRL + C to shutdown'
);
