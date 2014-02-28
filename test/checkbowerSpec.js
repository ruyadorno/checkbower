var assert = require('assert');
var checkbower = require('../lib/checkbower.js');

describe('checkbower', function () {

  it('should return false if bower.json does not exist', function () {
    assert.equal(checkbower(), false);
  });

  it('should return true when using a valid bower.json', function () {
    assert.equal(checkbower('./test/samples/bower.json'), true);
  });

});

