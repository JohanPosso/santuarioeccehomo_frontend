import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/find-data")
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 0) {
          setData(result[0]); // Tomamos el primer objeto del array
        }
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  return (
    <footer>
      <div className="container-fluid">
        <div className="mb-48">
          <div className="row row-gap-4">
            <div className="col-xl-4">
              <a href="">
                <img
                  src="/public/logo_santo.png"
                  alt="logo"
                  className="header-logo"
                />
                <p className="lightest-gray">
                  {data ? data.seccion_1descripcion : "Cargando..."}
                </p>
              </a>
            </div>
            <div className="col-xl-4 col-md-8 col-lg-8 offset-xl-2">
              <h5 className="white fw-700 mb-24">Explora</h5>
              <ul className="footer-list list-unstyled">
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="blog-grid.html">Artículos</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="">Preguntas Frecuentes</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="contact.html">Contactos</a>
                </li>
                <li className="white mb-8">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="">Colaboraciones</a>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4">
              <h5 className="white fw-700 mb-24">Enlaces Útiles</h5>
              <ul className="footer-lists list-unstyled">
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="blog-grid.html">Artículos</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="">Preguntas Frecuentes</a>
                </li>
                <li className="mb-8 white">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <a href="contact.html">Contactos</a>
                </li>
                <li className="white mb-8">
                  <img
                    src="/src/assets/media/user/christan2.png"
                    alt="christan"
                  />
                  <Link to="/login">Iniciar sesion</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center lightest-gray fw-400">
          ©2025 Todos los derechos reservados. Desarrollado por{" "}
          <span className="brown fw-700">
            <a href="https://johanposso.com/">Johan Posso</a>
          </span>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
