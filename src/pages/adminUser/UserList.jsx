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
            <li key={user.id} className="user-item">
              <div className="user-info">
                <p><b>Nombre: </b>{user.name}</p>
                <p><b>Email: </b> {user.email}</p>
                {user.birthDate && (
                  <p>
                    <b>Fecha de nacimiento:</b> {new Date(user.birthDate +  "T00:00:00").toLocaleDateString("es-UY")}
                  </p>
                )}
                <p><b>Rol: </b> {user.admin ? "Administrador" : "Usuario"}</p>
                <p><b>Departamento: </b>{user.department}</p>
              </div>
              <div className="botonesAdmin">
                <BotonEliminar
                  onDelete={() => onDelete(user.id)}
                  itemType="usuario"
                  itemName={user.name}
                  className="btn btnEliminar"
                />
                <BotonEditar 
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