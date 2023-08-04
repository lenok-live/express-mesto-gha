const cardRouter = require('express').Router();

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

cardRouter.get('/', getCards);

cardRouter.post('/', createCard);

cardRouter.delete('/', deleteCard);

cardRouter.put('/:cardId/likes', likeCard); // поставить лайк карточке

cardRouter.delete('/:cardId/likes', dislikeCard); // убрать лайк с карточки

module.exports = cardRouter;
