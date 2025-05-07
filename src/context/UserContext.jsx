import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { URL } from "../config/env.config";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();

  const MySwal = Swal.mixin({
      customClass: {
        container: 'my-swal-z-index'
      }
    });

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(true);
    }

    setLoadingAuth(false);
  }, []);

  // Guardar usuario y token en localStorage cuando cambien
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [user, token]);

  async function login(data) {
    try {
      const response = await axios.post(`${URL}/login`, data);
      const { user, token } = response.data;

      setUser(user);
      setToken(token);

      MySwal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Has iniciado sesión correctamente`,
        timer: 1500,
        showConfirmButton: false,
      });

      // Navegar basado en el rol del usuario
      setTimeout(() => {
        if (user && user.admin) {
          navigate("/admin-users");
        } else {
          navigate("/");
        }
      }, 1600);

      return { success: true };
    } catch (error) {
      console.log(error);

      MySwal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text:
          error.response?.data?.message ||
          "Correo electrónico o contraseña incorrectos",
      });

      return { success: false, error };
    }
  }

  function logout() {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar la sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null);
        setToken(null);

        MySwal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      }
    });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loadingAuth,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
