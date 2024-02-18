const throwBadRequestError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  throw error;
};

module.exports = throwBadRequestError;
