import React, { useEffect, useState } from "react";
import axios from "axios";

const Team = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:4000/find-servicio");
        // Obtener solo los últimos 4 servicios
        setServices(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="areas py-80">
      <div className="container-fluid">
        <h2 className="medium-black fw-700 heading mb-16">Servicios</h2>
        <p className="light-gray heading mb-48">
          En nuestro santuario ofrecemos diversos servicios para acompañarte en
          tu camino de fe, desde celebraciones litúrgicas y confesiones hasta
          orientación espiritual y actividades comunitarias. Te invitamos a ser
          parte de nuestra comunidad y vivir la fe en hermandad.
        </p>
        <div className="row row-gap-4">
          {services.map((service) => (
            <div key={service.id} className="col-xl-3 col-md-6">
              <div className="area-img mb-12">
                <a href="ministry.html">
                  <img
                    src={`/src/assets/media/areas/area-${service.id}.png`}
                    alt="area"
                  />
                </a>
                <div className="img-bibble mb-12">
                  <img src="/src/assets/media/user/bible.png" alt="pic" />
                </div>
              </div>
              <div className="text-block">
                <h5 className="medium-black heading fw-700 mb-12">
                  {service.nombre}
                </h5>
                <p className="light-gray fw-400 light-gray heading mb-48">
                  {service.descripcion}
                </p>
              </div>
              <div className="img-user text-center mx-0">
                <img src="/src/assets/media/user/christan.png" alt="img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
