const accountId = 'b4563-134-7632-6a366-12b3';
const testId = 'b4563-134-7632-6a366-12345';

const accountDatabase = {
  [accountId]: {
    id: accountId,
    balance: 1500,
    accountType: 'savings',
    accountOpeningDate: new Date(),
  },
  [testId]: {
    id: testId,
    balance: 1230,
    accountType: 'savings',
    accountOpeningDate: new Date(),
  },
};

const transactionHistory = [];

module.exports = {
  accountId,
  accountDatabase,
  transactionHistory,
  testId
};
