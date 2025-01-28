// src/components/Gallery.js
import React from "react";

const Gallery = () => (
  <section className="gallery py-80">
    <div className="container-fluid">
      <h2 className="medium-black fw-700 heading mb-16">Church Gallery</h2>
      <div className="row row-gap-4">
        <div className="col-xl-3 col-md-6">
          <div className="img-gallery">
            <img
              src="/src/assets/media/gallery/gallery-1.png"
              alt="Gallery 1"
            />
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="img-gallery">
            <img
              src="/src/assets/media/gallery/gallery-2.png"
              alt="Gallery 2"
            />
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="img-gallery">
            <img
              src="/src/assets/media/gallery/gallery-3.png"
              alt="Gallery 3"
            />
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="img-gallery">
            <img
              src="/src/assets/media/gallery/gallery-4.png"
              alt="Gallery 4"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Gallery;
