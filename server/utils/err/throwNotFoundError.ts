const throwNotFoundError = (message: string) => {
  const error = new Error(message) as any;
  error.statusCode = 404;
  throw error;
};

export default throwNotFoundError;
