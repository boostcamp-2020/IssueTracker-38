const express = require("express");

const router = express.Router();

router.use("/user", require("./user.route.js"));
router.use("/label", require("./label.route.js"));

router.use('/issue', require('./issue.route'));

module.exports = router;
