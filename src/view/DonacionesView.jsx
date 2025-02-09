import React from "react";
import { Card } from "primereact/card";
import "./DonacionesView.css"; // Asegúrate de agregar los estilos

const DonacionesView = () => {
  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Donaciones</h1>
        </div>
      </section>

      <div className="donaciones-container">
        <Card className="donaciones-card p-shadow-8">
          <h2 className="p-text-center">
            ¡Con tu donación, ayudas a mantener el santuario!
          </h2>
          <p className="p-text-center">
            Tu generosidad nos permite seguir ofreciendo refugio y cuidado a los
            seres vivos que necesitan nuestra ayuda. Gracias por ser parte de
            esta causa noble.
          </p>

          <div className="p-grid p-nogutter">
            {/* Columna para la foto del santuario */}
            <div className="p-col-12 p-md-6">
              <img
                src="/media/services/services-1.png" // Coloca aquí la URL de la imagen del santuario
                alt="Santuario"
                className="donante-img"
                style={{ borderRadius: "8px" }}
              />
            </div>

            {/* Columna para los datos de la cuenta */}
            <div className="p-col-12 p-md-6">
              <div className="p-card p-shadow-3">
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Datos de la cuenta para donaciones
                </p>
                <p>
                  <strong>Banco:</strong> Bancolombia
                </p>
                <p>
                  <strong>Cuenta:</strong> 53600014913
                </p>
                <p>
                  <strong>Tipo de cuenta:</strong> Ahorros
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DonacionesView;
