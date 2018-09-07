#!/usr/bin/env node

const process = require('process');
const keypress = require('keypress');

require('./lan')({proxyEnable: true});
require('./ca')();

keypress(process.stdin);

process.stdin.on('keypress', function(ch, key) {
  process.stdin.pause();
  require('./lan')(null, () => process.exit(0));
});
