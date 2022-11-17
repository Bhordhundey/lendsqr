import express from "express";
import userController from "../controllers/user";

const router = express.Router();
router.post('/', userController.createAccount);

export default router;
