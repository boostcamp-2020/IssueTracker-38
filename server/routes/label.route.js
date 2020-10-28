const router = require("express").Router();
const service = require("../service/label");

router.get("/", service.getLabels);

module.exports = router;
