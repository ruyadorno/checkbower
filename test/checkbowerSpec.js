var assert = require('assert');
var checkbower = require('../lib/checkbower.js');

describe('checkbower', function () {

  it('should return false if bower.json does not exist', function () {
    assert.equal(checkbower(), false);
  });

  it('should return true when using a valid bower.json', function () {
    assert.equal(checkbower('./test/samples/bower.json'), true);
  });

  it('should return false when bower.json does not have a valid name', function () {
    assert.equal(checkbower('./test/samples/no_name.json'), false);
  });

  it('should return false when bower.json does not have a valid version', function () {
    assert.equal(checkbower('./test/samples/no_version.json'), false);
  });

  it('should return false when the version number is not valid', function () {
    assert.equal(checkbower('./test/samples/invalid_version.json'), false);
  });

});

describe('checkbower.cli', function () {

  var consoleLog;
  var outputValue;

  before(function () {

    // monkeypatching console.log here for testing
    consoleLog = console.log;
    console.log = function (data) {
      outputValue = data;
    };

  });

  after(function () {

    // release the monkeypatching
    console.log = consoleLog;

  });

  it('should print success message for valid bower.json file', function () {

    checkbower.cli('./test/samples/bower.json');

    assert.equal(outputValue, 'Valid bower.json found');

  });

  it('should print error message for invalid bower.json file', function () {

    checkbower.cli('./test/samples/invalid_version.json');

    assert.equal(outputValue, 'Error! Could not validate bower.json');

  });

});

