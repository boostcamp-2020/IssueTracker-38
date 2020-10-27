const express = require('express');

const router = express.Router();
const UserService = require('../services/user.service');

router.get('/', async (req, res, next) => {
  try {
    const nodes = await UserService.readAll();
    res.json(nodes);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
