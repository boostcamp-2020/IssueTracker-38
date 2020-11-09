const { User } = require('../models').models;

module.exports = {
  async readAll(req, res) {
    const users = await User.findAll({
      where: { deletedAt: null },
      attributes: ['id', 'nickname'],
      order: ['nickname'],
    });

    res.json(users);
  },
};
