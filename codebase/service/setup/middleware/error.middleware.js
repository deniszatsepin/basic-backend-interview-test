const createError = require('http-errors');

module.exports = {
  NotFoundErrorMiddleware,
  ApiErrorsMiddleware
};

function NotFoundErrorMiddleware(req, res, next) {
  const err = new createError.NotFound();
  next(err);
}

function ApiErrorsMiddleware(err, req, res, next) {
  res.status(err.status || 500)
    .json({
      message: err.message,
      error: err.name,
      code: err.code
    });
}
