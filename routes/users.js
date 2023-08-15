const userRouter = require('express').Router();

const {
  getUsers,
  getUserInformation,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers); // возвращает всех пользователей

userRouter.get('/me', getUserInformation); // возвращает информацию о текущем пользователе

userRouter.get('/:userId', getUser); // возвращает пользователя по _id

userRouter.patch('/me', updateProfile);

userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;

// userRouter.post('/', createUser); // создаёт пользователя
