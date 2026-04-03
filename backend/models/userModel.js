import {pool} from '../config/db.js';

export const createUser = async (email, password, nombre) =>{
    const res = await pool.query(
        'INSERT INTO users (email, password, nombre) VALUES ($1, $2, $3) RETURNING *',
        [email, password, nombre]
    );
    return res.rows[0];
};

export const findUserByEmail = async (email) => {
    const res = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return res.rows[0];
};

export const updateUser = async (id, nombre) => {
    const res = await pool.query(
        'UPDATE users SET nombre = $1 WHERE id = $2 RETURNING *',
        [nombre, id]
    );
    return res.rows[0];
};

export const updateEmail = async (id,email) => {
    const res = await pool.query(
        'UPDATE users SET email = $1 WHERE id = $2',
        [email, id]
    )
    return res.rows[0];
};

export const updatePassword = async (id, password) => {
    const res = await pool.query(
        'UPDATE users SET password = $1 WHERE id = $2',
        [password, id]
    );
    return res.rows[0];
};