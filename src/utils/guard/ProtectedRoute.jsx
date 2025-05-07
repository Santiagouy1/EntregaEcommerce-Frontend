import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  return user?.role === "admin" ? children : <Navigate to="/" />;
};
