var path = require('path');
var semver = require('semver');


var _getFilePath = function _getFilePath(filename) {
  return path.join(process.cwd(), !filename ? 'bower.json' : filename);
};

var _isValidName = function _isValidName(value) {
  return value !== '';
};

var _isValidVersion = function _isValidVersion(value) {
  return semver.valid(value) !== null;
};

var checkbower = function checkbower(filename) {

  var filepath = _getFilePath(filename);

  try {

    var bower = require(filepath);

    return _isValidName(bower.name) && _isValidVersion(bower.version);

  } catch (e) {
    return false;
  }

};

module.exports = checkbower;

