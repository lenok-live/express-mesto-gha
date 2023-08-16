// const InternalServerError = require('../errors/InternalServerError');

function errorMiddlewares(err, req, res, next) {
  const { statusCode = 500 } = err;
  const message = statusCode === 500 ? 'Внутренняя ошибка сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
}

module.exports = errorMiddlewares;
