const process = require('process');
const minimist = require('minimist');

const knownOptions = {
  string: ['build_dir', 'port'],
};
const options = minimist(process.argv.slice(2), knownOptions);

if (typeof options.build_dir !== 'string') {
  console.log('ERROR!');
  console.log('---> You must specify client build directory path.');
  console.log('--->    --build_dir {PATH_TO_DIRECTORY}');
  console.log('')

  process.exit(1);
}

const root = options.build_dir;

exports.getRootPath = function () {
  return root;
};

if (typeof options.port !== 'string') {
  console.log('ERROR!');
  console.log('---> You must specify port to listen on.');
  console.log('--->    --port {PORT_NUMBER}');
  console.log('')

  process.exit(1);
}

const port = options.port;

exports.getPort = function () {
  return port;
};
