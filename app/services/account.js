const AsyncLock = require('async-lock');

const lock = new AsyncLock();
const { accountDatabase, transactionHistory } = require('../db/database');
const { throwError } = require('../utils/global_response');

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
  getAccountBalance(accountId) {
    if (lock.isBusy(accountId)) throwError('Service Unavailable', 503);
    this.logger.info('Retrieving account balance...', accountId);
    const accountBalance = accountDatabase[accountId].balance;
    return { accountBalance };
  }

  /**
   * Retrieves the account details
   * @param accountId uuid
   *
   * @returns getAccountDetails - object
   */
  getAccountDetails(accountId) {
    if (lock.isBusy(accountId)) throwError('Service Unavailable', 503);
    this.logger.info('Getting account details...', accountId);
    return { ...accountDatabase[accountId] };
  }

  /**
   * Retrieves the transaction history
   * @param accountId uuid
   *
   * @returns getTransactionHistory - object
   */
  getTransactionHistory(accountId) {
    if (lock.isBusy(accountId)) throwError('Service Unavailable', 503);

    this.logger.info('Getting trasaction history...', accountId);
    return { transactionHistory: [accountDatabase[accountId]] };
  }

  /**
   * Commit the transaction
   * @param params
   *
   * @returns commitTransaction - object
   */
  commitTransaction(params) {
    const { accountId, accountType, amount } = params;
    if (lock.isBusy(params.accountId)) throwError('Service Unavailable', 503);
    this.logger.info('commiting trasaction...', accountId);
    if (accountType === 'credit') return this.creditAccount(accountId, amount);
    return this.debitAccount(accountId, amount);
  }

  /**
   * Increases the  account balance
   * @param accountId uuid
   * @param amount number
   *
   * @return object
   */
  creditAccount(accountId, amount) {
    const account = accountDatabase[accountId];

    account.balance += amount;
    account.effectiveDateTime = new Date();

    transactionHistory.push([{ ...account, amount, type: 'credit' }]);
    this.logger.info('creditting account...', accountId);
    return { ...account };
  }

  /**
   * Decreases the account balance
   * @param accountId uuid
   * @param amount number
   *
   * @return object
   */
  debitAccount(accountId, amount) {
    const account = accountDatabase[accountId];
    if (account.balance < amount) {
      throwError('Insufficient balance', 422);
    }

    account.balance -= amount;
    account.effectiveDateTime = new Date();

    transactionHistory.push([{ ...account, amount, type: 'debit' }]);
    this.logger.info('debitting account...', accountId);
    return { ...account };
  }
}

module.exports = AccountServices;
