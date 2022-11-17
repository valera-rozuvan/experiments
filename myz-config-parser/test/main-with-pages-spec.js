'use strict';

var path = require('path'),
  chai = require('chai'),
  sinonChai = require('sinon-chai'),
  chaiAsPromised = require('chai-as-promised'),

  mainModule = require('../index'),

  expect = chai.expect;

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('main module with pages', function () {
  var retVal;

  beforeEach(function () {
    retVal = null;
  });

  describe('config file exists and contains valid JSON with pages', function () {
    describe('in the same folder', function () {
      beforeEach(function () {
        var testConfigFile = path.join(__dirname, 'pages/valid_test_one_config.json');

        retVal = mainModule.parse(testConfigFile);
      });

      it('parse returns a promise object', function () {
        expect(retVal).to.be.an('object');
        expect(retVal.then).to.be.an('function');
      });

      it('parse promise is resolved with correct value', function (done) {
        retVal
          .should.eventually.deep.equal({
            test: 42,
            pageCollection: [
              {page: 'one'},
              {page: 'two'}
            ]
          })
          .notify(done);
      });
    });

    describe('in different folders', function () {
      beforeEach(function () {
        var testConfigFile = path.join(__dirname, 'pages/valid_test_two_config.json');

        retVal = mainModule.parse(testConfigFile);
      });

      it('parse returns a promise object', function () {
        expect(retVal).to.be.an('object');
        expect(retVal.then).to.be.an('function');
      });

      it('parse promise is resolved with correct value', function (done) {
        retVal
          .should.eventually.deep.equal({
            test: 45,
            pageCollection: [
              {page: 'one1'},
              {page: 'two2'}
            ]
          })
          .notify(done);
      });
    });
  });
});
