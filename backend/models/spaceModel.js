import {pool} from "../config/db.js";

//estto crea los espacios
export const createSpace = async (data, userId) => {
    const { name, type, targetAmount, currency, color } = data;

    if (!name || !type || !targetAmount) {
        throw new Error("Datos incompletos");
    }

    const result = await pool.query(
        `INSERT INTO spaces 
        (name, type, target_amount, currency, color, created_by)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [name, type, targetAmount, currency || "$", color || "#4CAF50", userId]
    );

    const space = result.rows[0];

    // RELACIÓN CORRECTA
    await pool.query(
        `INSERT INTO space_users (user_id, space_id) 
        VALUES ($1, $2)`,
        [userId, space.id]
    );

    return space;
};
export const getSpaceByUser = async (userId) => {
    const result = await pool.query(
        `SELECT s.* 
        FROM spaces s 
        JOIN space_users su ON s.id = su.space_id 
        WHERE su.user_id = $1 
        ORDER BY s.created_at DESC`,
        [userId]
    );

    return result.rows;
};