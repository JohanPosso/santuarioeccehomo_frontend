import React from "react";

const ServiciosGrid = () => {
  return (
    <div>
      <section class="title-banner">
        <div class="container-fluid">
          <h1 class="white fw-700 text-center">Servicios</h1>
        </div>
      </section>

      <section class="areas py-80">
        <div class="container-fluid">
          <h2 class="medium-black fw-700 heading mb-16">
            Conozca los diferentes servicios que ofrecemos{" "}
          </h2>
          <p class="light-gray heading mb-48">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod temporincididunt ut labore et dolore magna. adipiscing enim
            ad minim veniam.
          </p>
          <div class="row row-gap-4">
            <div class="col-xl-3 col-md-6">
              <div class="area-img mb-12">
                <a href="ministry-detail.html">
                  <img src="/src/assets/media/areas/area-1.png" alt="area" />
                </a>
                <div class="img-bibble mb-12">
                  <img src="/src/assets/media/user/bible.png" alt="pic" />
                </div>
              </div>
              <div class="text-block">
                <h5 class="medium-black heading fw-700 mb-12">Eucaristía </h5>
                <p class="light-gray fw-400 light-gray heading mb-48">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
              <div class="img-user text-center mx-0">
                <img src="/src/assets/media/user/christan.png" alt="img" />
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="area-img mb-12">
                <a href="ministry-detail.html">
                  <img src="/src/assets/media/areas/area-2.png" alt="area" />
                </a>
                <div class="img-bibble mb-12">
                  <img src="/src/assets/media/user/pray.png" alt="pic" />
                </div>
              </div>
              <div class="text-block">
                <h5 class="medium-black heading fw-700 mb-12">
                  Prayer Spiritual Development
                </h5>
                <p class="light-gray fw-400 light-gray heading mb-48">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
              <div class="img-user text-center mx-0">
                <img src="/src/assets/media/user/christan.png" alt="img" />
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="area-img mb-12">
                <a href="ministry-detail.html">
                  <img src="/src/assets/media/areas/area-3.png" alt="area" />
                </a>
                <div class="img-bibble mb-12">
                  <img src="/src/assets/media/user/together.png" alt="pic" />
                </div>
              </div>
              <div class="text-block">
                <h5 class="medium-black heading fw-700 mb-12">
                  Mission and Aid Efforts
                </h5>
                <p class="light-gray fw-400 light-gray heading mb-48">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
              <div class="img-user text-center mx-0">
                <img src="/src/assets/media/user/christan.png" alt="img" />
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="area-img mb-12">
                <a href="ministry-detail.html">
                  <img src="/src/assets/media/areas/area-4.png" alt="area" />
                </a>
                <div class="img-bibble mb-12">
                  <img src="/src/assets/media/user/justice.png" alt="pic" />
                </div>
              </div>
              <div class="text-block">
                <h5 class="medium-black heading fw-700 mb-12">Bautizo</h5>
                <p class="light-gray fw-400 light-gray heading mb-48">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna.
                </p>
              </div>
              <div class="img-user text-center mx-0">
                <img src="/src/assets/media/user/christan.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiciosGrid;
