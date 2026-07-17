import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import spaceRoutes from "./routes/spaceRoutes.js";
import movementRoutes from "./routes/movementRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API SmartBudget funcionando correctamente" });
});

app.use("/api", authRoutes);
app.use("/api/spaces", spaceRoutes);
app.use("/api/movements", movementRoutes);

app.use((err, req, res, next) => {
    console.error("Error detectado en el servidor:", err);
    res.status(err.status || 500).json({
        message: err.message || "Error interno del servidor"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de SmartBudget corriendo en el puerto ${PORT}`);
});