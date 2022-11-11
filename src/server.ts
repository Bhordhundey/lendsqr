import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import * as dotenv from "dotenv";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middldewares/error-handler";
import userRoute from "./routes/user";
import walletRoute from "./routes/wallet";

dotenv.config();
const app = express();
app.set("trust proxy", true);
app.use(json());

// ROUTES MIDDLEWARE
app.use("/api/user", userRoute);
app.use("/api/wallet", walletRoute);

app.all("*", async (req, res) => {
   throw new NotFoundError();
})

app.use(errorHandler);


const start = async () => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log("===Server Connected==="); 
    })
}

start();