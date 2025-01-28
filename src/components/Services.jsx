// Services.js
import React from "react";

const Services = () => {
  return (
    <section className="events py-80">
      <div className="bg-image">
        <div className="row justify-content-center row-gap-3">
          {/* Primer bloque */}
          <div className="col-xl-4 col-md-6">
            <div className="text-center">
              <img
                src="/src/assets/media/services/service_2.png"
                alt="service"
                className="mb-24"
              />
              <h4 className="fw-700 white mb-12">Events Calendar</h4>
              <p className="lightest-gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                <br /> sed do eiusmod tempor incididunt ut labore et dolore
                <br /> magna. adipiscing enim ad minim veniam.
              </p>
            </div>
          </div>

          {/* Segundo bloque */}
          <div className="col-xl-4 col-md-6">
            <div className="text-center">
              <img
                src="/src/assets/media/services/service_3.png"
                alt="service"
                className="mb-24"
              />
              <h4 className="fw-700 white mb-12">Our Preachers</h4>
              <p className="lightest-gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                <br /> sed do eiusmod tempor incididunt ut labore et dolore
                <br /> magna. adipiscing enim ad minim veniam.
              </p>
            </div>
          </div>

          {/* Tercer bloque */}
          <div className="col-xl-4 col-md-6">
            <div className="text-center">
              <img
                src="/src/assets/media/services/service_4.png"
                alt="service"
                className="mb-24"
              />
              <h4 className="fw-700 white mb-12">Latest Sermons</h4>
              <p className="lightest-gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                <br /> sed do eiusmod tempor incididunt ut labore et dolore
                <br /> magna. adipiscing enim ad minim veniam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
