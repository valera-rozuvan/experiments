const koa = require('koa');
const koa_static = require('koa-static');
// const path = require('path');
// const optionsParser = require(path.join('.', 'util', 'options_parser'));
const optionsParser = require('./util/options_parser.js');

let root = optionsParser.getRootPath();
let port = optionsParser.getPort();
let opts = {
  maxage: 0,           // Browser cache max-age in milliseconds. defaults to 0.
  hidden: false,       // Allow transfer of hidden files. defaults to false.
  index: 'index.html', // Default file name, defaults to 'index.html'.

  defer: false,        // If true, serves after yield next, allowing any
                       // downstream middleware to respond first.

  gzip: true           // Try to serve the gzipped version of a file
                       // automatically when gzip is supported by a client and
                       // if the requested file with .gz extension exists.
                       // defaults to true.
};

const app = koa();
app.use(koa_static(root, opts));
app.listen(port);

console.log(
  'Serving static contents from directory "' + root +
  '" on port "' + port + '".'
);
