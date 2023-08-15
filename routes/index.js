const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

const NotFound = require('../errors/NotFound');

const { login, createUser } = require('../controllers/users');

const auth = require('../middleware/auth');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

module.exports = router;
