import React from "react";

const ChooseUs = () => {
  return (
    <section className="why-choose-us py-80">
      <div className="container-fluid">
        <h2 className="medium-black fw-700 heading mb-16">
          Porque deberias visitarnos
        </h2>
        <p className="light-gray heading mb-48">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
          <br />
          incididunt ut labore et dolore magna. adipiscing enim ad minim veniam.
        </p>
        <div className="row row-gap-4 justify-content-center">
          <div className="col-xl-4 col-md-6">
            <div className="choose-block">
              <div className="text-center">
                <img
                  src="/src/assets/media/icons/icon.png"
                  alt="icon"
                  className="mb-24"
                />
                <h5 className="medium-black fw-700 mb-12">
                  We Values Our Students
                </h5>
                <p className="light-gray mb-24">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  adipiscing enim ad minim.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="choose-block">
              <div className="text-center">
                <img
                  src="/src/assets/media/icons/icon2.png"
                  alt="icon"
                  className="mb-24"
                />
                <h5 className="medium-black fw-700 mb-12">Flexible Timings</h5>
                <p className="light-gray mb-24">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  adipiscing enim ad minim.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="choose-block">
              <div className="text-center">
                <img
                  src="/src/assets/media/icons/icon2.png"
                  alt="icon"
                  className="mb-24"
                />
                <h5 className="medium-black fw-700 mb-12">
                  Male Female Teachers
                </h5>
                <p className="light-gray mb-24">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  adipiscing enim ad minim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
