import React from "react";

const ChooseUs = () => {
  return (
    <section className="why-choose-us py-80">
      <div className="container-fluid">
        <h2 className="medium-black fw-700 heading mb-16">
          ¿Por qué deberías visitarnos?
        </h2>
        <p className="light-gray heading mb-48">
          Nuestro santuario es un espacio de paz, oración y encuentro con Dios.
          Aquí encontrarás una comunidad acogedora, momentos de reflexión y la
          oportunidad de fortalecer tu fe en un ambiente lleno de amor y
          esperanza.
        </p>
        <div className="row row-gap-4 justify-content-center">
          <div className="col-xl-4 col-md-6">
            <div className="choose-block">
              <div className="text-center">
                <img src="/media/icons/icon.png" alt="icon" className="mb-24" />
                <h5 className="medium-black fw-700 mb-12">
                  Un Lugar de Paz y Reflexión
                </h5>
                <p className="light-gray mb-24">
                  Disfruta de un entorno tranquilo y espiritual donde puedes
                  encontrar consuelo, renovar tu espíritu y fortalecer tu fe.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="choose-block">
              <div className="text-center">
                <img
                  src="/media/icons/icon2.png"
                  alt="icon"
                  className="mb-24"
                />
                <h5 className="medium-black fw-700 mb-12">
                  Horarios Flexibles
                </h5>
                <p className="light-gray mb-24">
                  Ofrecemos diferentes horarios de misas, confesiones y momentos
                  de oración para que puedas visitarnos cuando más lo necesites.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="choose-block">
              <div className="text-center">
                <img
                  src="/media/icons/icon3.png"
                  alt="icon"
                  className="mb-24"
                />
                <h5 className="medium-black fw-700 mb-12">
                  Comunidad y Acompañamiento
                </h5>
                <p className="light-gray mb-24">
                  Contamos con un equipo de guías espirituales y voluntarios que
                  te acompañarán en tu camino de fe y crecimiento personal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
