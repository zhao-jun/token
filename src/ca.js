const AnyProxy = require('AnyProxy');
const {exec, spawn} = require('child_process');
const proxy = require('./proxy');
const path = require('path');

module.exports = () => {
  if (AnyProxy.utils.certMgr.ifRootCAFileExists()) {
    proxy();
  } else {
    AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
      if (error) return console.error('error when generating rootCA', error);
      const certDir = path.dirname(keyPath);
      console.log('The cert is generated at', certDir);
      switch (process.platform) {
        case 'darwin':
          exec(`open ${certDir}`);
          break;
        case 'win32':
          exec(`start ${certDir}`);
          break;
        default:
          spawn('xdg-open', [certDir]);
      }
      proxy();
    });
  }
};
