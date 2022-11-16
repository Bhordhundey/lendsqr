web: knex --knexfile migrate:rollback --migrations-directory ./src/config/db/migrations && 
knex migrate:latest --knexfile ./src/config/db/knexfile.ts && tsc && node ./dist/src/server.js