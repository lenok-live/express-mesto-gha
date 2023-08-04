const userRouter = require('express').Router();

const { getUsers, getUser, createUser, updateProfile, updateAvatar, } = require('../controllers/users');

userRouter.get('/', getUsers); // возвращает всех пользователей

userRouter.get('/:userId', getUser); // возвращает пользователя по _id

userRouter.post('/', createUser); // создаёт пользователя

userRouter.patch('/me', updateProfile);

userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
