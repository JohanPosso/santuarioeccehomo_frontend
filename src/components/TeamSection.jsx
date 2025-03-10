import React from "react";

const TeamSection = () => {
  return (
    <section className="team py-80">
      <div className="container-fluid">
        <h2 className="medium-black fw-700 heading mb-16">Nuestro Personal</h2>
        <p className="light-gray heading mb-48">
          Conoce a quienes guían nuestra comunidad con fe y compromiso. Nuestros
          líderes están dedicados a servir, inspirar y acompañar a cada miembro
          en su camino espiritual.
        </p>
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          className="row row-gap-4"
        >
          {[
            {
              id: 1,
              imgSrc: "/secretaria-santuario.jpg",
              name: "Surley Mosquera",
              role: "Secretaria parroquial",
            },
            {
              id: 2,
              imgSrc: "/parroco2.jpg",
              name: "Marlon Andres Ventura",
              role: "Párroco",
            },
          ].map((leader) => (
            <div key={leader.id} className="col-xl-3 col-lg-6 col-md-6">
              <div className="team-img mb-24" style={{ textAlign: "center" }}>
                <img
                  src={leader.imgSrc}
                  alt="team"
                  style={{
                    width: "200px", // Tamaño fijo
                    height: "200px", // Tamaño fijo
                    objectFit: "cover", // Asegura que la imagen se ajuste bien sin distorsión
                    borderRadius: "50%", // Hace que las imágenes sean circulares
                  }}
                />
              </div>
              <div className="d-flex gap-24 align-items-center">
                <div className="team-links">
                  <img
                    style={{ width: 50 }}
                    src="/media/icons/icon2.png"
                    alt=""
                  />
                </div>

                <div>
                  <h6 className="medium-black fw-700 mb-6">{leader.name}</h6>
                  <p className="light-gray">{leader.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
