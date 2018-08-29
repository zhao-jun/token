const fs = require('fs')
const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

const record = (name, content) => {
  fs.writeFile(name, content, (err, data) => {
    if (err) return console.error(err);
    console.log(`获取 token 成功！请查看 ${name}`);
    // process.exit(0);
  })
}

const records = (request) => {
  try {
    const token = request.requestOptions.headers.authorization;
    if (token) {
      record(`token-${(new Date).getMonth()}-${(new Date).getDate()}.txt`, token);
    }
  } catch (error) {
    // console.log(error)
  }
}

module.exports = {
  // 是否处理https请求
  *beforeDealHttpsRequest(request) {
    return ['zhudb'].find(host => request.host.indexOf(host) !== -1);
  },
  *beforeSendRequest(request) {
    records(request);
  }
};
