const userRouter = require('express').Router();

const {
  getUsers,
  getUserInformation,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const { updateProfileValidation, updateAvatarValidation, userIdValidation } = require('../middlewares/validation');

userRouter.get('/', getUsers); // возвращает всех пользователей

userRouter.get('/me', getUserInformation); // возвращает информацию о текущем пользователе

userRouter.get('/:userId', userIdValidation, getUser); // возвращает пользователя по _id

userRouter.patch('/me', updateProfileValidation, updateProfile);

userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = userRouter;

// userRouter.post('/', createUser); // создаёт пользователя
