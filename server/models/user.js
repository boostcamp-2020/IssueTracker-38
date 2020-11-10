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
      nickname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING(255),
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
      allowNull: false,
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
