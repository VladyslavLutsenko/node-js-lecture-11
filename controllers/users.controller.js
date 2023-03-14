const {createError} = require('../helpers');
const {usersService} = require('../services');

const findAll = async (req, res, next) => {
  const users = (await usersService.findAll()).map((user) => user.toObject()).map(({password, ...user}) => user);
  res.status(200).json(users);
};


module.exports = {
  findAll,
};
