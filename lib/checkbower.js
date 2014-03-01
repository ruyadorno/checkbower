var path = require('path');
var semver = require('semver');


var _isWin = 'win32' === process.platform;
var _symbols = {
  ok: _isWin ?  '\u221A' : '✓',
  err: _isWin ?  '\u00D7' : '✖'
};

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

checkbower.succesMessage = _symbols.ok + '  Valid bower.json found';
checkbower.errorMessage = _symbols.err + '  Error! Could not validate bower.json';

checkbower.cli = function (filename) {
  if ( checkbower(filename) ) {
    console.log(checkbower.succesMessage);
  } else {
    console.log(checkbower.errorMessage);
  }
};

module.exports = checkbower;

