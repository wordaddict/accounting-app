require('dotenv').config();

// eslint-disable-next-line camelcase
const app_name = 'Accounting application';

const config = {
  app_name,
  port: process.env.PORT,
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    console: process.env.LOG_ENABLE_CONSOLE === 'true'
  }
};

module.exports = config;
