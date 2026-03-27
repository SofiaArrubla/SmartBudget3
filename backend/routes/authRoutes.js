import express from 'express';
import { login, register, getProfile, updateProfile, changeEmail,changePassword } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.put("/email", verifyToken, changeEmail)
router.put("/password", verifyToken, changePassword);

export default router;