const express = require('express');

const router = express.Router();

const milestoneService = require('../services/milestone.service');

router.get('/', milestoneService.readAll);

module.exports = router;
