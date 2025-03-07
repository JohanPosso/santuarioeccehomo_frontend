import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const About = () => {
  const [data, setData] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/find-data`)
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="about-us py-80">
      <div className="container-fluid">
        <div className="row align-items-center row-gap-3">
          <div className="col-lg-6 col-md-6">
            <h2 className="medium-black fw-700 mb-16">
              {data.seccion_2titulo}
            </h2>
            <p className="light-gray mb-16">{data.seccion_2descripcion}</p>
            <Link to="/sobre-nosotros" className="cus-btn">
              <span className="btn-text">Sobre nosotros</span>
            </Link>
          </div>
          <div className="col-lg-6 col-md-6">
            <img src={`${data.imagen_sec2}`} alt="services" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
