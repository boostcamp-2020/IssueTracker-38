const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci',
      },
      timestamps: false,
    },
    sync: { alter: true },
    pool: {
      idle: 500,
    },
  },
);

require('./issue')(sequelize, DataTypes);
require('./comment')(sequelize, DataTypes);
require('./label')(sequelize, DataTypes);
require('./milestone')(sequelize, DataTypes);
require('./user')(sequelize, DataTypes);

Object.keys(sequelize.models).forEach((model) => {
  if (sequelize.models[model].associate) sequelize.models[model].associate(sequelize.models);
});

module.exports = sequelize;
