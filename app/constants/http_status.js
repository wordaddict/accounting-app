class HTTPStatus {}

Object.defineProperty(HTTPStatus, 'OK', {
  value: 200,
  writable: false,
  enumerable: true,
  configurable: false
});

Object.defineProperty(HTTPStatus, 'NO_CONTENT', {
  value: 204,
  writable: false,
  enumerable: true,
  configurable: false
});

Object.defineProperty(HTTPStatus, 'NOT_FOUND', {
  value: 404,
  writable: false,
  enumerable: true,
  configurable: false
});

Object.defineProperty(HTTPStatus, 'BAD_REQUEST', {
  value: 400,
  writable: false,
  enumerable: true,
  configurable: false,
});

Object.defineProperty(HTTPStatus, 'INTERNAL_SERVER_ERROR', {
  value: 500,
  writable: false,
  enumerable: true,
  configurable: false
});

Object.defineProperty(HTTPStatus, 'UNPROCESSABLE_ENTITY', {
  value: 422,
  writable: false,
  enumerable: true,
  configurable: false
});

module.exports = HTTPStatus;
