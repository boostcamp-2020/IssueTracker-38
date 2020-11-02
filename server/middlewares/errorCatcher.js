const errorCatcher = (router) => (req, res, next) => {
  router(req, res, next).catch((error) => next(error));
};

module.exports = errorCatcher;
