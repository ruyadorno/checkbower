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

