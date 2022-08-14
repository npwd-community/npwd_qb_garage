const hotReloadConfig = {
  resourceName: GetCurrentResourceName(),
  files: ['/dist/server.js', '/dist/client.js', '/dist/html/index.js'],
};

exports['hotreload'].add(hotReloadConfig);

console.log('Server started.');
