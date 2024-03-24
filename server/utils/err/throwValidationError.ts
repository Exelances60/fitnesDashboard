const throwValidationError = (message: string) => {
  const error = new Error(message) as any;
  error.statusCode = 422;
  throw error;
};

export default throwValidationError;
