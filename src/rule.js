const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const {fsExistsSync} = require('./utils');

// 记录token
const record = (name, content) => {
  if (fsExistsSync(name)) return;
  fs.writeFile(name, content, (err, data) => {
    if (err) return console.error(err);
    console.log(chalk.blue(`获取 token 成功！请查看 ${name}`));
    // process.exit(0);
  });
};

const records = request => {
  try {
    const token = request.requestOptions.headers.authorization;
    if (token) {
      record(
        `token-${new Date().getMonth()}-${new Date().getDate()}.txt`,
        token
      );
    }
  } catch (error) {
    console.log(chalk.red(`获取 token 失败！请查看 ${error}`));
  }
};

module.exports = {
  // 是否处理https请求
  *beforeDealHttpsRequest(request) {
    return ['zhudb.com'].find(host => request.host.indexOf(host) !== -1);
  },
  *beforeSendRequest(request) {
    records(request);
  }
};
