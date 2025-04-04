import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

const BotonEliminar = ({
  onDelete,
  itemType = "elemento",
  itemName = "",
  text = <FontAwesomeIcon icon={faTrash} />,
  disabled = false,
  className = "",
  onSuccess = () => {},
  confirmButtonText = "Sí, eliminar",
  cancelButtonText = "Cancelar",
  titleText = "¿Estás seguro?",
  icon = "warning",
}) => {
  const item = itemName ? `"${itemName}"` : itemType;

  const handleDelete = async () => {
    if (disabled) return;

    // alerta para confirmar
    const result = await Swal.fire({
      title: titleText,
      text: `¿Deseas eliminar este ${itemType}${
        itemName ? ` (${itemName})` : ""
      }?`,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    });

    // Si el usuario confirma, proceder con la eliminacion
    if (result.isConfirmed) {
      try {
        // alerta de carga
        Swal.fire({
          title: "Eliminando...",
          text: `Eliminando ${item}`,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Ejecuta la funcion de eliminacion
        await onDelete();

        // Mostrar alerta de exito
        Swal.fire({
          title: "¡Eliminado!",
          text: `El ${itemType} ha sido eliminado con éxito.`,
          icon: "success",
          timer: 1500,
        });

        // Ejecuta el callback de exito
        onSuccess();
      } catch (error) {
        // alerta de error
        Swal.fire({
          title: "Error",
          text: `Error al eliminar el ${itemType}. ${error.message || ""}`,
          icon: "error",
        });
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={disabled}
      className={className}
      type="button"
      title="Eliminar"
    >
      {text}
    </button>
  );
};

export default BotonEliminar;
