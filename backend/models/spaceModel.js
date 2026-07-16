import {pool} from "../config/db.js";

//esto crea los espacios
export const createSpace = async (data, userId) => {
    const { name, type, targetAmount, currency, color } = data;

    if (!name || !type || !targetAmount) {
        throw new Error("Datos incompletos");
    }

    if(!["individual", "shared"].includes(type)){
        throw new Error("Tipo inválido");
    }

    if(targetAmount <= 0){
        throw new Error("Monto inválido");
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const spaceResult = await client.query(
            `INSERT INTO spaces 
            (name, type, target_amount, currency, color, created_by)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING 
            id,
            name,
            type,
            target_amount AS "targetAmount",
            current_amount AS "currentAmount",
            currency,
            color,
            created_at AS "createdAt"`,
            [name, type, targetAmount, currency || "$", color || "#4CAF50", userId]
        );

        const space = spaceResult.rows[0];

    // RELACIÓN CORRECTA
        await client.query(
            `INSERT INTO space_users (user_id, space_id) 
            VALUES ($1, $2)`,
            [userId, space.id]
        );

        await client.query('COMMIT');
        return space;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export const getSpaceByUser = async (userId) => {
    const result = await pool.query(
        `SELECT
            s.id,
            s.name,
            s.type,
            s.target_amount AS "targetAmount",
            s.current_amount AS "currentAmount",
            s.currency,
            s.color,
            s.created_at AS "createdAt"
        FROM spaces s 
        JOIN space_users su ON s.id = su.space_id 
        WHERE su.user_id = $1 
        ORDER BY s.created_at DESC`,
        [userId]
    );

    return result.rows;
};

export const  deleteSpace = async (spaceId, userId) => {
    const check = await pool.query(
        `SELECT * FROM space_users WHERE space_id = $1 AND user_id = $2`,
        [spaceId,userId]
    );

    if(check.rows.length === 0){
        throw new Error("Espacio no encontrado");
    }

    if(check.rows[0].created_by !== userId){
        throw new Error("No autorizado. Solo el creador del espacio puede eliminarlo.");
    }

    await pool.query(
        `DELETE FROM space_users WHERE space_id = $1`,
        [spaceId]
    );

    const result = await pool.query(
        `DELETE FROM spaces WHERE id = $1 RETURNING *`,
        [spaceId]
    );

    return result.rows[0];
};

export const updateSpace = async (spaceId, data, userId) => {
    const {name, targetAmount, color} = data;

    const check = await pool.query(
        `SELECT * FROM space_users WHERE space_id = $1 AND user_id = $2`,
        [spaceId,userId]
    );

    if(check.rows.length === 0){
        throw new Error("No autorizado");
    }

    const result = await pool.query(
        `UPDATE spaces SET name = $1,
        target_amount = $2,
        color = $3
        WHERE id = $4
        RETURNING
        id,
        name,
        type,
        target_amount AS "targetAmount",
        current_amount AS "currentAmount",
        currency,
        color,
        created_at AS "createdAt"`,
        [name, targetAmount, color, spaceId]
    );
    return result.rows[0];
}