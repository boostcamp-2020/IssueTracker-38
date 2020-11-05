module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    },
  );
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Comment.belongsTo(models.Issue, {
      foreignKey: 'issueId',
      onDelete: 'CASCADE',
    });
  };

  return Comment;
};
