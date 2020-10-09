const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);

  // Pass the error onto the next error handling middleware
  next(error);
};

// Custom error handler middleware:
// Define error-handling middleware functions in the same way as other middleware functions,
// except error-handling functions have four arguments instead of three: (err, req, res, next).
const errorHandler = (err, req, res, next) => {
  // A rare case: sometimes we might get a 200 response, even though it's an error.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Log the error stack trace if we are not in production mode
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
