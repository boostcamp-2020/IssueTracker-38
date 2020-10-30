const router = require('express').Router();
const issueService = require('../services/issue.service');

router.get('/', issueService.readAll);
router.patch('/', issueService.update);

module.exports = router;
