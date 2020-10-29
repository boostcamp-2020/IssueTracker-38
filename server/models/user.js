module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Issue, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
    });
    User.belongsToMany(models.Issue, {
      through: 'IssueAssignee',
    });
  };

  return User;
};
