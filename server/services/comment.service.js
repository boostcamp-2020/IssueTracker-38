const { Comment } = require('../models').models;

module.exports = {
  async create(req, res) {
    await Comment.create(req.body);
    res.status(200).json({ message: '생성 되었습니다.' });
  },
  async readByIssue(req, res) {
    const { issueId } = req.query;
    if (issueId === undefined) {
      res.sendStatus(400);
      return;
    }
    const comments = await Comment.findAll({ where: { issueId } });
    res.status(200).json(comments);
  },
};
