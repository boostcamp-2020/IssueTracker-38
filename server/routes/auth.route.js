const router = require('express').Router();
const authService = require('../services/auth.service');
const errorCatcher = require('../middlewares/errorCatcher');
const authCheck = require('../middlewares/authCheck')

router.post('/', errorCatcher(authService.getAcessToken));
router.post('/fresh', authCheck, errorCatcher(authService.getFreshAcessToken));

module.exports = router;
