const cardRouter = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { createCardValidation } = require('../middleware/validation');

cardRouter.get('/', getCards);

cardRouter.post('/', createCardValidation, createCard);

cardRouter.delete('/:cardId', deleteCard);

cardRouter.put('/:cardId/likes', likeCard); // поставить лайк карточке

cardRouter.delete('/:cardId/likes', dislikeCard); // убрать лайк с карточки

module.exports = cardRouter;
