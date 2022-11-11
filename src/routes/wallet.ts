import express from "express";
import { fundWallet } from "../controllers/wallet";

const router = express.Router();
router.post('/fund-wallet', fundWallet);

export default router;
