import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import * as dotenv from "dotenv";
import cookieSession from "cookie-session";
import userRoute from "./routes/user";
import walletRoute from "./routes/wallet";
import authRoute from "./routes/auth";

import config from './config/config';
import { sendError } from "./util/common";
import HttpStatusCode from "./models/HttpStatusCode";

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

app.all("*", async (request, response) => {
   sendError({message: "Route Not Found", response, code: HttpStatusCode.NOT_FOUND })
})


const start = async () => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`===Server Connected on port ${PORT}===`); 
    })
}

start();