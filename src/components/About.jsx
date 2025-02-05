import React, { useEffect, useState } from "react";
import axios from "axios";

const About = () => {
  const [data, setData] = useState(null);
  const API = process.env.REACT_APP_API_URL;

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
            <a href="about.html" className="cus-btn">
              <span className="btn-text">More About Us</span>
            </a>
          </div>
          <div className="col-lg-6 col-md-6">
            <img
              src="/src/assets/media/services/service_1.png"
              alt="services"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
