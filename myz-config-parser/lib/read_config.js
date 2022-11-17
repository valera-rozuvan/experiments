'use strict';

var fs = require('fs'),
  q = require('q');

function _readFile(filePath) {
  var deferred = q.defer(),
    error;

  if (typeof filePath === 'undefined') {
    error = new Error('file path is undefined');
    deferred.reject(error);
  } else if (typeof filePath !== 'string') {
    error = new Error('file path is not a string');
    deferred.reject(error);
  } else {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(data);
      }
    });
  }

  return deferred.promise;
}

module.exports = {
  readFile: _readFile
};
