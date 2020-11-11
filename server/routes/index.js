const express = require('express');
const authCheck = require('../middlewares/authCheck');

const router = express.Router();

router.use('/user', authCheck, require('./user.route'));
router.use('/label', authCheck, require('./label.route'));
router.use('/issue', authCheck, require('./issue.route'));
router.use('/milestone', authCheck, require('./milestone.route'));
router.use('/comment', authCheck, require('./comment.route'));
router.use('/auth', require('./auth.route'));

module.exports = router;
