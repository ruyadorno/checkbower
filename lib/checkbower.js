var checkbower = function checkbower() {
  try {
    var bower = require('./bower.json');
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = checkbower;

