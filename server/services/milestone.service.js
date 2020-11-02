const { Milestone } = require('../models').models;

module.exports = {
  async readAll(req, res) {
    const milestones = await Milestone.findAll();

    res.status(200).json(milestones);
  },
};
