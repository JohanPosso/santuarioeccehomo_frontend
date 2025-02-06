// src/components/Gallery.js
import React from "react";

const Gallery = () => (
  <section className="gallery py-80">
    <div className="container-fluid">
      <h2 className="medium-black fw-700 heading mb-16">Galeria de fotos</h2>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              ¿Dónde se encuentra ubicado el Santuario del Santo Ecce Homo?
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              El santuario se encuentra ubicado en [nombre de la ubicación
              exacta]. Es un lugar de gran significado religioso y cultural,
              visitado por peregrinos de todo el mundo.
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              ¿Cuáles son los horarios de visita y de misas?
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              El santuario está abierto al público de [horario de apertura y
              cierre]. Las misas se celebran en los siguientes horarios:
              [detallar los horarios de las misas].
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              ¿Hay algún costo para entrar al santuario?
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              La entrada al santuario es [gratuita/contribución voluntaria/costo
              específico]. Sin embargo, se aceptan donaciones para el
              mantenimiento y conservación del lugar.
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              ¿Se pueden realizar eventos religiosos como bautizos o matrimonios
              en el santuario?
            </button>
          </h2>
          <div
            id="collapseFour"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              Sí, el santuario ofrece la posibilidad de realizar eventos
              religiosos como bautizos, matrimonios y otras celebraciones. Para
              más información y reservas, puedes comunicarte con la
              administración del santuario.
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              ¿Existen opciones de hospedaje cerca del santuario?
            </button>
          </h2>
          <div
            id="collapseFive"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              Sí, en las cercanías del santuario hay diversas opciones de
              hospedaje, incluyendo hoteles, hostales y casas de retiro. Se
              recomienda hacer reservaciones con anticipación, especialmente en
              fechas de alta afluencia de peregrinos.
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              ¿El santuario cuenta con guías turísticos o recorridos especiales?
            </button>
          </h2>
          <div
            id="collapseSix"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              Sí, se ofrecen recorridos guiados para grupos y visitantes
              individuales que deseen conocer más sobre la historia y el
              significado del santuario. Para más detalles, consulta en la
              oficina de información del santuario.
            </div>
          </div>
        </div>
      </div>

      <div className="row row-gap-4">
        <div className="col-xl-3 col-md-6">
          <div className="img-gallery">
            <img src="/media/gallery/gallery-1.jpg" alt="Gallery 1" />
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="img-gallery">
            <img src="/media/gallery/gallery-2.jpg" alt="Gallery 2" />
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="img-gallery">
            <img src="/media/gallery/gallery-3.jpg" alt="Gallery 3" />
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="img-gallery">
            <img src="/media/gallery/gallery-4.png" alt="Gallery 4" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Gallery;
