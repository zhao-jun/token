const AnyProxy = require('anyproxy');

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
    silent: false,
    dangerouslyIgnoreUnauthorized: true
  };
  const proxyServer = new AnyProxy.ProxyServer(options);
  proxyServer.on('ready', () => {
    console.log('\n已开启代理 127.0.0.1:8001');
  });
  proxyServer.on('error', (e) => { /* */ });
  proxyServer.start();
}
