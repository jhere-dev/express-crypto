const { STATUS_CODES } = require("http");

class HttpError extends Error {
  constructor(code, message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.code = code ?? 500;
    this.message = message || STATUS_CODES[this.code];
  }
}

module.exports = HttpError;
