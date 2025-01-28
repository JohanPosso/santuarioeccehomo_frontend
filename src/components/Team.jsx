// Team.js
import React from "react";

const Team = () => {
  return (
    <section className="areas py-80">
      <div className="container-fluid">
        <h2 className="medium-black fw-700 heading mb-16">Servicios</h2>
        <p className="light-gray heading mb-48">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
          <br />
          incididunt ut labore et dolore magna. adipiscing enim ad minim veniam.
        </p>
        <div className="row row-gap-4">
          {/* Primer bloque */}
          <div className="col-xl-3 col-md-6">
            <div className="area-img mb-12">
              <a href="ministry.html">
                <img src="/src/assets/media/areas/area-1.png" alt="area" />
              </a>
              <div className="img-bibble mb-12">
                <img src="/src/assets/media/user/bible.png" alt="pic" />
              </div>
            </div>
            <div className="text-block">
              <h5 className="medium-black heading fw-700 mb-12">Eucaristía </h5>
              <p className="light-gray fw-400 light-gray heading mb-48">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>
            <div className="img-user text-center mx-0">
              <img src="/src/assets/media/user/christan.png" alt="img" />
            </div>
          </div>

          {/* Segundo bloque */}
          <div className="col-xl-3 col-md-6">
            <div className="area-img mb-12">
              <a href="ministry.html">
                <img src="/src/assets/media/areas/area-2.png" alt="area" />
              </a>
              <div className="img-bibble mb-12">
                <img src="/src/assets/media/user/pray.png" alt="pic" />
              </div>
            </div>
            <div className="text-block">
              <h5 className="medium-black heading fw-700 mb-12">
                Confesiones{" "}
              </h5>
              <p className="light-gray fw-400 light-gray heading mb-48">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>
            <div className="img-user text-center mx-0">
              <img src="/src/assets/media/user/christan.png" alt="img" />
            </div>
          </div>

          {/* Tercer bloque */}
          <div className="col-xl-3 col-md-6">
            <div className="area-img mb-12">
              <a href="ministry.html">
                <img src="/src/assets/media/areas/area-3.png" alt="area" />
              </a>
              <div className="img-bibble mb-12">
                <img src="/src/assets/media/user/together.png" alt="pic" />
              </div>
            </div>
            <div className="text-block">
              <h5 className="medium-black heading fw-700 mb-12">
                Prosesiones{" "}
              </h5>
              <p className="light-gray fw-400 light-gray heading mb-48">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>
            <div className="img-user text-center mx-0">
              <img src="/src/assets/media/user/christan.png" alt="img" />
            </div>
          </div>

          {/* Cuarto bloque */}
          <div className="col-xl-3 col-md-6">
            <div className="area-img mb-12">
              <a href="ministry.html">
                <img src="/src/assets/media/areas/area-4.png" alt="area" />
              </a>
              <div className="img-bibble mb-12">
                <img src="/src/assets/media/user/justice.png" alt="pic" />
              </div>
            </div>
            <div className="text-block">
              <h5 className="medium-black heading fw-700 mb-12">Bautizo</h5>
              <p className="light-gray fw-400 light-gray heading mb-48">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna.
              </p>
            </div>
            <div className="img-user text-center mx-0">
              <img src="/src/assets/media/user/christan.png" alt="img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
