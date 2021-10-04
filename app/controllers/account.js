const { handleOk, handleAccountNotFound, handleBadRequest, handleInternalServerError, handleInsufficientAmt } = require('../utils/global_response');
const { validateAccountType, checkIfAccountExist } = require('../validation/index');

class MainController {
  /**
     * Class Constructor
     * @param logger - winston logger
     * @param accountServices
     */
  constructor(logger, accountServices) {
    this.logger = logger;
    this.accountServices = accountServices;
  }

  getAccountBalance(req, res){
    const { accountId } = req.params;
    try {
      if(!checkIfAccountExist(accountId)) return handleAccountNotFound(res, accountId);
      const response = this.accountServices.getAccountBalance(accountId);
      return handleOk(res, response, 'successful operation');
    } catch (err) {
      return handleInternalServerError(res);
    }
  }

  getAccountDetails(req, res){
    const { accountId } = req.params;
    try {
      if(!checkIfAccountExist(accountId)){
        return handleAccountNotFound(res, accountId)
      }
      const data = this.accountServices.getAccountDetails(accountId);
      return handleOk(res, data, 'successful operation');
    } catch (err) {
      return handleInternalServerError(res);
    }
  }

  getTransactionHistory(req, res){
    const { accountId } = req.params;
    try {
      if(!checkIfAccountExist(accountId)){
        return handleAccountNotFound(res, accountId)
      }
      const data = this.accountServices.getTransactionHistory(accountId);
      return handleOk(res, data, 'successful operation');
    } catch (err) {
      return handleInternalServerError(res);
    }
  }

  commitTransaction(req, res){
    const { accountId } = req.params;
    const { accountType, amount } = req.body;
    try {

      if (!accountType || !amount) {
        return handleBadRequest(res, 'Validation error: accountType and amount must be added to the request body')
      }
      if(!checkIfAccountExist(accountId)){
        return handleAccountNotFound(res, accountId)
      }

      if(!validateAccountType(accountType)){
       return handleBadRequest(res, 'Validation error: accountType must be either debit or credit')
      }
      const params = {
        accountId,
        accountType,
        amount
      }
      const data = this.accountServices.commitTransaction(params);
      return handleOk(res, data, 'successful operation');
    } catch (err) {
      if(err.message === 'Insufficient balance'){
        return handleInsufficientAmt(res, err.message)
      }
      return handleInternalServerError(res);
    }
  }
}

module.exports = MainController;
