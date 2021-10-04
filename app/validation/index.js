const { accountId, testId } = require('../db/database');

const checkIfAccountExist = (accountIdInput) => (accountId === accountIdInput) || (testId === accountIdInput);

const validateAccountType = (type) => ['debit', 'credit'].includes(type);

module.exports = {
  checkIfAccountExist,
  validateAccountType
};
