import "reflect-metadata"
import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm"
import User from "./entity/user.entity"
import Friend from "./entity/friend.entity"
import { SeederOptions } from "typeorm-extension";

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
    type: "mysql",
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT || '3306', 10),
    username: process.env.DEV_DB_USERNAME || 'root',
    password: process.env.DEV_DB_PASSWORD || 'root_password',
    database: process.env.DEV_DB_NAME || 'database_development',
    seeds: ['src/orm/seeding/seeds/**/*{.ts,.js}'],
    factories: ['src/orm/seeding/factories/**/*{.ts,.js}'],
    synchronize: true,
    logging: false,
    entities: [User, Friend],
    migrations: [],
    subscribers: [],
}

export const AppDataSource = new DataSource(options)
