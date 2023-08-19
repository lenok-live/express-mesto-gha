const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routes = require('./routes');

const { PORT = 3000 } = process.env;

const limiter = require('./middlewares/rateLimit');
const errorMiddlewares = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json()); // преобразует входные данные JSON в переменные, доступные JS
// app.use(bodyParser.urlencoded({ extended: true })); // преобразует запросы, закодированные в URL

app.use(requestLogger); // подключаем логгер запросов до всех обработчиков роутов

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorMiddlewares); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
