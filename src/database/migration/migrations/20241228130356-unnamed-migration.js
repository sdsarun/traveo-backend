'use strict';

const tableName = 'users';
const schema = process.env.DB_MAIN_SCHEMA;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn(
        { tableName, schema },
        'user_credential_type_id',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        },
        { transaction: t, logging: console.log },
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn(
        { tableName, schema },
        'user_credential_type_id',
        { transaction: t, logging: console.log },
      );
    });
  },
};
