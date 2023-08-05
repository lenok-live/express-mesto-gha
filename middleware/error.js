const InternalServerError = require('../errors/InternalServerError'); // 500 ошибка

function errorMiddlewares(err, req, res, next) {
  const { statusCode = InternalServerError } = err;
  const message = statusCode === InternalServerError ? 'Внутренняя ошибка сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
}

module.exports = errorMiddlewares;
