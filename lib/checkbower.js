var path = require('path');
var semver = require('semver');


var _isWin = 'win32' === process.platform;
var _symbols = {
  ok: _isWin ?  '\u221A' : '✓',
  err: _isWin ?  '\u00D7' : '✖'
};

var _getFilePath = function _getFilePath(filename) {

  var filepath =  path.join(process.cwd(), !filename ? 'bower.json' : filename);
  var lastChar = filepath[filepath.length - 1];

  if (lastChar === path.sep) {
    filepath = path.join(filepath,'bower.json');
  }

  return filepath;

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

checkbower._succesMessage = function (filename) {
  var filepath = _getFilePath(filename);
  var bower = require(filepath);
  return _symbols.ok + '  ' + bower.name + '@' + bower.version;
};

checkbower._errorMessage = function (filename) {
  var filepath = _getFilePath(filename);
  return _symbols.err + '  Error! Could not validate: ' + filepath;
};

checkbower.cli = function (filename) {

  if ( checkbower(filename) ) {
    console.log(checkbower._succesMessage(filename));
    process.exit(0);
  } else {
    console.error(checkbower._errorMessage(filename));
    process.exit(1);
  }

};

module.exports = checkbower;

