const router = require('express').Router();
const userService = require('../services/user.service');
const errorCatcher = require('../middlewares/errorCatcher');

router.get('/', errorCatcher(userService.readAll));

module.exports = router;
