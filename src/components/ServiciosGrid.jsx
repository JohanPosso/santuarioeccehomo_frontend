import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiciosGrid = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchServicios = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API}/find-servicio`);
        setServicios(response.data); // Guardamos los datos en el estado
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    };

    fetchServicios(); // Llamada a la función para obtener los servicios
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Servicios</h1>
        </div>
      </section>

      <section className="areas py-80">
        <div className="container-fluid">
          <h2 className="medium-black fw-700 heading mb-16">
            Conozca los diferentes servicios que ofrecemos
          </h2>
          <p className="light-gray heading mb-48">
            En nuestro santuario ofrecemos diversos servicios para acompañarte
            en tu camino de fe, desde celebraciones litúrgicas y confesiones
            hasta orientación espiritual y actividades comunitarias. Te
            invitamos a ser parte de nuestra comunidad y vivir la fe en
            hermandad.
          </p>

          <div style={{ marginTop: "110px", gap: "5rem" }} className="row  ">
            {servicios.map((servicio) => (
              <div key={servicio.id} className="col-xl-3 col-md-6">
                <div className="area-img mb-12">
                  <div className="img-bibble mb-12">
                    <img src="/media/user/bible.png" alt="pic" />
                  </div>
                </div>
                <div className="text-block">
                  <h5 className="medium-black heading fw-700 mb-12">
                    {servicio.nombre}
                  </h5>
                  <p className="light-gray fw-400 light-gray heading mb-48">
                    {servicio.descripcion}
                  </p>
                </div>
                <div className="img-user text-center mx-0">
                  <img src="/media/user/christan.png" alt="img" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiciosGrid;
