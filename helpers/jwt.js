const jwt = require('jsonwebtoken');

const {JWT_SECRET, JWT_EXPIRES_IN} = process.env;

const sign = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
}

const verify = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  sign,
  verify,
}
