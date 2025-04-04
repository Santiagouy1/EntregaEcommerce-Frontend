import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const BotonEditar = ({
  onEdit,
  itemType = "elemento",
  itemName = "",
  text = <FontAwesomeIcon icon={faEdit}/>,
  disabled = false,
  className = "",
  onSuccess = () => {},
  confirmButtonText = "Sí, editar",
  cancelButtonText = "Cancelar",
  titleText = "¿Editar este elemento?",
  icon = "warning"
}) => {
  const handleEdit = async () => {
    if (disabled) return;

    const result = await Swal.fire({
      title: titleText,
      text: `¿Deseas editar este ${itemType}${itemName ? ` (${itemName})` : ''}?`,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });

    if (result.isConfirmed) {
      try {
        await onEdit();
        
        onSuccess();
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: `Error al preparar la edición del ${itemType}. ${error.message || ''}`,
          icon: 'error'
        });
      }
    }
  };

  return (
    <button
      onClick={handleEdit}
      disabled={disabled}
      className={className}
      type="button"
      title='Editar'
    >
      {text}
    </button>
  );
};

export default BotonEditar;