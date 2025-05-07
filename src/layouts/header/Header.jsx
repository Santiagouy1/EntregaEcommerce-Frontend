import "./Header.css";
import logo from "../../assets/images/logos/Logo-tecno-mart-white-removebg.png";
import BotonCarrito from "../../components/botonCarrito/BotonCarrito";
import AvatarUser from "../../components/avatarUser/AvatarUser";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Header = () => {

  const { user } = useUser();

  return (
    <header id="main-header">
      <input type="checkbox" id="burger" className="input-burger" />

      <label className="burger-container" htmlFor="burger">
        <div className="burger"></div>
      </label>

      <div className="logo">
        <NavLink to="/">
          <img
            className="nav-logo"
            src={logo}
            alt="Logo de Tecno Mart"
            title="Logo de Tecno Mart"
          />
        </NavLink>
      </div>

      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contacto
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              Nosotros
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Registrar
            </NavLink>
          </li>
          {/* Rutas Admin */}
          {user?.role === "admin" && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin-products">
                  Admin Productos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin-users">
                  Admin Usuarios
                </NavLink>
              </li>
            </>
          )}
          
        </ul>
      </nav>

      <div className="user-info">
        <BotonCarrito />
        <AvatarUser />
      </div>
    </header>
  );
};

export default Header;
