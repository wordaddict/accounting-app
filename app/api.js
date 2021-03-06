const dotenv = require('dotenv');

dotenv.config();
const restify = require('restify');
const plugins = require('restify-plugins');

const config = require('../app/config/config');
const accountRoute = require('./routes/index');

// service locator via dependency injection
const serviceLocator = require('../app/config/di');

const logger = serviceLocator.get('logger');


const server = restify.createServer({
  name: config.app_name,
  versions: ['1.0.0'],
  port: config.port
});

// set API versioning and allow trailing slashes
server.pre(restify.pre.sanitizePath());

// set request handling and parsing
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());

// setup Routing and Error Event Handling
accountRoute.setup(server, serviceLocator);

// setup Routing and Error Event Handling


server.listen(config.port, () => {
  logger.info(`${config.app_name} listening at ${config.port}`);
});

module.exports = server;
