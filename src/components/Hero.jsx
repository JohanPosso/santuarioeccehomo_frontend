// Hero.js
import React from "react";

const Hero = () => {
  return (
    <section className="hero-banner">
      <div className="container-fluid">
        <div className="row align-items-center row-gap-5 justify-content-center">
          <div className="col-xl-7 col-lg-12 col-md-12">
            <div className="left-block">
              <h2 className="white mb-16">
                PARROQUIA SANTUARIO JESUCRISTO DIVINO ECCE HOMO
              </h2>
              <p className="lightest-gray mb-32">
                Bienvenido a nuestro santuario, una comunidad amorosa y centrada
                en la fe, dedicada a compartir el mensaje del amor y la gracia
                de Dios...
              </p>
              <div className="d-flex gap-16 flex-wrap">
                <div className="d-flex gap-12 blocks">
                  <a href="contact.html" className="cus-btn">
                    <span className="btn-text">Contactatenos</span>
                  </a>
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
