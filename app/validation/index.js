const { accountId } = require('../db/database');

const checkIfAccountExist = (accountIdInput) => {
    return accountId === accountIdInput;
};

const validateAccountType = (type) => {
    return ['debit', 'credit'].includes(type);
}

module.exports = {
    checkIfAccountExist,
    validateAccountType
};