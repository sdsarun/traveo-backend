'use strict';

const tableNameUsers = 'users';
const schema = process.env.DB_MAIN_SCHEMA;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn(
          { tableName: tableNameUsers, schema },
          'birthday',
        ),
        queryInterface.removeColumn(
          { tableName: tableNameUsers, schema },
          'gender',
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          {
            tableName: tableNameUsers,
            schema,
          },
          'birthday',
          { type: DataType.DATE, allowNull: true },
        ),
        queryInterface.addColumn(
          {
            tableName: tableNameUsers,
            schema,
          },
          'gender',
          { type: DataType.STRING, allowNull: true },
        ),
      ]);
    });
  },
};
