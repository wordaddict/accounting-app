/* eslint-disable no-undef */

// Require dependencies
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api');
const { testId } = require('../db/database');

const app = server;
const should = chai.should();

chai.use(chaiHttp);

// Testing Accounts
// eslint-disable-next-line no-undef
describe('/Get account balance', () => {
  // eslint-disable-next-line no-undef
  it('should respond with data for account balance', (done) => {
    chai.request(app)
      .get(`/account_balance/${testId}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql('successful operation');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('error').eql(false);
        res.body.should.have.property('data');
        res.body.data.should.have.property('accountBalance');
        done();
      });
  });

  it('should check if account exists', (done) => {
    chai.request(app)
      .get(`/account_balance/123`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql('AccountId 123 does not exist');
        res.body.should.have.property('code').eql(404);
        res.body.should.have.property('error').eql(true);
        done();
      });
  });
});

describe('/GetAccount Details', () => {
  // eslint-disable-next-line no-undef
  it('should respond with data on account details', (done) => {
    chai.request(app)
      .get(`/account_details/${testId}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql('successful operation');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('error').eql(false);
        res.body.should.have.property('data');
        res.body.data.should.have.property('accountType');
        res.body.data.should.have.property('balance');
        res.body.data.should.have.property('balance').eql(1230);
        done();
      });
  });

});

describe('/transactionHistory', () => {
  // eslint-disable-next-line no-undef
  it('should respond with data on account details', (done) => {
    chai.request(app)
      .get(`/transaction_history/${testId}`)
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql('successful operation');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('error').eql(false);
        res.body.should.have.property('data');
        res.body.data.should.have.property('transactionHistory');
        done();
      });
  });

});

describe('/Commit transaction', () => {
  // eslint-disable-next-line no-undef
  it('should debit an account', (done) => {
    chai.request(app)
      .post(`/commit_transaction/${testId}`)
      .send({
        amount: 100,
        accountType: "debit"
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql('successful operation');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('error').eql(false);
        res.body.should.have.property('data');
        res.body.data.should.have.property('balance');
        res.body.data.balance.should.eql(1130);
        done();
      });
  });

  it('should credit an account', (done) => {
    chai.request(app)
      .post(`/commit_transaction/${testId}`)
      .send({
        amount: 200,
        accountType: "credit"
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql('successful operation');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('error').eql(false);
        res.body.should.have.property('data');
        res.body.data.should.have.property('balance');
        res.body.data.balance.should.eql(1330);
        done();
      });
  });

  it('should test account type validation', (done) => {
    chai.request(app)
      .post(`/commit_transaction/${testId}`)
      .send({
        accountType: "credit"
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql('Validation error: accountType and amount must be added to the request body');
        res.body.should.have.property('code').eql(400);
        res.body.should.have.property('error').eql(true);
        done();
      });
  });

  it('should test account type validation', (done) => {
    chai.request(app)
      .post(`/commit_transaction/${testId}`)
      .send({
        accountType: "credi",
        amount: 500
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql('Validation error: accountType must be either debit or credit');
        res.body.should.have.property('code').eql(400);
        res.body.should.have.property('error').eql(true);
        done();
      });
  });

});
