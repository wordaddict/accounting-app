const Response = require('../response/response');
const HTTPStatus = require('../constants/http_status');
const checkIfAccountExist = require('../validation/index');

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
      if(!checkIfAccountExist(accountId)){
        return this.handleNotFound(res, accountId)
      }
      const data = this.accountServices.getAccountBalance(accountId);
      return this.handleOk(res, data);
    } catch (err) {
      return this.handleInternalServerError(res, err);
    }
  }

  handleOk(res, data) {
    this.logger.info('vehicle data gotten successfully');
    const response = new Response(HTTPStatus.OK, 'Data gotten successfully', res, false, data);
    return response.res_message();
  }

  handleNotFound(res, accountId) {
    const response = new Response(HTTPStatus.NOT_FOUND, `AccountId ${accountId} does not exist`, res, false, []);
    return response.res_message();
  }

  handleNoContent(res, data) {
    this.logger.info('There is no vehicle data ');
    const emptyResponse = new Response(HTTPStatus.NO_CONTENT, 'No content available', res, false, data);
    return emptyResponse.res_message();
  }

  handleInternalServerError(res, err) {
    this.logger.error('Error from getting vehicle data', err);
    const resp = new Response(HTTPStatus.INTERNAL_SERVER_ERROR, 'Internal server error', res, true, []);
    return resp.res_message();
  }

  // eslint-disable-next-line class-methods-use-this
  handleBadRequest(res) {
    const resp = new Response(HTTPStatus.BadRequest, 'Bad request, Add all required', res, true, []);
    return resp.res_message();
  }
}

module.exports = MainController;
