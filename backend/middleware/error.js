import errorHandler from './errorHandler';

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle specific errors
  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new errorHandler(message, 400);
  } else if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    err = new errorHandler(message, 400);
  } else if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid";
    err = new errorHandler(message, 401); // Typically 401 for unauthorized
  } else if (err.name === "TokenExpiredError") {
    const message = "Token is expired, please log in again";
    err = new errorHandler(message, 401); // Typically 401 for unauthorized
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
