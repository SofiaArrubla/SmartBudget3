import {pool} from '../config/db.js';

export const createUser = async (email, password) =>{
    const res = await pool.query(
        'INSERT INTO usuarios (email, password) VALUES ($1, $2) RETURNING *',
        [email, password]
    );
    return res.rows[0];
}

export const findUserByEmail = async (email) => {
    const res = await pool.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
    );
    return res.rows[0];
}