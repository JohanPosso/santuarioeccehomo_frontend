// Navigation.js
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation d-flex align-items-center justify-content-between">
      <Link to="/">
        <img src="/logo_santo.png" alt="logo" className="header-logo" />
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
