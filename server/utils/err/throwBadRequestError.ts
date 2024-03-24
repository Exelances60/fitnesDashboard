const throwBadRequestError = (message: string) => {
  const error = new Error(message) as any;
  error.statusCode = 400;
  throw error;
};

export default throwBadRequestError;
