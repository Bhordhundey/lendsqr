import express from "express";
import { requireAuth } from "../middldewares/require-auth";
import userController from "../controllers/user";

const router = express.Router();
router.post('/', requireAuth, userController.createAccount);

export default router;
