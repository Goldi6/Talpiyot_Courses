class CustomError extends Error {
  constructor(message, name, status = 404) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

module.exports = CustomError;
