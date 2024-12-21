// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const config = {
  production: {
    dialect: 'postgres',
    host: process.env.DB_MAIN_HOST,
    port: +process.env.DB_MAIN_PORT,
    username: process.env.DB_MAIN_USERNAME,
    password: process.env.DB_MAIN_PASSWORD,
    database: process.env.DB_MAIN_DATABASE,
    schema: process.env.DB_MAIN_SCHEMA,
    dialectOptions: {
      ssl: process.env.DB_MAIN_SSL === 'true',
    },
  },
  development: {
    dialect: 'postgres',
    host: process.env.DB_MAIN_HOST,
    port: +process.env.DB_MAIN_PORT,
    username: process.env.DB_MAIN_USERNAME,
    password: process.env.DB_MAIN_PASSWORD,
    database: process.env.DB_MAIN_DATABASE,
    schema: process.env.DB_MAIN_SCHEMA,
    dialectOptions: {
      ssl: process.env.DB_MAIN_SSL === 'true',
    },
    // dialect: 'postgres',
    // host: '192.168.2.39',
    // port: 5432,
    // username: 'dev',
    // password: 'dev',
    // database: 'traveo-dev',
    // schema: 'traveo',
  },
  test: {},
};

module.exports = config;