import {fetchAPI} from "../../utils/api.js";
import swal from "sweetalert2";

const SpaceCard = ({space, onDeleted}) => {

    const handleDelete = async () => {
        const result = await swal.fire({
            title: "¿Eliminar espacio?",
            text: `Se eliminara "${space.name}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });
        if(!result.isConfirmed) return;

        try{
            await fetchAPI(`/spaces/${space.id}`, {
                method: "DELETE"
            });

            swal.fire({
                title: "Eliminado",
                text: "El espacio fue eliminado correctamente",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });

            onDeleted();
        }catch(error){
            console.error(error);
            swal.fire({
                title: "Error",
                text: error.message || "No se pudo eliminar el espacio",
                icon: "error"
            });
        }
    };

    const progress = ((space.currentAmount || 0) / (space.targetAmount || 1)) * 100;
    const remaning = space.targetAmount - space.currentAmount;

    return(
        <div className="space-card"
        style={{borderTop: `4px solid ${space.color}`}}
        >
            <div className="card-header">
                <div>
                    <h3>{space.name}</h3>
                    <span className={`space-type ${space.type}`}>
                        {space.type === "individual"
                        ? "Individual"
                    : "Compartido"}
                    </span>
                </div>
            </div>

            <div className="card-content">
                <div className="amount-section">
                    <div>
                        <label>Monto</label>
                        <p className="amount-value">
                            {space.currency}
                            {Number(space.currentAmount).toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <label>Meta</label>
                        <p>{space.currency}
                            {Number(space.targetAmount).toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="progress-bar">
                    <div
                    className="progress-fill"
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: space.color
                    }}
                    />
                </div>

                <div className="progress-stats">
                    <span>{progress.toFixed(1)}%</span>
                    <span>
                        Faltan {space.currency}
                        {Number(remaning).toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="card-content">
                <span>
                    {new Date(space.createdAt).toLocaleDateString()}
                </span>

                <div className="actions">
                    <button onClick={() => alert("Editar Próximamente")}>
                        Editar
                    </button>

                    <button onClick={handleDelete}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpaceCard;