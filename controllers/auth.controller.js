const {createError} = require('../helpers');
const {usersService} = require('../services');

const register = async (req, res, next) => {
  const user = await usersService.register(req.body);
  res.status(201).json(user);
};

const login = async (req, res, next) => {
  const result = await usersService.login(req.body);
  res.status(201).json(result);
};

const logout = async (req, res, next) => {
  await usersService.logout(req.user.id);
  res.status(204).send();
};

const verify = async (req, res, next) => {
  const {token} = req.params;
  await usersService.verify(token);
  res.send('Verified successfully');
};

const sendNewVerifyLink = async (req, res, next) => {
  const {email} = req.body;
  await usersService.sendNewVerifyLink(email);
  res.send();
};

module.exports = {
  register,
  login,
  logout,
  verify,
  sendNewVerifyLink,
};
