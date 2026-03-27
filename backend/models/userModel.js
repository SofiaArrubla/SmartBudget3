import {pool} from '../config/db.js';

export const createUser = async (email, password) =>{
    const res = await pool.query(
        'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *',
        [email, password]
    );
    return res.rows[0];
};

export const findUserByEmail = async (email) => {
    const res = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );
    return res.rows[0];
};

export const updateUser = async (id, nombre) => {
    const res = await pool.query(
        'UPDATE usuarios SET nombre = $1 WHERE id = $2 RETURNING *',
        [nombre, id]
    );
    return res.rows[0];
};

export const updateEmail = async (id,email) => {
    const res = await pool.query(
        'UPDATE usuarios SET email = $1 WHERE id = $2',
        [email, id]
    )
    return res.rows[0];
};

export const updatePassword = async (id, password) => {
    const res = await pool.query(
        'UPDATE usuarios SET password = $1 WHERE id = $2',
        [password, id]
    );
    return res.rows[0];
};