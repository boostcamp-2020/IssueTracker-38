const { Label } = require('../models').models;

module.exports = {
  async readAll(req, res) {
    const labels = await Label.findAll();

    res.status(200).json(labels);
  },
};
