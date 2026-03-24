import pg from 'pg';

export const pool = new pg.Pool({
    connectionString: "postgresql://postgres.uouxetmxrfsooteopawe:Brahyan2000*@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true",
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("connect", () => {
    console.log("Conectado a PostgresSQL (Supabase)");
});