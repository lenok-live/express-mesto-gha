const Card = require('../models/card');

function getCards(req, res) {
  return Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function createCard(req, res) {
  // console.log(req.user._id);

  const { name, link } = req.body;

  return Card.create({ name, link })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        Card.deleteOne(card)
          .then(() => {
            res.send({ message: 'Карточка была удалена' });
          })
          .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.send(card);
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      } else {
        res.send(card);
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
