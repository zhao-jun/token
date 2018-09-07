const regedit = require('regedit');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const DEFAULT_SETTINGS = [70, 0, 0, 0, 0, 0, 0, 0];
const SEP = [0, 0, 0];
const PROXY_SERVER_FLAG = 3;
const AUTOCONFIG_FLAG = 5;
const AUTODETECT_FLAG = 9;

const SETTINGS_PATH =
  'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\Connections';
const SETTINGS_KEY = 'DefaultConnectionSettings';

const toBinaryArray = value => {
  const result = [0, 0, 0, 0];
  if (value && typeof value === 'string') {
    value = new Buffer(value);
    let len = value.length;
    if (len > 255) {
      len = 255;
      value = value.slice(0, 255);
    }
    result[0] = len;
    result.push(...value);
  }
  return result;
};

const toRegBinary = settings => {
  if (!settings) {
    return DEFAULT_SETTINGS;
  }
  let flags = 0;
  if (settings.autoDetect) {
    flags |= AUTODETECT_FLAG;
  }
  if (settings.autoConfig) {
    flags |= AUTOCONFIG_FLAG;
  }
  if (settings.proxyEnable) {
    flags |= PROXY_SERVER_FLAG;
  }
  let result = DEFAULT_SETTINGS.concat([flags]).concat(SEP);
  // let result = DEFAULT_SETTINGS.concat([0, 0, 0, 0])
  let bypass = String(settings.bypass || '');
  if (settings.bypassLocal) {
    bypass += ';<local>';
  }
  result = result.concat(toBinaryArray(settings.proxyServer));
  result = result.concat(toBinaryArray(bypass));
  return result.concat(toBinaryArray(settings.autoConfigUrl));
};

module.exports = (proxyEnable, cb) => {
  value = {
    proxyServer: '127.0.0.1:8001',
    bypassLocal: true
  };
  if (proxyEnable) value.proxyEnable = proxyEnable;
  const valueToPut = {};
  valueToPut[SETTINGS_PATH] = {};
  valueToPut[SETTINGS_PATH][SETTINGS_KEY] = {
    type: 'REG_BINARY',
    value: toRegBinary(value)
  };
  // https://github.com/ironSource/node-regedit/issues/56
  // pkg依然存在vbs问题，todo
  regedit.setExternalVBSLocation(
    path.join(require.main.filename, '../assets/vbs')
  );
  regedit.putValue(valueToPut, err => {
    if (err) {
      console.log(chalk.red(`error: ${err}`));
    }
    if (cb) cb();
  });
};
