import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user, loadingAuth } = useAuth();

    if (loadingAuth) {
        return <div>Cargando...</div>; 
    }

    if (!isAuthenticated) {
        Swal.fire({
            icon: 'warning',
            title: 'Acceso denegado',
            text: 'Debes iniciar sesión para acceder a esta página'
        });
        return <Navigate to="/" replace />;
    }

    // Verificar rol si se necesita
    if (requiredRole === 'admin' && (!user || !user.admin)) {
        Swal.fire({
            icon: 'error',
            title: 'Acceso restringido',
            text: 'No tienes permisos para acceder a esta página'
        });
        return <Navigate to="/" replace />;
    }

    return children;
};