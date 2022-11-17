'use strict';

var path = require('path'),
  chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  chaiAsPromised = require('chai-as-promised'),

  mainModule = require('../index'),

  expect = chai.expect,
  assert = chai.assert;

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

function hello(name, cb) {
  cb('hello ' + name);
}

describe('hello', function () {
  it('should call callback with correct greeting', function () {
    var cb = sinon.spy();

    hello('foo', cb);

    cb.should.have.been.calledWith('hello foo');
  });
});

describe('main module without pages', function () {
  var retVal;

  beforeEach(function () {
    retVal = null;
  });

  describe('config file path is undefined', function () {
    beforeEach(function () {
      retVal = mainModule.parse();
    });

    it('parse returns a promise object', function () {
      expect(retVal).to.be.an('object');
      expect(retVal.then).to.be.an('function');
    });

    describe('parse promise is rejected', function () {
      it('error object is returned', function () {
        return retVal.should.be.rejectedWith(Error);
      });

      it('correct error message is returned', function () {
        return assert.isRejected(retVal, /^file path is undefined$/);
      });
    });
  });

  describe('config file path is not a string', function () {
    beforeEach(function () {
      retVal = mainModule.parse({a: 42});
    });

    it('parse returns a promise object', function () {
      expect(retVal).to.be.an('object');
      expect(retVal.then).to.be.an('function');
    });

    describe('parse promise is rejected', function () {
      it('error object is returned', function () {
        return retVal.should.be.rejectedWith(Error);
      });

      it('correct error message is returned', function () {
        return assert.isRejected(retVal, /^file path is not a string$/);
      });
    });
  });

  describe('config file does not exist', function () {
    var testConfigFile;

    beforeEach(function () {
      testConfigFile = path.join(__dirname, 'wrong_file_test_config.json');

      retVal = mainModule.parse(testConfigFile);
    });

    it('parse returns a promise object', function () {
      expect(retVal).to.be.an('object');
      expect(retVal.then).to.be.an('function');
    });

    describe('parse promise is rejected', function () {
      it('error object is returned', function () {
        return retVal.should.be.rejectedWith(Error);
      });

      it('correct error message is returned', function () {
        return assert.isRejected(retVal, /no such file or directory/);
      });

      it('error message contains config file path', function () {
        return assert.isRejected(retVal, testConfigFile);
      });
    });
  });


  describe('config file contains invalid json', function () {
    var testConfigFile;

    beforeEach(function () {
      testConfigFile = path.join(__dirname, 'bad_json_test_config.json');

      retVal = mainModule.parse(testConfigFile);
    });

    it('parse returns a promise object', function () {
      expect(retVal).to.be.an('object');
      expect(retVal.then).to.be.an('function');
    });

    describe('parse promise is rejected', function () {
      it('error object is returned', function () {
        return retVal.should.be.rejectedWith(Error);
      });

      it('correct error message is returned', function () {
        return assert.isRejected(retVal, /Unexpected token .* in JSON at position/);
      });

      it('error message contains config file path', function () {
        return assert.isRejected(retVal, testConfigFile);
      });
    });
  });

  describe('config file exists and contains valid JSON', function () {
    beforeEach(function () {
      var testConfigFile = path.join(__dirname, 'valid_test_config.json');

      retVal = mainModule.parse(testConfigFile);
    });

    it('parse returns a promise object', function () {
      expect(retVal).to.be.an('object');
      expect(retVal.then).to.be.an('function');
    });

    it('parse promise is resolved with correct value', function (done) {
      retVal
        .should.eventually.deep.equal({message: 'Hello, world!'})
        .notify(done);
    });
  });
});
