import SubTitle from "../../components/titles/Subtitle";
import BotonEliminar from "../../components/botonEliminar/BotonEliminar";
import BotonEditar from "../../components/botonEditar/BotonEditar";

const UserList = ({ users, loading, onEdit, onDelete }) => {
  return (
    <div className="newUser">
      {loading && !users.length && (
        <p className="loading">Cargando usuarios...</p>
      )}

      {users.length === 0 && !loading ? (
        <p className="no-users">No hay usuarios registrados</p>
      ) : (
        <ul className="user-list">
          <SubTitle title={"Usuarios"} />
          {users.map((user) => (
            <li key={user._id} className="user-item">
              <div className="user-info">
                <p key={`${user._id}-name`}><b>Nombre: </b>{user.name.toLowerCase()}</p>
                <p key={`${user._id}-email`}><b>Email: </b> {user.email}</p>
                {user.birthDate && (
                  <p key={`${user._id}-birth`}>
                    <b>Fecha de nacimiento:</b> {new Date(user.birthDate).toLocaleDateString("es-UY")}
                  </p>
                )}
                <p key={`${user._id}-role`}><b>Rol: </b> {user.role === "admin" ? "Administrador" : "Usuario"}</p>
                <p key={`${user._id}-dept`}><b>Departamento: </b>{user.department}</p>
              </div>
              <div className="botonesAdmin">
                <BotonEliminar
                  key={`${user._id}-delete`}
                  onDelete={() => onDelete(user._id)}
                  itemType="usuario"
                  itemName={user.name}
                  className="btn btnEliminar"
                />
                <BotonEditar 
                  key={`${user._id}-edit`}
                  onEdit={() => onEdit(user)}
                  itemType="usuario"       
                  itemName={user.name}   
                  className="btn btnEditar" 
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;