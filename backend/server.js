import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import spaceRoutes from "./routes/spaceRoutes.js"

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/spaces", spaceRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000")
});