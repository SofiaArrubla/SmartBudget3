import * as MovementModel from "../models/movementModel.js";
import { pool } from "../config/db.js";

const checkUserInSpace = async (userId, spaceId) => {
    const query = `SELECT 1 FROM space_users WHERE user_id = $1 AND space_id = $2`;
    const res = await pool.query(query, [userId, spaceId]);
    return res.rows.length > 0;
};

export const registerMovement = async (req, res, next) => {
    try {
        const { spaceId, amount, type, category, description } = req.body;
        const userId = req.user.id; // Obtenido del payload decodificado del JWT

        // Validaciones de tipos de datos de entrada
        if (!spaceId || !amount || !type || !category) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }

        const parsedSpaceId = parseInt(spaceId, 10);
        const parsedAmount = parseFloat(amount);

        if (isNaN(parsedSpaceId) || isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ message: "Los parámetros numéricos no son válidos" });
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({ message: "El tipo debe ser 'income' o 'expense'" });
        }

        // Validación de pertenencia al espacio financiero
        const isAuthorized = await checkUserInSpace(userId, parsedSpaceId);
        if (!isAuthorized) {
            return res.status(403).json({ message: "No tienes permisos en este espacio de ahorro" });
        }

        const movement = await MovementModel.createMovement({
            spaceId: parsedSpaceId,
            userId,
            amount: parsedAmount,
            type,
            category,
            description
        });

        res.status(201).json({ message: "Movimiento registrado con éxito", movement });
    } catch (error) {
        next(error);
    }
};

export const getSpaceMovements = async (req, res, next) => {
    try {
        const spaceId = parseInt(req.params.spaceId, 10);
        const userId = req.user.id;

        if (isNaN(spaceId)) {
            return res.status(400).json({ message: "El ID del espacio debe ser un número entero válido" });
        }

        const isAuthorized = await checkUserInSpace(userId, spaceId);
        if (!isAuthorized) {
            return res.status(403).json({ message: "No posees acceso para consultar los movimientos de este espacio" });
        }

        const movements = await MovementModel.getMovementsBySpace(spaceId);
        res.status(200).json(movements);
    } catch (error) {
        next(error);
    }
};

export const removeMovement = async (req, res, next) => {
    try {
        const movementId = parseInt(req.params.movementId, 10);
        const spaceId = parseInt(req.params.spaceId, 10);
        const userId = req.user.id;

        if (isNaN(movementId) || isNaN(spaceId)) {
            return res.status(400).json({ message: "Parámetros inválidos" });
        }

        const isAuthorized = await checkUserInSpace(userId, spaceId);
        if (!isAuthorized) {
            return res.status(403).json({ message: "No tienes permisos para modificar este espacio" });
        }

        const result = await MovementModel.deleteMovement(movementId, spaceId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const getUserMovements = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const movements = await MovementModel.getMovementsByUser(userId);
        res.status(200).json(movements);
    } catch (error) {
        next(error);
    }
};