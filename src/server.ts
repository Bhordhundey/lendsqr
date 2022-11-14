import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import * as dotenv from "dotenv";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middldewares/error-handler";
import userRoute from "./routes/user";
import walletRoute from "./routes/wallet";
import authRoute from "./routes/auth";

import config from './config/config';

dotenv.config();
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
    cookieSession({
        signed: false
    })
)

// ROUTES MIDDLEWARE
app.use("/api/user", userRoute);
app.use("/api/wallet", walletRoute);
app.use("/api/auth", authRoute);

app.all("*", async (req, res) => {
   throw new NotFoundError();
})

app.use(errorHandler);


const start = async () => {
    const PORT = config.serverPort || 5000;

    app.listen(PORT, () => {
        console.log("===Server Connected==="); 
    })
}

start();