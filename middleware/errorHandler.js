const errorHandler = (error, req, res, next) => {
  if (!error) return next();
  res.status(error.code).json({ message: error.message });
};

module.exports = errorHandler;
