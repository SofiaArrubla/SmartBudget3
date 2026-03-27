import bcrypt from 'bcrypt';
import {
createUser,
findUserByEmail,
updateUser,
updateEmail,
updatePassword
} from '../models/userModel.js';

import jwt from 'jsonwebtoken';
import { SECRET } from '../config/jwt.js';

export const register = async (req, res) => {
const { email, password } = req.body;

try {
    if (!email || !password) {
    return res.status(400).json({
        message: "Email y contraseña son obligatorios"
    });
    }

    const userExist = await findUserByEmail(email);

    if (userExist) {
    return res.status(400).json({
        message: 'Usuario existente'
    });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword);

    res.json({
    message: 'Usuario registrado con éxito',
    user: {
        id: newUser.id,
        email: newUser.email,
        nombre: newUser.nombre || ""
    }
    });

} catch (error) {
    console.error(error);
    res.status(500).json({
    message: 'Error en el servidor'
    });
}
};

export const login = async (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
    return res.status(400).json({
    message: "Email y contraseña son obligatorios"
    });
}

try {
    const user = await findUserByEmail(email);

    if (!user) {
    return res.status(404).json({
        message: 'Usuario no registrado'
    });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
    return res.status(401).json({
        message: 'Contraseña incorrecta'
    });
    }

    const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1h" }
    );

    res.json({
    message: 'Login exitoso',
    token,
    user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre || ""
    }
    });

} catch (error) {
    console.error(error);
    res.status(500).json({
    message: 'Error en el servidor'
    });
}
};

export const getProfile = async (req, res) => {
try {
    res.json({
    user: req.user
    });
} catch (error) {
    res.status(500).json({
    message: "Error al obtener perfil"
    });
}
};

export const updateProfile = async (req, res) => {
const { nombre } = req.body;

try {
    if (!nombre) {
    return res.status(400).json({
        message: "El nombre es obligatorio"
    });
    }

    const updatedUser = await updateUser(req.user.id, nombre);

    res.json({
    message: "Nombre actualizado correctamente",
    user: updatedUser
    });

} catch (error) {
    console.error(error);
    res.status(500).json({
    message: "Error al actualizar"
    });
}
};

export const changeEmail = async (req, res) => {
    const {email} = req.body;

    try{
        if(!email){
            return res.status(400).json({
                message: "El Email es requerido"
            });
        }

        const updatedEmail = await updateEmail(req.user.id, email);

        res.json({
            message: "Email actualizado correctamente"
        });
    }catch(error){
        res.status(500).json({
            message: "Error al cambiar Email"
        });
    }
};

export const changePassword = async (req, res) => {
const { password } = req.body;

try {
    if (!password || password.length < 6) {
    return res.status(400).json({
        message: "La contraseña debe tener mínimo 6 caracteres"
    });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await updatePassword(req.user.id, hashedPassword);

    res.json({
    message: "Contraseña actualizada correctamente"
    });

} catch (error) {
    console.error(error);
    res.status(500).json({
    message: "Error al cambiar contraseña"
    });
}
};