'use strict';

const tableNameUsers = 'trips';
const schema = process.env.DB_MAIN_SCHEMA;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { tableName: tableNameUsers, schema },
      'deleted_at',
      {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      { tableName: tableNameUsers, schema },
      'deleted_at',
    );
  },
};
