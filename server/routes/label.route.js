const router = require('express').Router();
const labelService = require('../services/label.service');
const errorCatcher = require('../middlewares/errorCatcher');

router.post('/', errorCatcher(labelService.create));
router.get('/', errorCatcher(labelService.readAll));
router.patch('/', errorCatcher(labelService.update));

module.exports = router;
