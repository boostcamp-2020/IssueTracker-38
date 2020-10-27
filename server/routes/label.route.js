const router = require("express").Router();
const labelService = require("../service/label.service");

router.get("/", labelService.readAll);

module.exports = router;
