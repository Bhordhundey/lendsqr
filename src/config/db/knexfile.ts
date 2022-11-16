import type { Knex } from "knex";
import appConfig from '../config';
require('dotenv').config();

const config: { [key: string]: Knex.Config } =  {
  development: {
    client: 'mysql',
    connection:  {
      host : appConfig.database.host,
      port : Number(appConfig.database.port),
      user : appConfig.database.user,
      password : appConfig.database.password,
      database : appConfig.database.name
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  production: {
    client: 'mysql',
    connection: appConfig.database.databaseUrl,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
} 

console.log("===config===", config);


export default config;

