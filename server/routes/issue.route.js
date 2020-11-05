const router = require('express').Router();
const issueService = require('../services/issue.service');
const errorCatcher = require('../middlewares/errorCatcher');

router.get('/', errorCatcher(issueService.readAll));
router.patch('/', errorCatcher(issueService.update));
router.patch('/markall', errorCatcher(issueService.updateMarkedIssues));
router.post('/', errorCatcher(issueService.create));

module.exports = router;
