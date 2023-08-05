const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

// const NotFound = require('../errors/NotFound');

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(res.status(404).send('Запрашиваемый ресурс не найден'));
});

module.exports = router;
