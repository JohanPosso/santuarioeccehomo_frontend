// Hero.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Hero = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/find-data")
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
    <section className="hero-banner">
      <div className="container-fluid">
        <div className="row align-items-center row-gap-5 justify-content-center">
          <div className="col-xl-7 col-lg-12 col-md-12">
            <div className="left-block">
              <h2 className="white mb-16">{data.seccion_1titulo}</h2>
              <p className="lightest-gray mb-32">{data.seccion_1descripcion}</p>
              <div className="d-flex gap-16 flex-wrap">
                <div className="d-flex gap-12 blocks">
                  <Link to="/contacto" className="cus-btn">
                    <span className="btn-text">Contactatenos</span>
                  </Link>
                  <a href="donation.html" className="cus-btn-2">
                    <span className="btn-text">Donaciones</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-12 col-md-9 col-sm-10">
            <div className="right-block">
              {/* Form for Donations */}
              <img style={{ width: 400 }} src="/image.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
