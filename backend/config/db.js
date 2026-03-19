import pg from 'pg';

export const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'login_smart',
    password: '1035977161R',
    port: 5432
});