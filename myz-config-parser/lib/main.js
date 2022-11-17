'use strict';

var path = require('path'),
  q = require('q'),
  readFile = require('./read_config').readFile;

function _processPageCollection(configFilePath, configObj) {
  var deferred = q.defer(),
    configFileDir, error, pagesProcessed;

  if (
    typeof configObj.pageCollection !== 'undefined' &&
    configObj.pageCollection.constructor === Array &&
    configObj.pageCollection.length > 0
  ) {
    configFileDir = path.dirname(configFilePath);

    pagesProcessed = 0;

    configObj.pageCollection.forEach(function (pageConfig, idx) {
      var pageConfigPath = path.join(configFileDir, pageConfig);

      _parse(pageConfigPath).then(function (pageObj) {
        configObj.pageCollection[idx] = pageObj;

        pagesProcessed += 1;

        if (configObj.pageCollection.length === pagesProcessed) {
          deferred.resolve(configObj);
        }
      }, function (err) {
        error = new Error(err.message + ' in pageCollection section of file ' + configFilePath);

        deferred.reject(error);

        return;
      });
    });
  } else {
    deferred.resolve(configObj);
  }

  return deferred.promise;
}

function _parse(configFilePath) {
  var deferred = q.defer();

  readFile(configFilePath).then(function (fileData) {
    var configObj = null,
      error;

    try {
      configObj = JSON.parse(fileData);
    } catch (err) {
      error = new Error(err.message + ' in file ' + configFilePath);

      deferred.reject(error);

      return;
    }

    _processPageCollection(configFilePath, configObj).then(function (_configObj) {
      deferred.resolve(_configObj);
    }, function (err) {
      deferred.reject(err);
    });
  }, function (error) {
    deferred.reject(error);
  });

  return deferred.promise;
}

module.exports = {
  parse: _parse
};
