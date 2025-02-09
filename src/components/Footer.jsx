import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [data, setData] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(`${API}/find-data`)
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
                <img src={`${data?.logo}`} alt="logo" className="header-logo" />
                <p className="lightest-gray">
                  {data ? data.seccion_1descripcion : "Cargando..."}
                </p>
              </a>
            </div>
            <div className="col-xl-4 col-md-8 col-lg-8 offset-xl-2">
              <h5 className="white fw-700 mb-24">Explora</h5>
              <ul className="footer-list list-unstyled">
                <li className="mb-8 white">
                  <img src="/media/user/christan2.png" alt="christan" />
                  <Link to="/">Inicio</Link>
                </li>
                <li className="mb-8 white">
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <div className="d-flex gap-16 align-items-center">
                      <div>
                        <div className="col-xl-4 col-lg-6 col-md-6">
                          <div className="d-flex gap-16 align-items-center">
                            <a href={data?.facebook}>
                              <span
                                style={{ fontSize: 25 }}
                                className="pi pi-facebook"
                              ></span>
                            </a>
                            <a href={data?.instagram}>
                              <span
                                style={{ fontSize: 25 }}
                                className="pi pi-instagram"
                              ></span>
                            </a>
                            <a href={data?.twitter} target="_blank">
                              <span
                                style={{ fontSize: 25 }}
                                className="pi pi-twitter"
                              ></span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="mb-8 white">
                  <img src="/media/user/christan2.png" alt="christan" />
                  <Link to="/sobre-nosotros">Sobre nosotros</Link>
                </li>
                <li className="white mb-8">
                  <img src="/media/user/christan2.png" alt="christan" />
                  <Link to="/donaciones">Donaciones</Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-4">
              <h5 className="white fw-700 mb-24">Enlaces Útiles</h5>
              <ul className="footer-lists list-unstyled">
                <li className="mb-8 white">
                  <img src="/media/user/christan2.png" alt="christan" />
                  <Link to="/servicios">Servicios</Link>
                </li>
                <li className="mb-8 white">
                  <img src="/media/user/christan2.png" alt="christan" />
                  <Link to="/contacto">Contacto</Link>
                </li>
                <li className="mb-8 white">
                  <img src="/media/user/christan2.png" alt="christan" />
                  <Link to="/galeria">Galeria</Link>
                </li>
                <li className="white mb-8">
                  <img src="/media/user/christan2.png" alt="christan" />
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
