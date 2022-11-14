import express from "express";
import { requireAuth } from "../middldewares/require-auth";
import { createAccount } from "../controllers/user";

const router = express.Router();
router.post('/', requireAuth, createAccount);

export default router;
