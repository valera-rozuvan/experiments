const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');

const RouteLogMiddleware = require('./server/middleware/route-log-middleware');
const CatchErrorMiddleware = require('./server/middleware/catch-error-middleware');

const Router = require('./server/router');

const app = express();
const port = 3000;

app.use(RouteLogMiddleware);

app.use('/static', express.static('web_app'));

app.get('/', Router.index);

app.get('/error', Router.error);
app.get('/*', Router.notFound);

app.use(CatchErrorMiddleware);

let sslOptions = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

let serverHttps = https.createServer(sslOptions, app).listen(port, (err) => {
  if (err) {
    console.log('Error while starting Express Server:');
    console.log(err);

    return;
  }

  console.log(`Express Server is listening on ${port}.`);
});
