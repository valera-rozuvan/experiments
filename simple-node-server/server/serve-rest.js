var querystring = require('querystring'),
  url = require('url');

var routes = {
  '/get_date': getDate
};

function getDate() {
  var datetime = new Date();

  return {
    currentDate: datetime
  };
}

exports.apiCall = function (request, response, filename) {
  var body = '';

  console.log('---------------------');

  request.on('data', function (data) {
    body += data;

    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6) {
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      request.connection.destroy();
    }
  });

  request.on('end', function() {
    console.log('request URI: ', request.url);
    console.log('POST data: ', querystring.parse(body));
    console.log('GET data: ', url.parse(request.url, true).query);

    if (typeof routes[request.url] !== 'undefined') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(routes[request.url]()));
    } else {
      response.writeHead(501, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'not implemented' }));
    }
  });
};
