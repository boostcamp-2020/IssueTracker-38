const { Label } = require('../models').models;

module.exports = {
  async create(req, res) {
    const newLabel = req.body;
    const createdLabel = await Label.create(newLabel);

    res.status(200).json(createdLabel);
  },
  async readAll(req, res) {
    const labels = await Label.findAll();

    res.status(200).json(labels);
  },
};
