import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },

  // production: {
  //   username: process.env.RDS_USERNAME,
  //   password: process.env.RDS_PASSWORD,
  //   database: process.env.RDS_NAME,
  //   host: process.env.RDS_HOSTNAME,
  //   dialect: 'mysql',
  // },

  // test: {
  //   username: process.env.CI_DB_USERNAME,
  //   password: process.env.CI_DB_PASSWORD,
  //   database: process.env.CI_DB_NAME,
  //   host: '127.0.0.1',
  //   port: 3306,
  //   dialect: 'mysql',
  //   dialectOptions: {
  //     bigNumberStrings: true
  //   }
  // },
};

export default dbConfig;