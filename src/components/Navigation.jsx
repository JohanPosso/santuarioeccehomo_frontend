import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Navigation = () => {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/find-data`);
        const data = await response.json();
        if (data.length > 0) {
          setLogo(data[0].logo);
        }
      } catch (error) {
        console.error("Error al obtener el logo:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className="navigation d-flex align-items-center justify-content-between">
      <Link to="/">
        {logo ? (
          <img
            src={`${API}/image/${logo}`}
            alt="logo"
            className="header-logo"
          />
        ) : (
          <span>No hay logo disponible</span>
        )}
      </Link>
      <div className="menu-button-right">
        <div className="main-menu__nav">
          <ul className="main-menu__list">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/sobre-nosotros">Sobre nosotros</Link>
            </li>
            <li className="dropdown">
              <Link to="/servicios">Servicios</Link>
            </li>
            <li className="dropdown">
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/contacto">Contactenos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
