import { Sequelize, Dialect } from 'sequelize';
import process from 'process';

import dbConfig from '../../config/database.js';

type ConfigType = keyof typeof dbConfig;
const env: ConfigType = process.env.NODE_ENV as ConfigType || 'development';
const config = dbConfig[env];
const dialect = config.dialect as Dialect;

let sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  dialect,
});

export { Sequelize, sequelize };
