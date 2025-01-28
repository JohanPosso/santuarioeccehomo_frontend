// src/components/Events.js
import React from "react";

const Events = () => (
  <section className="events py-80">
    <div className="container-fluid">
      <div className="row justify-content-center">
        {/* Primer bloque */}
        <div className="col-xl-4 col-md-6">
          <div className="text-center">
            <img
              src="/src/assets/media/services/services-1.png"
              alt="service"
              className="mb-24"
            />
            <h4 className="fw-700 medium-black mb-12">Special Events</h4>
            <p className="light-gray">
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
              src="/src/assets/media/services/iglesia_bg.png"
              alt="service"
              className="mb-24"
            />
            <h4 className="fw-700 medium-black mb-12">Special Events</h4>
            <p className="light-gray">
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
              src="/src/assets/media/services/services-3.png"
              alt="service"
              className="mb-24"
            />
            <h4 className="fw-700 medium-black mb-12">Special Events</h4>
            <p className="light-gray">
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

export default Events;
