import "./AvatarUser.css";
import logoUser from "../../assets/images/avatar-user.png";
import Modal from "../modal/Modal";
import LogIn from "../../pages/logIn/LogIn";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

const AvatarUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, logout } = useUser(); 

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="picture-container">
      <div
        className="ing-reg-avatar"
        onClick={isAuthenticated ? logout : toggleModal}
      >
        <p className="ingReg">
          {isAuthenticated ? (
            "Cerrar Sesión"
          ) : (
            <>
              Ingresar <br />
              Registrarse
            </>
          )}
        </p>
        <img src={logoUser} alt="User avatar" className="user-picture" />
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <LogIn />
      </Modal>
    </div>
  );
};

export default AvatarUser;
