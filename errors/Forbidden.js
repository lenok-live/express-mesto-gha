// Ошибка 403: «доступ запрещён

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
