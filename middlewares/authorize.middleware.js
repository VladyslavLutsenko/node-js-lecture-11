const { createError, jwt } = require('../helpers');
const { usersService } = require('../services');

const authorizeMiddleware = async (req, res, next) => {
  const {authorization = '' }= req.headers;
  const [bearer, token] = authorization.split(' ');

  if ((bearer !== 'Bearer') || !token) {
    next(createError(401, 'Authorization header is invalid'));
  }

  try {
    const {id} = jwt.verify(token);
    const user = await usersService.findById(id);

    if (!user.token) {
      next(createError(401, 'User is not logged in'));
    };
    req.user = user;
    next();
  } catch (error) {
    next(createError(401, 'Token is invalid'));
  }

}

module.exports = authorizeMiddleware;
