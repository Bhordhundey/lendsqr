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
    // const PORT = config.serverPort || 5000;
    const server_port = Number(config.serverPort) || Number(config.serverPort)  || 80;
    const server_host = config.serverHost || '0.0.0.0';

    console.log("==server_host===", server_host);
    

    app.listen(server_port, server_host, function() {
        console.log('Listening on port %d', server_port);
    });
}

start();