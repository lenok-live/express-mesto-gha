// будем логировать два типа информации — запросы к серверу и ошибки, которые на нём происходят

const winston = require('winston');
const expressWinston = require('express-winston');

// Для создания логгера запросов воспользуемся функцией logger модуля expressWinston
const requestLogger = expressWinston.logger({
  transports: [ // Опция transports отвечает за то, куда нужно писать лог
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
