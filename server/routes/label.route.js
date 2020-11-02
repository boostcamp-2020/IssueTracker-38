const router = require('express').Router();
const labelService = require('../services/label.service');

router.get('/', labelService.readAll);

module.exports = router;
