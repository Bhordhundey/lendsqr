import knex from "knex";
import config from "./knexfile";

// TODO: in prod, don't hardcode db config here
// but instead pull values in via env vars or
// even better with a config library like
// convict

// TODO in prod, use dependency injection
// to create knex instance so db access can be mocked
// for tests

const db = knex(config.development);
export default db;
