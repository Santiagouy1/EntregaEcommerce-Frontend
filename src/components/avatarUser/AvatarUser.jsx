import "./AvatarUser.css";
import logoUser from "../../assets/images/avatar-user.png";
import Modal from "../modal/Modal";
import LogIn from "../../pages/logIn/LogIn";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AvatarUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.reload();
  };

  return (
    <div className="picture-container">
      <div
        className="ing-reg-avatar"
        onClick={isAuthenticated ? handleLogout : toggleModal}
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
