const bodyParser = require('body-parser');

module.exports.setup = function setup(server, serviceLocator) {
  const accountController = serviceLocator.get('accountController');

  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  server.use(bodyParser.json());
  server.get({
    path: '/',
    name: 'app health check',
    version: '1.0.0'
  }, (req, res) => res.send('Health check'));

  server.get({
    path: '/api',
    name: 'basepath',
    version: '1.0.0'
  }, (req, res) => res.send('Welcome to the Banking API Service'));

  server.get({
    path: '/api/account_balance/:accountId',
    name: 'Get account balance',
    version: '1.0.0'
  }, (req, res) => accountController.getAccountBalance(req, res));

  server.get({
    path: '/api/account_details/:accountId',
    name: 'Get account details',
    version: '1.0.0'
  }, (req, res) => accountController.getAccountDetails(req, res));

  server.get({
    path: '/api/transaction_history/:accountId',
    name: 'Get transaction history',
    version: '1.0.0'
  }, (req, res) => accountController.getTransactionHistory(req, res));

  server.post({
    path: '/api/commit_transaction/:accountId',
    name: 'commit transaction',
    version: '1.0.0'
  }, (req, res) => accountController.commitTransaction(req, res));
};
