const Card = require('../models/card');

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

function getCards(_req, res, next) {
  return Card.find({})
    .then((cards) => res.send(cards)) // 2
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => { res.status(201).send(card); }) // 1
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Неподдерживаемый тип данных'));
      } else {
        next(err);
      }
    });
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Нет карточки с таким id');
      }
      if (`${card.owner}` !== req.user._id) {
        throw new Forbidden('Доступ к удалению карточки других пользователей запрещен.');
      } else {
        Card.deleteOne(card)
          .then(() => {
            res.send({ message: 'Карточка была удалена' });
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Проблема со значениями идентификатора объекта.'));
      } else {
        next(err);
      }
    });
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Нет карточки с таким id');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Проблема со значениями идентификатора объекта.'));
      } else {
        next(err);
      }
    });
}

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Нет карточки с таким id');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Проблема со значениями идентификатора объекта.'));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
