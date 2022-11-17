var url = require('url'),
  path = require('path'),
  fs = require('fs'),

  config = require('./config.js');

exports.checkIfFileExists = function (
  request, response, successCallback, failCallback
) {
  var uri = config.APP_DIR + url.parse(request.url).pathname,
    filename = path.join(process.cwd(), uri);

  fs.exists(filename, function (exists) {
    if (exists) {
      successCallback(request, response, filename);
    } else if (!exists && typeof failCallback !== 'undefined') {
      failCallback(request, response, filename);
    }
  });
};

exports.fileNotFound = function (request, response, filename) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('[' + filename + '] 404 Not Found\n');
  response.end();
};

exports.serveFile = function (request, response, filename) {
  if (fs.statSync(filename).isDirectory()) {
    filename += '/index.html';
  }

  fs.readFile(filename, 'binary', function(err, file) {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(err + '\n');
      response.end();

      return;
    }

    var headers = {};
    var contentType = config.contentTypesByExtension[path.extname(filename)];

    if (contentType) {
      headers['Content-Type'] = contentType;
    }

    response.writeHead(200, headers);
    response.write(file, 'binary');
    response.end();
  });
};
