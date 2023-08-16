const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

function getUsers(_req, res, next) {
  return User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

function getUser(req, res, next) {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Проблема со значениями идентификатора объекта.'));
      } else {
        next(err);
      }
    });
}

async function createUser(req, res, next) {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    });
    res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new Conflict('Данный email уже зарегистрирован'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequest('Неподдерживаемый тип данных'));
    } else {
      next(err);
    }
  }
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw NotFound('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Неподдерживаемый тип данных.'));
      } else {
        next(err);
      }
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw NotFound('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Неподдерживаемый тип данных'));
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-secret-key', { expiresIn: '7days' });

      res.send({ token });
    })
    .catch(next);
}

// контроллер для получения информации о пользователе
function getUserInformation(req, res, next) {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Запрашиваемый пользователь не найден');
      } else {
        res.send(user);
      }
    }).catch(next);
}

module.exports = {
  getUsers,
  getUserInformation,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
