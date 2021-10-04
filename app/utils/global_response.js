const HTTPStatus = require('../constants/http_status');
const { success, failure } = require('../lib/response_manager');

function handleOk(res, response, message) {
    return success(res, {message, response }, HTTPStatus.OK)
  }

  function handleAccountNotFound(res, accountId) {
    return failure(
      res, { message: `AccountId ${accountId} does not exist`},
      HTTPStatus.NOT_FOUND)
  }

function handleBadRequest(res, message) {
    return failure(
        res, { message},
        HTTPStatus.BAD_REQUEST)
}

function handleInsufficientAmt(res, message) {
    return failure(
        res, { message},
        HTTPStatus.UNPROCESSABLE_ENTITY)
}

function handleInternalServerError(res) {
    return failure(
        res, { message: 'Internal server Error'},
        HTTPStatus.INTERNAL_SERVER_ERROR)
}

function throwError (message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  };

  module.exports = {
      handleOk,
      handleAccountNotFound,
      handleBadRequest,
      handleInternalServerError,
      throwError,
      handleInsufficientAmt
  }