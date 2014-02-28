var path = require('path');


var _getFilePath = function _getFilePath(filename) {
  return path.join(process.cwd(), !filename ? 'bower.json' : filename);
};

var checkbower = function checkbower(filename) {

  var filepath = _getFilePath(filename);

  try {
    var bower = require(filepath);
    return true;
  } catch (e) {
    return false;
  }

};

module.exports = checkbower;

