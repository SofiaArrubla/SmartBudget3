import {
    createSpace,
    getSpaceByUser,
    deleteSpace,
    updateSpace
} from "../models/spaceModel.js";

//crear los espacios
export const create = async (req, res) => {
    try{
        const space = await createSpace(req.body, req.user.id);

        res.json({
            message: "Espacio creado correctamente",
            space
        });
    }catch(error){
        console.error(error);

        res.status(400).json({
            message: error.message || "Error al crear espacio"
        });
    }
};

export const getAll = async (req, res) => {
    try{
        const space = await getSpaceByUser(req.user.id);

        res.json(space);
    }catch(error){
        res.status(500).json({
            message: "Error al obtener espacio"
        });
    }
};

export const remove = async (req, res) => {
    const {id} = req.params;

    try{
        const deleted = await deleteSpace(id, req.user.id);

        res.json({
            message: "Espacio eliminado",
            space: deleted
        });
    }catch(error){
        console.error(error);
        res.status(403).json({
            message: error.message
        });
    }
};

export const update = async (req, res) => {
    const {id} = req.params;

    try{
        const updated = await updateSpace(id, req.body, req.user.id);

        res.json({
            message: "Espacio actualizado",
            space: updated
        });
    }catch(error){
        console.error(error);

        res.status(403).json({
            message: error.message
        });
    }
};