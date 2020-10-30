const express = require('express');

const router = express.Router();
const userService = require('../services/user.service');

router.get('/', userService.readAll);

module.exports = router;
