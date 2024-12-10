'use strict';

const tableName = {
  tableName: "users",
  schema: "traveo"
}

const attributeName = "username";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, attributeName, {
      type: Sequelize.STRING(60),
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, attributeName, {
      type: Sequelize.STRING(128),
    });
  }
};
