import knex from "knex";
import config from "./knexfile";
import appConfig from "../config";

const db = knex(appConfig.environment == "development" ? config.development : config.production);

export default db;
