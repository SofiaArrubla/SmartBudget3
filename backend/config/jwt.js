import dotenv from "dotenv";
dotenv.config();

export const SECRET = process.env.JWT_SECRET;

if (!process.env.JWT_SECRET) {
    throw new Error("CRÍTICO: La variable JWT_SECRET no está definida en el entorno.");
}