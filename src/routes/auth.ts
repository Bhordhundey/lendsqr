import express from "express";
import { getAuthToken } from "../controllers/auth";

const router = express.Router();
router.post('/token', getAuthToken);

export default router;
