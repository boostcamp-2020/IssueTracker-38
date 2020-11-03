const router = require('express').Router();
const milestoneService = require('../services/milestone.service');
const errorCatcher = require('../middlewares/errorCatcher');

router.get('/', errorCatcher(milestoneService.readAll));

module.exports = router;
