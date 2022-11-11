import express from "express";
import { createAccount } from "../controllers/user";

const router = express.Router();
router.post('/', createAccount);

export default router;
