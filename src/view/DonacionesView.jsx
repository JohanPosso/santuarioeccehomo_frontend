import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FaPaypal, FaCreditCard, FaBitcoin } from "react-icons/fa";
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
            ¡Haz tu donación y apoya nuestra causa!
          </h2>
          <p className="p-text-center">
            Tu generosidad nos ayuda a seguir luchando contra la corrupción y
            promoviendo un cambio positivo en la sociedad.
          </p>
          <div className="donaciones-buttons p-d-flex p-jc-center p-ai-center p-flex-wrap">
            <Button
              label="Donar con PayPal"
              icon={<FaPaypal />}
              className="p-button-outlined p-button-raised p-button-rounded p-button-primary p-mr-3 p-mb-3"
              onClick={() => alert("Redirigiendo a PayPal")}
              aria-label="PayPal"
            />
            <Button
              label="Donar con Tarjeta"
              icon={<FaCreditCard />}
              className="p-button-outlined p-button-raised p-button-rounded p-button-secondary p-mr-3 p-mb-3"
              onClick={() => alert("Redirigiendo a formulario de tarjeta")}
              aria-label="Credit Card"
            />
            <Button
              label="Donar con Bitcoin"
              icon={<FaBitcoin />}
              className="p-button-outlined p-button-raised p-button-rounded p-button-warning p-mr-3 p-mb-3"
              onClick={() => alert("Redirigiendo a Bitcoin")}
              aria-label="Bitcoin"
            />
          </div>
          <div className="p-text-center p-mt-4">
            <span
              className="donar-tooltip"
              data-pr-tooltip="¡Tu apoyo cuenta!"
            ></span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DonacionesView;
