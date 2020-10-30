const router = require('express').Router();
const labelService = require('../services/label.service');

router.get('/', labelService.getLabels);

module.exports = router;
