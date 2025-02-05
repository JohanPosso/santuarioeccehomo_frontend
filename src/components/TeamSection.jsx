import React from "react";

const TeamSection = () => {
  return (
    <section className="team py-80">
      <div className="container-fluid">
        <h2 className="medium-black fw-700 heading mb-16">Nuestros Líderes</h2>
        <p className="light-gray heading mb-48">
          Conoce a quienes guían nuestra comunidad con fe y compromiso. Nuestros
          líderes están dedicados a servir, inspirar y acompañar a cada miembro
          en su camino espiritual.
        </p>
        <div className="row row-gap-4">
          {[
            {
              id: 1,
              imgSrc: "/media/team/team-1.png",
              name: "Jorge Ernesto Zapata",
              role: "Parroco",
            },
            {
              id: 2,
              imgSrc: "/media/team/team-2.png",
              name: "Lewis",
              role: "Secretario parroquial",
            },
            {
              id: 3,
              imgSrc: "/media/team/team-3.png",
              name: "Bernigson",
              role: "Auxiliar de servicios del templo",
            },
            {
              id: 4,
              imgSrc: "/media/team/team-4.png",
              name: "Johan",
              role: "Auxiliar de servicios casa rural",
            },
          ].map((leader) => (
            <div key={leader.id} className="col-xl-3 col-lg-6 col-md-6">
              <div className="team-img mb-24">
                <img src={leader.imgSrc} alt="team" />
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
