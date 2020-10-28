const express = require("express");

const router = express.Router();

router.use("/user", require("./user.route.js"));
router.use("/label", require("./label.route"));

module.exports = router;
