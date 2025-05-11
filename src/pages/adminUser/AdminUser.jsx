import "./AdminUser.css";
import Titles from "../../components/titles/Titles";
import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { URL } from "../../config/env.config";
import { useUser } from "../../context/UserContext"; 

const AdminUser = ({ title }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [edicionModo, setEdicionModo] = useState(false);
  const [editarUsuarioId, setEditarUsuarioId] = useState(null);
  const { token } = useUser(); 

  const URL_USERS = `${URL}/users`;

  useEffect(() => {
    document.title = title;
  }, [title]);

  // Cargar usuarios al iniciar
  useEffect(() => {
    fetchUsers();
  }, []);

  // obtener usuarios
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(URL_USERS);
      if (!response.ok) throw new Error("Error al cargar usuarios");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // funcion para cargar datos del usuario al formulario
  const handleEdit = async (user) => {
    setEdicionModo(true);
    setEditarUsuarioId(user._id);
    return Promise.resolve(user);
  };

  // cancelar la edición
  const cancelEdit = () => {
    setEdicionModo(false);
    setEditarUsuarioId(null);
  };

  //manejar el envio del formulario crear o actualizar
  const handleSubmit = async (userData, isEditing) => {
    setLoading(true);
    setError(null);
  
    try {
      let response;
      let method;
      let endpoint = URL_USERS;
      let headers = {
        "Content-Type": "application/json",
        "access_token": token,
      };
  
      if (isEditing) {
        method = "PUT";
        endpoint = `${URL_USERS}/${editarUsuarioId}`;
      } else {
        method = "POST";
      }
  
      response = await fetch(endpoint, {
        method: method,
        headers: headers,
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const responseClone = response.clone(); 
        
        const errorData = await responseClone.json().catch(async () => {
          const textError = await response.text();
          return { message: textError };
        });
        
        let errorMessage = `Error al ${isEditing ? "actualizar" : "agregar"} usuario`;
        
        if (response.status === 401) {
          errorMessage = "No tienes autorización para realizar esta acción. Por favor, inicia sesión nuevamente.";
        } else if (response.status === 403) {
          errorMessage = "No tienes permisos suficientes para realizar esta acción.";
        } else if (errorData && errorData.message) {
          errorMessage = errorData.message;
          
          if (errorData.errors && Array.isArray(errorData.errors)) {
            errorMessage += ": " + errorData.errors.join(', ');
          }
        }
        
        throw new Error(errorMessage);
      }

      // Procesar la respuesta exitosa
      const resultData = await response.json();
      let userResult;
      
      if (resultData.user) {
        userResult = resultData.user;
      } else {
        userResult = resultData;
      }

      if (isEditing) {
        setUsers(
          users.map((user) => (user._id === editarUsuarioId ? userResult : user))
        );
        setEdicionModo(false);
        setEditarUsuarioId(null);
      } else {
        setUsers([...users, userResult]);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return true;
    } catch (err) {
      setError(err.message);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Funcion eliminar usuario
  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${URL_USERS}/${id}`, {
        method: "DELETE",
        headers: {
          "access_token": token
        }
      });
  
      if (!response.ok) {
        // Solo intentamos leer el cuerpo una vez
        const errorText = await response.text();
        let errorMessage = "Error al eliminar usuario";
        
        try {
          // Intentamos parsear como JSON si es posible
          const errorData = JSON.parse(errorText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          console.log(e);
          if (errorText) {
            errorMessage = errorText;
          }
        }
        
        throw new Error(errorMessage);
      }
  
      setUsers(users.filter((user) => user._id !== id));
  
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
  
      if (editarUsuarioId === id) {
        cancelEdit();
      }
  
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-container">
      <div className="userTitle">
        <Titles titulo={"Administrador de Usuarios"} />
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="mensaje-exito">La operación se realizó con éxito!</div>
      )}

      <div className="parent">
        <UserForm
          onSubmit={handleSubmit}
          editMode={edicionModo}
          editUserId={editarUsuarioId}
          userToEdit={users.find((user) => user._id === editarUsuarioId)}
          onCancelEdit={cancelEdit}
          loading={loading}
        />

        <UserList
          users={users}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteUser}
        />
      </div>
    </main>
  );
};

export default AdminUser;