import * as dotenv from "dotenv";
dotenv.config();


const config = {
    serverPort: process.env.SERVER_PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRE
    },
   database: {
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        host: process.env.DB_HOST
   }
}

export default config