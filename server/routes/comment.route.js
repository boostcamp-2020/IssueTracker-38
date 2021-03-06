const router = require('express').Router();
const commentService = require('../services/comment.service');
const errorCatcher = require('../middlewares/errorCatcher');

router.post('/', errorCatcher(commentService.create));
router.get('/', errorCatcher(commentService.readByIssue));
router.patch('/', errorCatcher(commentService.update));

module.exports = router;
