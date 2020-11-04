const { Comment } = require('../models').models;

module.exports = {
  async create(req, res) {
    const comment = await Comment.create(req.body);

    res.status(200).json(comment);
  },
  async readByIssue(req, res) {
    const { issueId } = req.query;
    if (!issueId) {
      res.sendStatus(400);
      return;
    }
    const comments = await Comment.findAll({ where: { issueId }, order: ['createdAt'] });

    res.status(200).json(comments);
  },
  async update(req, res) {
    const { id, content } = req.body;
    if (!content) {
      res.sendStatus(400);
      return;
    }
    await Comment.update({ content }, { where: { id } });

    res.status(200).json({ message: '수정 되었습니다.' });
  },
};
