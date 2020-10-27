const express = require('express');

const router = express.Router();

router.use('/user', require('./user.route.js'));

module.exports = router;
