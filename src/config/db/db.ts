import knex from "knex";
const config = require("./knexfile");
import appConfig from "../config";


const db = knex(appConfig.environment == "development" ? config.development : config.production);

export default db;
