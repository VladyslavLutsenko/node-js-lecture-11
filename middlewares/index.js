const errorFilter = require('./errorFilter.middleware');
const validationMiddleware = require('./validation.middleware');
const authorizeMiddleware = require('./authorize.middleware');
const passportAuthMiddleware = require('./passportAuth.middleware');
const uploadMiddleware = require('./upload.middleware');

module.exports = {
  errorFilter,
  validationMiddleware,
  authorizeMiddleware,
  passportAuthMiddleware,
  uploadMiddleware,
}
