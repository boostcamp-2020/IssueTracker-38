const express = require('express');

const router = express.Router();

router.use('/user', require('./user.route'));
router.use('/label', require('./label.route'));
router.use('/issue', require('./issue.route'));
router.use('/milestone', require('./milestone.route'));
router.use('/comment', require('./comment.route'));
router.use('/auth', require('./auth.route'));

module.exports = router;
