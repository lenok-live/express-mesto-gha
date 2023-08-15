class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 401;
    this.name = 'Unauthorized';
  }
}

module.exports = Unauthorized;
