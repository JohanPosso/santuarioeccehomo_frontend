import React from "react";

const PreguntasFrecuentes = () => {
  return (
    <div className="accordion container mb-5" id="accordionExample">
      <div className="accordion-item">
        <p className="accordion-header" style={{ fontWeight: "bold" }}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            ¿Dónde se encuentra ubicado el Santuario del Santo Ecce Homo?
          </button>
        </p>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            El santuario se encuentra ubicado en el Corregimiento Plan de
            Raspadura, Municipio Unión Panamericana, Chocó. Es un lugar de gran
            significado religioso y cultural, visitado por peregrinos de todo el
            mundo.
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <p className="accordion-header" style={{ fontWeight: "bold" }}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            ¿Cuáles son los horarios de visita y de misas?
          </button>
        </p>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            El santuario está abierto al público de Lunes - Sabado - 11:00 am
            Domingo 9:00 am, 11:00 am, 4:00 pm. Las misas se celebran en esos
            horarios.
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <p className="accordion-header" style={{ fontWeight: "bold" }}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            ¿Hay algún costo para entrar al santuario?
          </button>
        </p>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            La entrada al santuario es gratuita. Sin embargo, se aceptan
            donaciones para el mantenimiento y conservación del lugar.
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <p className="accordion-header" style={{ fontWeight: "bold" }}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            ¿Se pueden realizar eventos religiosos como bautizos o matrimonios
            en el santuario?
          </button>
        </p>
        <div
          id="collapseFour"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            Sí, el santuario ofrece la posibilidad de realizar eventos
            religiosos como bautizos, matrimonios y otras celebraciones. Para
            más información y reservas, puedes comunicarte con la administración
            del santuario.
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <p className="accordion-header" style={{ fontWeight: "bold" }}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
            ¿Existen opciones de hospedaje cerca del santuario?
          </button>
        </p>
        <div
          id="collapseFive"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            Sí, en las cercanías del santuario hay diversas opciones de
            hospedaje, incluyendo hoteles, hostales y casas de retiro. Se
            recomienda hacer reservaciones con anticipación, especialmente en
            fechas de alta afluencia de peregrinos.
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <p className="accordion-header" style={{ fontWeight: "bold" }}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSix"
            aria-expanded="false"
            aria-controls="collapseSix"
          >
            ¿El santuario cuenta con guías turísticos o recorridos especiales?
          </button>
        </p>
        <div
          id="collapseSix"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            Sí, se ofrecen recorridos guiados para grupos y visitantes
            individuales que deseen conocer más sobre la historia y el
            significado del santuario. Para más detalles, consulta en la oficina
            de información del santuario.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
