import "./Registrar.css";
import Titles from "../../components/titles/Titles";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEnvelope,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { URL } from "../../config/env.config";

const Register = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const URL_USERS = `${URL}/users`;

      // Prepara los datos para enviar
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        birthDate: formData.birthDate,
        department: formData.department,
        admin: false,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(URL_USERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      const data = await response.json();
      console.log("Usuario registrado:", data);

      // Mostrar mensaje de Exito
      setEnviado(true);

      // Limpiar el formulario
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        department: "",
      });

      setTimeout(() => {
        setEnviado(false);
      }, 3000);
    } catch (err) {
      setError(err.message || "Ocurrió un error durante el registro");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section-register">
        <div className="form-box">
          <div className="title-register">
            <Titles titulo="Registrarse" />
          </div>

          {enviado && (
            <div className="mensaje-exito">
              ¡Registro exitoso! Tu cuenta ha sido creada.
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="input-box">
              <FontAwesomeIcon className="icons-register" icon={faUser} />
              <input
                className="input-group"
                type="text"
                name="name"
                id="name"
                minLength="3"
                maxLength="35"
                pattern="^[a-zA-Z ]+$"
                required
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
              <label className="label-group" htmlFor="name">
                Nombre Completo
              </label>
            </div>
            <div className="input-box">
              <FontAwesomeIcon className="icons-register" icon={faEnvelope} />
              <input
                className="input-group"
                type="email"
                name="email"
                id="mail"
                pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <label className="label-group" htmlFor="mail">
                Correo Electronico
              </label>
            </div>
            <div className="input-box">
              <FontAwesomeIcon className="icons-register" icon={faLock} />
              <input
                className="input-group"
                type="password"
                name="password"
                id="password"
                required
                minLength="8"
                maxLength="16"
                pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$"
                value={formData.password}
                onChange={handleChange}
              />
              <label className="label-group" htmlFor="password">
                Contraseña
              </label>
            </div>
            <div className="input-box">
              <FontAwesomeIcon className="icons-register" icon={faLock} />
              <input
                className="input-group"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                minLength="8"
                maxLength="16"
                pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label className="label-group" htmlFor="confirmPassword">
                Repetir Contraseña
              </label>
            </div>
            <div className="input-box">
              <FontAwesomeIcon className="icons-register" icon={faCalendar} />
              <input
                className="input-group"
                type="date"
                name="birthDate"
                id="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
              <label className="label-group" htmlFor="birthDate">
                Fecha Nacimiento
              </label>
            </div>
            <div className="input-box-departamento">
              <select
                id="department"
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Selecciona tu departamento</option>
                <option value="artigas">Artigas</option>
                <option value="canelones">Canelones</option>
                <option value="cerro-largo">Cerro Largo</option>
                <option value="colonia">Colonia</option>
                <option value="durazno">Durazno</option>
                <option value="flores">Flores</option>
                <option value="florida">Florida</option>
                <option value="lavalleja">Lavalleja</option>
                <option value="maldonado">Maldonado</option>
                <option value="montevideo">Montevideo</option>
                <option value="paysandu">Paysandú</option>
                <option value="rio-negro">Río Negro</option>
                <option value="rivera">Rivera</option>
                <option value="rocha">Rocha</option>
                <option value="salto">Salto</option>
                <option value="san-jose">San José</option>
                <option value="soriano">Soriano</option>
                <option value="tacuarembo">Tacuarembó</option>
                <option value="treinta-y-tres">Treinta y Tres</option>
              </select>
              <label className="label-group" htmlFor="department"></label>
            </div>

            <button className="btn-register" type="submit" disabled={loading}>
              {loading ? "Procesando..." : "Registrar"}
            </button>
            
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
