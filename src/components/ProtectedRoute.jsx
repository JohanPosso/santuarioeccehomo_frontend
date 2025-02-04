import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn, loading } = useUser();

  // Mientras se verifica el estado del usuario, puedes mostrar un loader
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no está logueado, redirige al login
  return isLoggedIn() ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
