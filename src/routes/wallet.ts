import express from "express";
import { requireAuth } from "../middldewares/require-auth";
import { fundTransfer, fundWallet, getWalletDetails } from "../controllers/wallet";

const router = express.Router();

router.get('/user/:userId', requireAuth, getWalletDetails);
router.post('/fund-wallet', requireAuth, fundWallet);
router.post('/fund-transfer', requireAuth, fundTransfer);

export default router;
