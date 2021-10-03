module.exports.setup = function setup(server, serviceLocator) {
  server.get({
    path: '/',
    name: 'app health check',
    version: '1.0.0'
  }, (req, res) => res.send('Welcome to the Banking API Service'));
};
