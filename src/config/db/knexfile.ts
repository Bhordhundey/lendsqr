import type { Knex } from "knex";
import dbConfig from '../config';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
      host : dbConfig.database.host,
      port : Number(dbConfig.database.port),
      user : dbConfig.database.user,
      password : dbConfig.database.password,
      database : dbConfig.database.name
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config;


// npx knex migrate:make init --migrations-directory db/migrations