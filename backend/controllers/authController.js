import bcrypt from 'bcrypt';
import {createUser, findUserByEmail} from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const SECRET = "clave_secreta"

export const register = async (req, res) => {
    const {email, password} =  req.body;

    try{
        const userExist = await findUserByEmail (email);

        if(userExist){
            return res.status(400).json({
                message: 'Usuario existente'
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await createUser(email, hashedPassword);

        res.json({message: 'Usuario registrado con éxito'});
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await findUserByEmail (email);

        if(!user){
            return res.status(404).json({
                message: 'Usuario nno registrado'
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
            message: 'Login exitoso'
        });
        
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: 'Error en el servidor'
        });
    }
};