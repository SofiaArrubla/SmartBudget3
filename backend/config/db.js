import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () =>{
    console.log("Conectado a PostgreSQL (Supabase)");
});