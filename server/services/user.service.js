const { models } = require('../models');

const UserService = () => {
  async function readAll() {
    const users = await models.User.findAll({
      attributes: ['id', 'email'],
      order: ['email'],
    });
    return users;
  }

  return { readAll };
};

module.exports = UserService();
