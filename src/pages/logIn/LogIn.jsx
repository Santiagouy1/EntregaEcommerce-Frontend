import "./LogIn.css";
import SubTitle from "../../components/titles/Subtitle";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

const LogIn = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const { login } = useAuth();

  const onSubmit = (data) => {
    login(data.email, data.password);
  };

  return (
    <div className="login-container">
      <SubTitle title={"Iniciar Sesión"} />
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group-logIn">
          <input 
            className="input-group-form-logIn" 
            type="email" 
            id="mail"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /[A-Za-z0-9._+\-']+@[A-Za-z0-9.]+\.[A-Za-z]{2,}$/,
                message: "El correo electrónico no es válido"
              }
            })}
          />
          <label className="label-group-logIn" htmlFor="mail">
            Correo Electrónico
          </label>
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="input-group-logIn">
          <input
            className="input-group-form-logIn"
            type="password"
            id="password"
            {...register("password", {
              required: "La contraseña es obligatoria"
            })}
          />
          <label className="label-group-logIn" htmlFor="password">
            Contraseña
          </label>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="logRegBtn">
          <button className="btnLogIn" type="submit">
            Iniciar Sesión
          </button>
          <button className="btnCreateAcc">
            <NavLink className="btnRegister" to={"/register"}>Crear Cuenta</NavLink>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;