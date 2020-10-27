const express = require("express");

const router = express.Router();

// TODO: 라우터 등록
// router.use('/example', require('./example.route.js'));
router.use("/label", require("./label.route"));

module.exports = router;
