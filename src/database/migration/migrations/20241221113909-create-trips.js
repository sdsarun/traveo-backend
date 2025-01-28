'use strict';

const tableNameTrips = 'trips';
const schema = process.env.DB_MAIN_SCHEMA;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      {
        tableName: tableNameTrips,
        schema,
      },
      {
        id: {
          type: Sequelize.DataTypes.STRING(255),
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.literal(
            `concat('trip_',  REPLACE(gen_random_uuid()::varchar, '-', ''))`,
          ),
        },
        user_id: {
          type: Sequelize.DataTypes.STRING(255),
          allowNull: true, // Assuming user_id cannot be null
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false, // Assuming name is required
        },
        description: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true, // description is optional
        },
        start_date: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true, // Assuming start_date is optional
        },
        end_date: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true, // Assuming end_date is optional
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
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: tableNameTrips,
      schema,
    });
  },
};
