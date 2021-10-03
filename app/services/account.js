const AsyncLock = require('async-lock');

const lock = new AsyncLock();
const { accountDatabase } = require('../db/database');


class AccountServices {
  /**
   * The constructor
   *
   * @param logger
   */
  constructor(logger) {
    this.logger = logger;
  }

/**
 * Retrieves the account balance
 * @param accountId uuid
 *
 * @returns accountBalance - object
 */
getAccountBalance (accountId) {
  if (lock.isBusy(accountId)) throwError('Service Unavailable', 503);
 
   const accountBalance = accountDatabase[accountId].balance;
   return { accountBalance };
 };
}

module.exports = AccountServices;
