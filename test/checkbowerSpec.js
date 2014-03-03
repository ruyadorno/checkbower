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

  it('should return false when bower.json does not have a name property', function () {
    assert.equal(checkbower('./test/samples/no_name.json'), false);
  });

  it('should return false when bower.json does not have a valid version', function () {
    assert.equal(checkbower('./test/samples/no_version.json'), false);
  });

  it('should return false when bower.json does not have a valid version', function () {
    assert.equal(checkbower('./test/samples/no_version.json'), false);
  });

  it('should return false when the version number is not valid', function () {
    assert.equal(checkbower('./test/samples/invalid_version.json'), false);
  });

  it('should find and validate bower.json file when using a folder path', function () {
    assert.equal(checkbower('./test/samples/'), true);
  });

  it('should find and return false for a unvalid bower.json file when using a folder path', function () {
    assert.equal(checkbower('./test/samples/test_path/'), false);
  });

});

describe('checkbower.cli', function () {

  var consoleLog;
  var consoleError;
  var exit;
  var outputValue;
  var exitValue;

  before(function () {

    // monkeypatching console here for testing
    consoleLog = console.log;
    consoleError = console.error;
    console.log = console.error = function (data) {
      outputValue = data;
    };
    // also avoiding exiting the program when testing
    exit = process.exit;
    process.exit = function (code) {
      exitValue = code;
    };

  });

  after(function () {

    // release monkeypatching
    process.exit = exit;
    console.log = consoleLog;
    console.Error = consoleError;

  });

  it('should print success message for valid bower.json file', function () {

    var filename = './test/samples/bower.json';

    checkbower.cli(filename);

    assert.equal(outputValue, checkbower._succesMessage(filename));

  });

  it('should print error message for invalid bower.json file', function () {

    var filename = './test/samples/invalid_version.json';

    checkbower.cli(filename);

    assert.equal(outputValue, checkbower._errorMessage(filename));

  });

  it('should exit program with success code when using a valid bower.json file', function () {

    checkbower.cli('./test/samples/bower.json');

    assert.equal(exitValue, 0);

  });

  it('should exit program with error code when using an invalid bower.json file', function () {

    checkbower.cli('./test/samples/no_name.json');

    assert.equal(exitValue, 1);

  });

});

