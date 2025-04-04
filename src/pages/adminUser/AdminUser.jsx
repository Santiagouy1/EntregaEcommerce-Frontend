import "./AdminUser.css";
import Titles from "../../components/titles/Titles";
import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";

const AdminUser = ({ title }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [edicionModo, setEdicionModo] = useState(false);
  const [editarUsuarioId, setEditarUsuarioId] = useState(null);

  const URL = "https://67cb832e3395520e6af589a3.mockapi.io/users";

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
      const response = await fetch(URL);
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
    setEditarUsuarioId(user.id);
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
      let endpoint = URL;

      if (isEditing) {
        method = "PUT";
        endpoint = `${URL}/${editarUsuarioId}`;
      } else {
        method = "POST";
      }

      response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(
          `Error al ${isEditing ? "actualizar" : "agregar"} usuario`
        );
      }

      const resultUser = await response.json();

      if (isEditing) {
        setUsers(
          users.map((user) => (user.id === editarUsuarioId ? resultUser : user))
        );
        setEdicionModo(false);
        setEditarUsuarioId(null);
      } else {
        setUsers([...users, resultUser]);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
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
      const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar usuario");

      setUsers(users.filter((user) => user.id !== id));

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
          userToEdit={users.find((user) => user.id === editarUsuarioId)}
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
