import express from "express";
import { requireAuth } from "../middldewares/require-auth";
import { fundTransfer, fundWallet, fundWithdrawal, getWalletDetails } from "../controllers/wallet";

const router = express.Router();

router.get('/details', requireAuth, getWalletDetails);
router.post('/fund', requireAuth, fundWallet);
router.post('/withdraw', requireAuth, fundWithdrawal);
router.post('/transfer', requireAuth, fundTransfer);

export default router;
