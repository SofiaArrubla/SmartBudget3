import express from 'express';
import { getSpaceMovements, getUserMovements, registerMovement, removeMovement } from '../controllers/movementController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getUserMovements);
router.get('/:spaceId', verifyToken, getSpaceMovements);
router.post('/', verifyToken, registerMovement);
router.delete('/:spaceId/:movementId', verifyToken, removeMovement);

export default router;