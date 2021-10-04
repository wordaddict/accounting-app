const { accountId, testId } = require('../db/database');

const checkIfAccountExist = (accountIdInput) => {
    return (accountId === accountIdInput) || (testId === accountIdInput);
};

const validateAccountType = (type) => {
    return ['debit', 'credit'].includes(type);
}

module.exports = {
    checkIfAccountExist,
    validateAccountType
};