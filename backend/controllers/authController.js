import bcrypt from 'bcrypt';
import {createUser, findUserByEmail} from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {SECRET} from '../config/jwt.js';

export const register = async (req, res) => {
    const {email, password} =  req.body;

    try{

        if(!email || !password){
            return res.status(400).json({
                message: "Email y contraseña son obligatorios"
            });
        }

        const userExist = await findUserByEmail (email);

        if(userExist){
            return res.status(400).json({
                message: 'Usuario existente'
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await createUser(email, hashedPassword);

        res.json({
            message: 'Usuario registrado con éxito',
            user: {
                id: newUser.id,
                email:newUser.email
            }
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Email y contraseña son obligatorios"
        });
    }

    try{
        const user = await findUserByEmail (email);

        if(!user){
            return res.status(404).json({
                message: 'Usuario no registrado'
            });
        }

        const match = await bcrypt.compare(password, user.password);
        
        if(!match){
            return res.status(401).json({
                message: 'Contraseña incorrecta'
            });
        }

        //aca se genera un token
        const token = jwt.sign(
            {id: user.id, email: user.email},
            SECRET,
            {expiresIn: "1h"}
        );

        res.json({
            message: 'Login exitoso',
            token: token,
            user: {
                id: user.id,
                email: user.email
            }
        });
        
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};