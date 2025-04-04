import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark}/>
        </button>
        <div className="modal-body">
        {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
