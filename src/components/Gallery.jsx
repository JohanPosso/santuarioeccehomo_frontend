// src/components/Gallery.js
import React from "react";

const Gallery = () => (
  <div>
    <section className="title-banner">
      <div className="container-fluid">
        <h1 className="white fw-700 text-center">Galeria de fotos</h1>
      </div>
    </section>

    <section className="gallery py-80">
      <div className="container-fluid">
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
  </div>
);

export default Gallery;
