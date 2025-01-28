import React from "react";

const MassTime = () => {
  return (
    <section className="time py-80">
      <div className="bg-time">
        <h2 className="white fw-700 mb-24">Horario de misas</h2>
        <h6 className="lightest-gray mb-16 fw-500">
          Lunes - Sabado - 11:00 am & 9:00 am
        </h6>
        <h6 className="lightest-gray mb-16 fw-500 mb-48">
          Domingo 11:00 am, 4:00 pm
        </h6>
        <h3 className="white fw-700 mb-24">Horarios de confesion:</h3>
        <h6 className="lightest-gray mb-48 fw-500">
          Miercoles - 6:00 - 7:00 pm,
          <br />
          Domingo - 10:00 - 11:00 am o mediante citas.
        </h6>
      </div>
    </section>
  );
};

export default MassTime;
