module.exports = (sequelize, DataTypes) => {
  const Milestone = sequelize.define(
    'Milestone',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
      },
      description: {
        type: DataTypes.STRING(300),
        allowNulee: false,
      },
    },
  );

  Milestone.associate = (models) => {
    Milestone.hasMany(models.Issue, {
      foreignKey: 'milestoneId',
    });
  };

  return Milestone;
};
