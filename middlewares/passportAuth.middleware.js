const { createError } = require('../helpers');
const passport = require('passport');

const passportAuthMiddleware = (req,res,next) => {
  passport.authenticate('jwt', {session: false}, (err, user) => {
    if (!user || err) {
      next(createError(401, err?.errorMessage || 'Unauthorized'));
    }
    req.user=user;
    next();
  })(req,res,next)
}

module.exports = passportAuthMiddleware;
