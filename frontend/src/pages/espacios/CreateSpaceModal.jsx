import React, {useState} from "react";
import { fetchAPI } from "../../utils/api.js";

const CreateSpaceModal = ({onClose, onCreated}) => {
    const [form, setForm] = useState({
        name: "",
        type: "individual",
        targetAmount: "",
        currency: "$",
        color: "#4CAF50"
    });

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!form.name || !form.targetAmount){
            alert("Nombre y meta son obligatorios");
            return;
        }

        try{
            await fetchAPI("/spaces", {
                method: "POST",
                body: JSON.stringify({
                    name: form.name,
                    type: form.type,
                    targetAmount: Number(form.targetAmount),
                    currency: form.currency,
                    color: form.color
                })
            });

            onCreated();
            onClose();
        }catch(error){
            console.error(error);
            alert(error.message || "Error al crear espacio");
        }
    };

    return(
        <div style={overlay}>
            <div style={modal}>
                <h2>Crear Espacio</h2>

                <form onSubmit={handleSubmit}>
                    <input 
                    name="name"
                    placeholder="Nombre"
                    onChange={handleChange}/>

                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="individual">Individual</option>
                    <option value="shared">Compartido</option>
                </select>

                <input
                name="targetAmount"
                type="number"
                placeholder="Meta"
                value={form.targetAmount}
                onChange={handleChange}/>

                <input
                name="currency"
                placeholder="Moneda"
                value={form.currency}
                onChange={handleChange}/>

                <input name="color"
                type="color"
                value={form.color}
                onChange={handleChange}/>

                <button type="submit" >Crear</button>
                <button type="button" onClick={onClose}>Cancelar</button>

                </form>

            </div>
        </div>
    );
};

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const modal = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
};
export default CreateSpaceModal;