import pg from 'pg';

export const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'login_db',
    password: 'brahyan2000',
    port: 5432
});