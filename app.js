const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routes = require('./routes');

const { PORT = 3000 } = process.env;

const errorMiddlewares = require('./middleware/error');

const limiter = require('./middleware/rateLimit');

const app = express();

app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json()); // преобразует входные данные JSON в переменные, доступные JS
// app.use(bodyParser.urlencoded({ extended: true })); // преобразует запросы, закодированные в URL

app.use(routes);

app.use(errors());
app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
