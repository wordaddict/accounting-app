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
getAccountBalance (accountId) {
  if (lock.isBusy(accountId)) throwError('Service Unavailable', 503);
 
   const accountBalance = accountDatabase[accountId].balance;
   return { accountBalance };
 };

 /**
 * Retrieves the account details
 * @param accountId uuid
 *
 * @returns getAccountDetails - object
 */
 getAccountDetails (accountId) {
  if (lock.isBusy(accountId)) throwError('Service Unavailable', 503);

  return { ...accountDatabase[accountId] };
 };

  /**
 * Retrieves the transaction history
 * @param accountId uuid
 *
 * @returns getTransactionHistory - object
 */
 getTransactionHistory (accountId) {
  if (lock.isBusy(accountId)) throwError('Service Unavailable', 503);
  return { transactionHistory: [accountDatabase[accountId]] };
 };

   /**
 * Commit the transaction
 * @param params 
 *
 * @returns commitTransaction - object
 */
 commitTransaction (params) {
  const { accountId, accountType, amount } = params;
  if (lock.isBusy(params.accountId)) throwError('Service Unavailable', 503);
  if (accountType === 'credit') return this.creditAccount(accountId, amount);
  return this.debitAccount(accountId, amount);
 };

 /**
 * Increases the  account balance
 * @param accountId uuid
 * @param amount number
 *
 * @return object
 */
 creditAccount (accountId, amount){
  const account = accountDatabase[accountId];

  account.balance += amount;
  account.effectiveDateTime = new Date();

  transactionHistory.push([{ ...account, amount, type: 'credit' }])

  return { ...account };
};

  /**
   * Decreases the account balance
   * @param accountId uuid
   * @param amount number
   *
   * @return object
   */
  debitAccount (accountId, amount) {
    const account = accountDatabase[accountId];
    if (account.balance < amount) {
      throwError('Insufficient balance', 422);
    }

    account.balance -= amount;
    account.effectiveDateTime = new Date();

    transactionHistory.push([{ ...account, amount, type: 'debit' }])
    return { ...account };
  };
}


module.exports = AccountServices;
