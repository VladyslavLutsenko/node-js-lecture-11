const express = require('express');
const {controllerWrapper} = require('../../helpers');
const {authorizeMiddleware, passportAuthMiddleware} = require('../../middlewares');
const {usersController} = require('../../controllers')

const router = express.Router();

// router.get('/', authorizeMiddleware, controllerWrapper(usersController.findAll));
router.get('/', passportAuthMiddleware, controllerWrapper(usersController.findAll));

module.exports = router;
