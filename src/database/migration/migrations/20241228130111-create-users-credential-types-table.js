'use strict';

const tableName = 'user_credential_types';
const schema = process.env.DB_MAIN_SCHEMA;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          { tableName, schema },
          {
            id: {
              type: Sequelize.DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
              allowNull: false,
            },
            name: {
              type: Sequelize.DataTypes.STRING,
              allowNull: false,
            },
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable({ tableName, schema }, { transaction: t }),
      ]);
    });
  },
};
