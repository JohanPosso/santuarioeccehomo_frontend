import React from "react";

const Events = () => (
  <section className="events py-80">
    <div className="container-fluid">
      <div className="row justify-content-center">
        {/* Primer bloque */}
        <div className="col-xl-4 col-md-6">
          <div className="text-center">
            <img
              src="/src/assets/media/services/services-1.png"
              alt="service"
              className="mb-24"
            />
            <h4 className="fw-700 medium-black mb-12">Retiro Espiritual</h4>
            <p className="light-gray">
              Vive una experiencia de paz y reflexión en nuestros retiros
              espirituales. Encuentra un espacio de oración y renovación para
              fortalecer tu relación con Dios.
            </p>
          </div>
        </div>

        {/* Segundo bloque */}
        <div className="col-xl-4 col-md-6">
          <div className="text-center">
            <img
              src="/src/assets/media/services/iglesia_bg.png"
              alt="service"
              className="mb-24"
            />
            <h4 className="fw-700 medium-black mb-12">
              Confesiones y Dirección Espiritual
            </h4>
            <p className="light-gray">
              Acércate al sacramento de la reconciliación y recibe orientación
              espiritual. Nuestros sacerdotes están disponibles para escucharte
              y guiarte en tu camino de fe.
            </p>
          </div>
        </div>

        {/* Tercer bloque */}
        <div className="col-xl-4 col-md-6">
          <div className="text-center">
            <img
              src="/src/assets/media/services/services-3.png"
              alt="service"
              className="mb-24"
            />
            <h4 className="fw-700 medium-black mb-12">Obras de Caridad</h4>
            <p className="light-gray">
              Forma parte de nuestras iniciativas de ayuda a los más
              necesitados. Contribuye con donaciones, voluntariado y acciones
              solidarias para hacer la diferencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Events;
