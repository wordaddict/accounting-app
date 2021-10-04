const chai = require('chai');

const { checkIfAccountExist, validateAccountType } = require('../validation/index');
const { testId } = require('../db/database');

// eslint-disable-next-line no-undef
describe('Test Validation', () => {
  describe('check If Account Exist', () => {
    it('It should return true for the account that exists', () => {
      const check = checkIfAccountExist(testId);
      chai.expect(check).eql(true);
    });

    it('It should return false for the account that does not exists', () => {
      const check = checkIfAccountExist('123');
      chai.expect(check).eql(false);
    });
  });

  describe('validate account type', () => {
    it('It should return true for the debit accountType', () => {
      const accountType = validateAccountType('debit');
      chai.expect(accountType).eql(true);
    });

    it('It should return true for the credit accountType', () => {
      const accountType = validateAccountType('credit');
      chai.expect(accountType).eql(true);
    });

    it('It should return false for wrong account type', () => {
      const accountType = validateAccountType('creditt');
      chai.expect(accountType).eql(false);
    });
  });
});
