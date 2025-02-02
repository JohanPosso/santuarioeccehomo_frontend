import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="sec-page">
      <div className="container-fluid">
        <div className="page-block">
          <div className="text-center">
            <h2 className="brown fw-700 mb-24">
              4<span className="dark-gray">0</span>4
            </h2>
            <h4 className="dark-gray fw-700 mb-16">
              {" "}
              <span className="brown">¡Ups! </span> Algo salió mal
            </h4>
            <p className="light-gray mb-32">
              La página que buscas no se encuentra. Es posible que haya sido
              eliminada o que la URL sea incorrecta.
            </p>
            <Link to="/" className="cus-btn">
              <span className="btn-text">Volver a la página principal</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
