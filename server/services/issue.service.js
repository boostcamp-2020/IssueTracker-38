const { Issue } = require('../models').models;

module.exports = {
  readAll: async (req, res, next) => {
    try {
      const issues = await Issue.findAll({ where: { deletedAt: null } });
      res.json(issues);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const wiiBeUpdated = req.body;
    const issueId = wiiBeUpdated.id;
    delete wiiBeUpdated.id;

    try {
      await Issue.update(wiiBeUpdated, { where: { id: issueId } });
      res.json({ message: '수정 되었습니다.' });
    } catch (err) {
      next(err);
    }
  }
};
