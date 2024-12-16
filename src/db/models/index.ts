import { Sequelize } from 'sequelize';
import process from 'process';

import dbConfig from '../../config/database.js';

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

let sequelize = new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };
