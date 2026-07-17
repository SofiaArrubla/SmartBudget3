import { pool } from "../config/db.js";

// Registrar un movimiento y actualizar el saldo del espacio de forma atómica
export const createMovement = async (movementData) => {
    const { spaceId, userId, amount, type, category, description } = movementData;
    
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        // 1. Insertar el movimiento en la base de datos
        const insertQuery = `
            INSERT INTO movements (space_id, user_id, amount, type, category, description)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, space_id AS "spaceId", user_id AS "userId", amount, type, category, description, created_at AS "createdAt"
        `;
        const movementRes = await client.query(insertQuery, [spaceId, userId, amount, type, category, description]);
        const newMovement = movementRes.rows[0];

        // 2. Determinar el impacto financiero (ingreso suma, gasto resta)
        const balanceAdjustment = type === "income" ? amount : -amount;

        // 3. Actualizar el saldo actual (current_amount) de la tabla spaces
        const updateSpaceQuery = `
            UPDATE spaces
            SET current_amount = current_amount + $1
            WHERE id = $2
            RETURNING current_amount AS "currentAmount"
        `;
        await client.query(updateSpaceQuery, [balanceAdjustment, spaceId]);

        await client.query("COMMIT");
        return newMovement;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

// Obtener el historial completo de transacciones de un espacio
export const getMovementsBySpace = async (spaceId) => {
    const query = `
        SELECT 
            m.id,
            m.space_id AS "spaceId",
            m.amount,
            m.type,
            m.category,
            m.description,
            m.created_at AS "createdAt",
            u.nombre AS "userName"
        FROM movements m
        JOIN users u ON m.user_id = u.id
        WHERE m.space_id = $1
        ORDER BY m.created_at DESC
    `;
    const res = await pool.query(query, [spaceId]);
    return res.rows;
};

// Eliminar un movimiento y recalcular el saldo
export const deleteMovement = async (movementId, spaceId) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        // 1. Obtener los detalles del movimiento antes de eliminarlo
        const getMovementQuery = `SELECT amount, type FROM movements WHERE id = $1 AND space_id = $2`;
        const movementRes = await client.query(getMovementQuery, [movementId, spaceId]);
        
        if (movementRes.rows.length === 0) {
            throw new Error("Movimiento no encontrado");
        }

        const { amount, type } = movementRes.rows[0];

        // 2. Eliminar de la base de datos
        await client.query(`DELETE FROM movements WHERE id = $1`, [movementId]);

        // 3. Revertir el saldo en el espacio afectado
        // Si el movimiento eliminado era un ingreso, el saldo disminuye. Si era un gasto, se devuelve/suma.
        const balanceAdjustment = type === "income" ? -amount : amount;

        await client.query(`
            UPDATE spaces
            SET current_amount = current_amount + $1
            WHERE id = $2
        `, [balanceAdjustment, spaceId]);

        await client.query("COMMIT");
        return { message: "Movimiento eliminado con éxito" };
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export const getMovementsByUser = async (userId) => {
    const query = `
        SELECT 
            m.id, m.space_id AS "spaceId", m.amount, m.type, m.category, m.description, m.created_at AS "createdAt",
            s.name AS "spaceName"
        FROM movements m
        JOIN spaces s ON m.space_id = s.id
        WHERE m.user_id = $1
        ORDER BY m.created_at DESC
    `;
    const res = await pool.query(query, [userId]);
    return res.rows;
};