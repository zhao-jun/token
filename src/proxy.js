const AnyProxy = require('anyproxy');
const chalk = require('chalk');

module.exports = () => {
  const options = {
    port: 8001,
    rule: require('./rule'),
    webInterface: {
      enable: true,
      webPort: 8002
    },
    throttle: 10000,
    forceProxyHttps: false,
    wsIntercept: false, // 不开启websocket代理
    silent: true,
    dangerouslyIgnoreUnauthorized: true
  };
  const proxyServer = new AnyProxy.ProxyServer(options);
  proxyServer.on('ready', () => {
    console.log(chalk.blue('\n已开启代理 127.0.0.1:8001'));
    console.log(chalk.blue('\n使用微信 PC 版：打开相应网页获取token'));
    console.log(chalk.blue('\n获取token后，将自动关闭'));
  });
  proxyServer.on('error', error => {
    console.log(chalk.red(`\nerror: ${error}`));
  });
  proxyServer.start();
};
