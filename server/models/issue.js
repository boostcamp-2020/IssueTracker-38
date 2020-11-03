module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define(
    'Issue',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      isClosed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );
  Issue.associate = (models) => {
    Issue.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
    Issue.belongsTo(models.Milestone, {
      foreignKey: {
        name: 'milestoneId',
      },
    });
    Issue.hasMany(models.Comment, {
      foreignKey: {
        name: 'issueId',
      },
      onDelete: 'CASCADE',
    });
    Issue.belongsToMany(models.Label, {
      through: 'IssueLabel',
    });
    Issue.belongsToMany(models.User, {
      through: 'IssueAssignee',
    });
  };

  return Issue;
};
