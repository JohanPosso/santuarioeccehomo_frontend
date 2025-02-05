import React from "react";

const Services = () => {
  return (
    <section className="events py-80">
      <div className="bg-image">
        <div className="row justify-content-center row-gap-3">
          {/* Primer bloque */}
          <div className="col-xl-4 col-md-6">
            <div className="text-center">
              <img
                src="/media/services/service_2.png"
                alt="Calendario de eventos"
                className="mb-24"
              />
              <h4 className="fw-700 white mb-12">Calendario de Actividades</h4>
              <p className="lightest-gray">
                Mantente informado sobre nuestras misas, encuentros, retiros
                espirituales y eventos comunitarios. Únete a nuestras
                actividades y fortalece tu fe junto a la comunidad.
              </p>
            </div>
          </div>

          {/* Segundo bloque */}
          <div className="col-xl-4 col-md-6">
            <div className="text-center">
              <img
                src="/media/services/service_3.png"
                alt="Nuestros sacerdotes"
                className="mb-24"
              />
              <h4 className="fw-700 white mb-12">Guías Espirituales</h4>
              <p className="lightest-gray">
                Nuestros sacerdotes y líderes religiosos están aquí para
                acompañarte en tu camino de fe. Recibe orientación espiritual y
                apoyo en momentos de necesidad.
              </p>
            </div>
          </div>

          {/* Tercer bloque */}
          <div className="col-xl-4 col-md-6">
            <div className="text-center">
              <img
                src="/media/services/service_4.png"
                alt="Reflexiones y sermones"
                className="mb-24"
              />
              <h4 className="fw-700 white mb-12">Reflexiones y Sermones</h4>
              <p className="lightest-gray">
                Accede a mensajes inspiradores y enseñanzas que nutren el alma.
                Escucha sermones y reflexiones para fortalecer tu relación con
                Dios y vivir la fe en el día a día.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
