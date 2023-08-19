const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

const NotFound = require('../errors/NotFound');

const { login, createUser } = require('../controllers/users');
const { loginValidation, registrationValidation } = require('../middlewares/validation');

const auth = require('../middlewares/auth');

router.post('/signin', loginValidation, login);
router.post('/signup', registrationValidation, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

module.exports = router;
