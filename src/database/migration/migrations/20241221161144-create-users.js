'use strict';

const tableNameUsers = 'users';
const schema = process.env.DB_MAIN_SCHEMA;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      {
        tableName: tableNameUsers,
        schema,
      },
      {
        id: {
          type: Sequelize.DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        birthday: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
        first_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        gender: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        last_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        username: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.NOW,
        },
        updated_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.NOW,
        },
        deleted_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        }
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: tableNameUsers,
      schema,
    });
  },
};
