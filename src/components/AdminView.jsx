import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const AdminEndpoints = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Elimina la sesión
    setUser(null); // Actualiza el estado
    setTimeout(() => {
      window.location.reload(); // Recarga la página para reflejar el cambio
    }, 300);
  };

  const endpoints = [
    {
      title: "Gestionar Usuarios",
      description: "Administra usuarios.",
      route: "/usuarios-view",
      icon: "pi pi-users",
    },
    {
      title: "Información General",
      description: "Administra información.",
      route: "/informacion-view",
      icon: "pi pi-info-circle",
    },
    {
      title: "Gestionar Servicios",
      description: "Administra servicios.",
      route: "/servicios-view",
      icon: "pi pi-cog",
    },
    {
      title: "Gestionar Blog",
      description: "Administra blog.",
      route: "/blog-view",
      icon: "pi pi-book",
    },
  ];

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">
            Bienvenido,{" "}
            {user ? `${user.name} ${user.lastname}` : "Administrador"}
          </h1>
        </div>
      </section>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Button
          label="Cerrar Sesión"
          icon="pi pi-sign-out"
          className="p-button-danger"
          onClick={handleLogout}
        />
      </div>

      <div
        className="admin-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {endpoints.map((endpoint, index) => (
          <Card
            key={index}
            className="endpoint-card grid-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <div className="card-content">
              <i
                className={`${endpoint.icon} icon-style`}
                style={{ fontSize: "2rem", marginBottom: "10px" }}
              />
              <h3>{endpoint.title}</h3>
              <p>{endpoint.description}</p>
              <Button
                label="Ir"
                icon="pi pi-arrow-right"
                className="p-button-outlined p-button-rounded"
                onClick={() => handleNavigate(endpoint.route)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEndpoints;
