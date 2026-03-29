import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import spaceRoutes from "./routes/spaceRoutes.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.json({
        message: "API SmartBudget funcionando"
    });
});

app.use("/api", authRoutes);
app.use("/api/spaces", spaceRoutes);

app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Error interno del servidor"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});