import ErrorHandler from './errorHandler';

export const errorMiddleware = (err, req, res, next) => {
  // Default error handling
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle specific errors
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new ErrorHandler(message, 400);  // Correctly using new
  } else if (err.code === 11000) {
    const message = "Duplicate field value entered";
    err = new ErrorHandler(message, 400);  // Correctly using new
  } else if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid";
    err = new ErrorHandler(message, 401);  // Correctly using new
  } else if (err.name === "TokenExpiredError") {
    const message = "Token is expired, please log in again";
    err = new ErrorHandler(message, 401);  // Correctly using new
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
