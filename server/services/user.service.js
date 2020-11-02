const { User } = require('../models').models;

module.exports = {
  async readAll(req, res, next) {
    try {
      const users = await User.findAll({
        where: { deletedAt: null },
        attributes: ['id', 'email'],
        order: ['email'],
      });
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
};
