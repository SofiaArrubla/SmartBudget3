import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
    console.error("Error inesperado en el pool de clientes de PG:", err);
});

pool.on("connect", () =>{
    console.log("Conectado a PostgreSQL (Supabase)");
});