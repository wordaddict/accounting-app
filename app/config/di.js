const winston = require('winston');
const serviceLocator = require('../lib/service_locator');
require('winston-daily-rotate-file');

// Controllers

const AccountController = require('../controllers/account.js');

// Services
const AccountService = require('../services/account.js');

/**
 * Returns an instance of logger
 */
serviceLocator.register('logger', () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),

    defaultMeta: { service: 'modus-test' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/info.log', level: 'info' })

    ]
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),

    }));
  }
  return logger;
});

/**
 * Creates an instance of the Account Service
 */
serviceLocator.register('accountService', (servicelocator) => {
  const logger = servicelocator.get('logger');
  return new AccountService(logger);
});

/**
 * Creates an instance of the account Controller
 */
serviceLocator.register('accountController', (servicelocator) => {
  const logger = servicelocator.get('logger');
  const accountService = servicelocator.get('accountService');
  return new AccountController(logger, accountService);
});

module.exports = serviceLocator;
