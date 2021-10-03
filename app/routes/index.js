const bodyParser = require('body-parser');

module.exports.setup = function setup(server, serviceLocator) {
  const accountController = serviceLocator.get('accountController');

  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  server.use(bodyParser.json());
  server.get({
    path: '/api',
    name: 'app health check',
    version: '1.0.0'
  }, (req, res) => res.send('Welcome to the Banking API Service'));

  server.get({
    path: '/account_balance/:accountId',
    name: 'Get account balance',
    version: '1.0.0'
  }, (req, res) => accountController.getAccountBalance(req, res));
};
