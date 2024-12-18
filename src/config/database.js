import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'root',
    password: process.env.DEV_DB_PASSWORD || 'root_password',
    database: process.env.DEV_DB_NAME || 'database_development',
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DEV_DB_PORT || '3306', 10),
    dialect: 'mysql',
  },

  production: {
    username: process.env.RDS_USERNAME || 'root',
    password: process.env.RDS_PASSWORD || 'root_password',
    database: process.env.RDS_NAME || 'database_production',
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DEV_DB_PORT || '3306', 10),
    dialect: 'mysql',
  },

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