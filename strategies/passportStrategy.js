const passport = require('passport');
const passportJwt = require('passport-jwt');
// const { usersService } = require('../services');
const createError = require('../helpers/createError');

const ExtractJWT = passportJwt.ExtractJwt;
const Strategy = passportJwt.Strategy;

const {JWT_SECRET} = process.env;

const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, async (payload, done) => {
    const {id} = payload;
    const user = await usersService.findById(id);
    if (!user) {
      return done(createError(401, 'User does not exist'));
    }

    if (!user.token) {
      done(createError(401, 'User is not logged in'));
    }

    return done(null, user)
  })
)
