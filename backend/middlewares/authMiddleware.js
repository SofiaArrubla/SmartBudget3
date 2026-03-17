import jwt from 'jsonwebtoken';

const SECRET = "clave_secreta";

export const verifyToken = (req, res, next) => {
    const authHeader = req.Header["authorization"];

    const token = authHeader && authHeader.slipt("")[1];

    if(!token){
        return res.status().json({
            message:"Token requerido"
        });
    }

    jwt.verify(token, SECRET, (err, user) => {
        if(err){
            return res.status(401).json({
                message:"Token invalido"
            });
        }

        req.user = user;
        next();
    });
};