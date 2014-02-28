var path = require('path');


var _getFilePath = function _getFilePath(filename) {
  return path.join(process.cwd(), !filename ? 'bower.json' : filename);
};

var _isValidName = function _isValidName(value) {
  return value !== '';
};

var checkbower = function checkbower(filename) {

  var filepath = _getFilePath(filename);

  try {

    var bower = require(filepath);

    return _isValidName(bower.name);

  } catch (e) {
    return false;
  }

};

module.exports = checkbower;

