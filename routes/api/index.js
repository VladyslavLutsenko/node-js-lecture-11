const usersRouter = require('./users.routes');
const booksRouter = require('./books.routes');
const authRouter = require('./auth.routes');

module.exports = {
  authRouter,
  usersRouter,
  booksRouter,
}
