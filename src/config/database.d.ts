import type { Dialect } from 'sequelize';

interface DbConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: Dialect;
}

declare const dbConfig: {
  development: DbConfig;
  production: DbConfig;
  [key: string]: DbConfig;
};

export default dbConfig;