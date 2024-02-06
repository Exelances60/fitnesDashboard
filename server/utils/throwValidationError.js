const throwValidationError = (message) => {
  const error = new Error(message);
  error.statusCode = 422;
  throw error;
};

module.exports = throwValidationError;
