const { accountId } = require('../db/database');

const checkIfAccountExist = (accountIdInput) => {
    return accountId === accountIdInput;
}

module.exports = checkIfAccountExist;