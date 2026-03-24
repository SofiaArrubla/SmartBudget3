import jwt from 'jsonwebtoken';
import { SECRET } from '../config/jwt.js';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers?.authorization;

    if(!authHeader){
        return res.status(401).json({
            message: "Token requerido"
        });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"Token inválido"
        });
    }

    jwt.verify(token, SECRET, (err, user) => {
        if(err){
            return res.status(403).json({
                message:"Token invalido"
            });
        }

        req.user = user;
        next();
    });
};