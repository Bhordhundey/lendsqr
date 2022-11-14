import * as dotenv from "dotenv";
dotenv.config();


const config = {
    serverPort: process.env.SERVER_PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRE
    }
}

export default config