const { constants } = require("../constants.js");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : constants.SERVER_ERROR;

  const response = {
    success: false,
    message: err.message,
  };

  // Include stack trace only in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      response.title = "Validation Error";
      break;

    case constants.UNAUTHORIZED:
      response.title = "Unauthorized";
      break;

    case constants.FORBIDDEN:
      response.title = "Forbidden";
      break;

    case constants.NOT_FOUND:
      response.title = "Not Found";
      break;

    case constants.SERVER_ERROR:
    default:
      response.title = "Server Error";
      break;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
