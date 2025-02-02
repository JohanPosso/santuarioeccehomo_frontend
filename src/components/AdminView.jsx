import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const AdminEndpoints = () => {
  const navigate = useNavigate();

  const endpoints = [
    {
      title: "Información General",
      description: "Sube y administra las fotos del sistema.",
      route: "/informacion-view",
      icon: "pi pi-images",
    },
    {
      title: "Gestionar Servicios",
      description: "Listado de todos los usuarios almacenados en el sistema.",
      route: "/servicios-view",
      icon: "pi pi-users",
    },
    {
      title: "Gestionar Blog",
      description: "Visualiza los reportes generados por el sistema.",
      route: "/blog-view",
      icon: "pi pi-book",
    },
  ];

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div>
      <section class="title-banner">
        <div class="container-fluid">
          <h1 class="white fw-700 text-center">Contactatenos</h1>
        </div>
      </section>
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
