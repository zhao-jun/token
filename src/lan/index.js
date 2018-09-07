const os = require('os');
const path = require('path');

const lan = require(path.join(__dirname, os.platform()));

module.exports = lan;
