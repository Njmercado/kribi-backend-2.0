const INTERNAL_SERVER_ERROR = { message: 'Internal server error' };
const COLLECTION = 'Palabra';
const NOT_FOUND = { message: 'Not found' };
const API_ERRORS = {
  WRONG_ENDPOINT_EMPTY_ID: {
    message: 'Wrong endpoint, empty id. Try post word',
    code: 400
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error',
    code: 500
  }
};

exports.COLLECTION = COLLECTION;
exports.NOT_FOUND = NOT_FOUND;
exports.API_ERRORS = API_ERRORS;
exports.INTERNAL_SERVER_ERROR = INTERNAL_SERVER_ERROR;