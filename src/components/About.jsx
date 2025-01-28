// About.js
import React from "react";

const About = () => {
  return (
    <section className="about-us py-80">
      <div className="container-fluid">
        <div className="row align-items-center row-gap-3">
          <div className="col-lg-6 col-md-6">
            <h2 className="medium-black fw-700 mb-16">
              Nuestro viaje de fe y compañerismo{" "}
            </h2>
            <p className="light-gray mb-16">
              Bienvenido a nuestro santuario, una comunidad amorosa y centrada
              en la fe, dedicada a compartir el mensaje del amor y la gracia de
              Dios...
            </p>
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
