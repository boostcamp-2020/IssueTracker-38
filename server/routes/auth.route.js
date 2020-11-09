const router = require('express').Router();
const authService = require('../services/auth.service');
const errorCatcher = require('../mtiddlewares/errorCatcher');

router.post('/', errorCatcher(authService.token));

module.exports = router;
