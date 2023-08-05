class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 400;
    this.name = 'BadRequest';
  }
}

module.exports = BadRequest;
