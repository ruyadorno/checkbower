var path = require('path');
var semver = require('semver');


var _isWin = 'win32' === process.platform;
var _symbols = {
  ok: _isWin ?  '\u221A' : '✓',
  err: _isWin ?  '\u00D7' : '✖'
};

function _getHomeFilePath(filename) {
  return filename.replace(/^~\//, process.env.HOME + '/');
}

function _getRelativeFilePath(filename) {
  return path.join(process.cwd(), !filename ? 'bower.json' : filename);
}

function _getFilePath(filename) {

  var filepath = !filename ? process.cwd() + path.sep : filename;
  var firstChar = filepath[0];
  var lastChar = filepath[filepath.length - 1];

  if (firstChar === path.sep) {
      filepath = filepath;
  } else if (firstChar === '~') {
      filepath = _getHomeFilePath(filepath);
  } else {
      filepath = _getRelativeFilePath(filepath);
  }

  if (lastChar === path.sep) {
    filepath = path.join(filepath, 'bower.json');
  }

  return filepath;

}

function _isValidName(value) {
  return value !== '';
}

function _isValidVersion(value) {
  return semver.valid(value) !== null;
}


// Exposed checkbower method
// returns true if filename is a valid bower.json, false otherwise

var checkbower = function checkbower(filename) {

  var filepath = _getFilePath(filename);

  try {

    var bower = require(filepath);

    return _isValidName(bower.name) && _isValidVersion(bower.version);

  } catch (e) {
    return false;
  }

};


// Feedback messages, exposed to be used by unit tests

checkbower._succesMessage = function (filename) {
  var filepath = _getFilePath(filename);
  var bower = require(filepath);
  return _symbols.ok + '  ' + bower.name + '@' + bower.version;
};

checkbower._errorMessage = function (filename) {
  var filepath = _getFilePath(filename);
  return _symbols.err + '  Error! Could not validate: ' + filepath;
};


// Exposed method to be used by the command line interface

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

