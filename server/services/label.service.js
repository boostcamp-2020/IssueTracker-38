const { Label } = require('../models').models;

module.exports = {
  async getLabels(req, res, next) {
    try {
      const labels = await Label.findAll();
      res.status(200).json(labels);
    } catch (err) {
      next(err);
    }
  },
};