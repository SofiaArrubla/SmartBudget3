import express from "express";
import { create, getAll, remove } from "../controllers/spaceController.js";
import {verifyToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAll);
router.post("/", verifyToken, create);
router.delete("/:id", verifyToken, remove);

export default router;