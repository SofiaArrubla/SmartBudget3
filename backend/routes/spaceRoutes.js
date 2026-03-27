import express from "express";
import { create, getAll } from "../controllers/spaceController.js";
import {verifyToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAll);
router.post("/", verifyToken, create);

export default router;