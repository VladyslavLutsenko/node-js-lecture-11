const createError = require('../helpers/createError');

const validationMiddleware = (schema) => {
  return async (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) {
      next(createError(400, error.message));
    }
    next();
  }
}

module.exports = validationMiddleware;
