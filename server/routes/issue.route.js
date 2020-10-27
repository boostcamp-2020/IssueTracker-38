const router = require('express').Router();
const issueService = require('../serviecs/issue.service');

router.get('/', issueService.readAll);
router.patch('/', issueService.update);

module.exports = router;
