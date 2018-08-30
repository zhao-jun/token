const fs = require('fs');

module.exports = {
  fsExistsSync(path) {
    try {
      fs.accessSync(path);
    } catch (e) {
      return false;
    }
    return true;
  }
};
