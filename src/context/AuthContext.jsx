import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
        setUser(JSON.parse(usuarioGuardado));
        setIsAuthenticated(true);
    }
    setLoadingAuth(false); 
}, []);

  const login = async (email, password) => {
    try {
      const response = await axios.get('https://67cb832e3395520e6af589a3.mockapi.io/users');
      const usuarios = response.data;

      const usuarioEncontrado = usuarios.find(
        u => u.email === email && u.password === password
      );

      if (usuarioEncontrado) {
        localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
        setUser(usuarioEncontrado);
        setIsAuthenticated(true);

        navigate(usuarioEncontrado.admin ? "/admin-users" : "/");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: 'Correo electrónico o contraseña incorrectos'
        });
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al iniciar sesión'
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, loadingAuth }}>
        {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error('Error');
  }
  return context;
};