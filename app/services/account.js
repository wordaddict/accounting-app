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

 getAccountDetails (accountId) {
  if (lock.isBusy(accountId)) throwError('Service Unavailable', 503);

  return { ...accountDatabase[accountId] };
 };

 getTransactionHistory (accountId) {
  if (lock.isBusy(accountId)) throwError('Service Unavailable', 503);
  return { transactionHistory: [accountDatabase[accountId]] };
 };

 commitTransaction (params) {
  const { accountId, accountType, amount } = params;
  if (lock.isBusy(params.accountId)) throwError('Service Unavailable', 503);
  if (accountType === 'credit') return this.creditAccount(accountId, amount);
  return this.debitAccount(accountId, amount);
 };

 creditAccount (accountId, amount){
  const account = accountDatabase[accountId];

  account.balance += amount;
  account.effectiveDateTime = new Date();

  transactionHistory.push([{ ...account, amount, type: 'credit' }])

  return { ...account };
};

  /**
   * Decreases the user's account balance with the specified amount
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
