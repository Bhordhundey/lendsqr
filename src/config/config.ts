import * as dotenv from "dotenv";
dotenv.config();


const appConfig = {
    serverPort: process.env.SERVER_PORT,
    environment: process.env.NODE_ENV,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRE
    },
   database: {
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        databaseUrl: process.env.JAWSDB_URL
   }
}

export default appConfig