// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: [".env.local", ".env.dev", ".env.prod", ".env.test"] });

const config = {
  production: {
    dialect: "postgres",
    host: process.env.DB_MAIN_HOST,
    port: +process.env.DB_MAIN_PORT,
    username: process.env.DB_MAIN_USERNAME,
    password: process.env.DB_MAIN_PASSWORD,
    database: process.env.DB_MAIN_DATABASE,
    schema: process.env.DB_MAIN_SCHEMA,
    dialectOptions: {
      ssl: process.env.DB_MAIN_SSL === "true"
    },
  },
  development: {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "P@ssw0rd",
    database: "traveo-dev",
    schema: "traveo",
  },
  test: {
  }
}

module.exports = config;