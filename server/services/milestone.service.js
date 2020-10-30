const { Milestone } = require('../models').models;

module.exports = {
  async readAll(req, res, next) {
    try {
      const milestones = await Milestone.findAll();

      res.status(200).json(milestones);
    } catch (err) {
      next(err);
    }
  }
};
