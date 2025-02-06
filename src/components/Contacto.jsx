import { React, useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const Contacto = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/find-data`)
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);
  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Contactatenos</h1>
        </div>
      </section>
      <section className="contact py-80">
        <div className="container-fluid">
          <h2 className="medium-black fw-700 heading mb-16">
            Tienes alguna pregunta? Contactanos!
          </h2>
          <p className="light-gray heading fw-400 mb-64">
            Lorem ipsum dolor sit amet consectetur. Aliquet in faucibus
            adipiscing id scelerisque gravida. Ultricies duis elit pellentesque
            rhoncus hac sed ipsum viverra vel.{" "}
          </p>
          <div className="row row-gap-4 align-items-center">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="d-flex gap-16 align-items-center">
                <div className="contact-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_29656_2887)">
                      <path
                        d="M30.4616 5.51562H3.53711C1.9508 5.51562 0.666016 6.80838 0.666016 8.38672V25.6133C0.666016 27.201 1.96024 28.4844 3.53711 28.4844H30.4616C32.0346 28.4844 33.3327 27.2064 33.3327 25.6133V8.38672C33.3327 6.81119 32.053 5.51562 30.4616 5.51562ZM30.0595 7.42969C29.4729 8.01316 19.3781 18.0548 19.0295 18.4015C18.4872 18.9439 17.7663 19.2425 16.9993 19.2425C16.2324 19.2425 15.5115 18.9438 14.9674 18.3998C14.733 18.1666 4.74954 8.23576 3.93919 7.42969H30.0595ZM2.58008 25.2237V8.77751L10.8513 17.0051L2.58008 25.2237ZM3.9404 26.5703L12.2083 18.355L13.6157 19.755C14.5196 20.6588 15.7212 21.1565 16.9993 21.1565C18.2775 21.1565 19.4791 20.6588 20.3812 19.7568L21.7904 18.355L30.0583 26.5703H3.9404ZM31.4186 25.2237L23.1474 17.0051L31.4186 8.77751V25.2237Z"
                        fill="#FAFAFA"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_29656_2887">
                        <rect
                          width="32.6667"
                          height="32.6667"
                          fill="white"
                          transform="translate(0.666016 0.666748)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h6 className="dark-gray fw-600 mb-6">Contactatenos</h6>
                  <p className="fw-400 mb-6 light-gray">
                    Escribenos a WhatsApp:{" "}
                    <span className="brown fw-700">
                      <a href="tel:+573148910151">{data?.numero}</a>
                    </span>
                  </p>
                  <p className="light-gray">Email: {data.correo}</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="d-flex gap-16 align-items-center">
                <a href={data?.facebook}>
                  <span
                    style={{ fontSize: 60 }}
                    className="pi pi-facebook"
                  ></span>
                </a>
                <a href={data?.instagram}>
                  <span
                    style={{ fontSize: 60 }}
                    className="pi pi-instagram"
                  ></span>
                </a>
                <a href={data?.twitter}>
                  <span
                    style={{ fontSize: 60 }}
                    className="pi pi-twitter"
                  ></span>
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="d-flex gap-16 align-items-center">
                <div className="contact-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="34"
                    viewBox="0 0 33 34"
                    fill="none"
                  >
                    <g clipath="url(#clip0_29656_2901)">
                      <path
                        d="M15.5377 32.9072C15.7152 33.1735 16.014 33.3334 16.334 33.3334C16.654 33.3334 16.9528 33.1735 17.1303 32.9072C19.3952 29.5099 22.7312 25.3143 25.0559 21.0471C26.9147 17.6352 27.8184 14.7253 27.8184 12.1511C27.8184 5.81864 22.6665 0.666748 16.334 0.666748C10.0015 0.666748 4.84961 5.81864 4.84961 12.1511C4.84961 14.7253 5.75324 17.6352 7.61205 21.0471C9.93502 25.311 13.2774 29.517 15.5377 32.9072ZM16.334 2.58081C21.6111 2.58081 25.9043 6.87405 25.9043 12.1511C25.9043 14.3972 25.077 17.0076 23.3751 20.1314C21.3713 23.8096 18.5118 27.5406 16.334 30.6773C14.1565 27.5411 11.2968 23.8097 9.29285 20.1314C7.59099 17.0076 6.76367 14.3972 6.76367 12.1511C6.76367 6.87405 11.0569 2.58081 16.334 2.58081Z"
                        fill="#FAFAFA"
                      ></path>
                      <path
                        d="M16.334 17.8933C19.5002 17.8933 22.0762 15.3174 22.0762 12.1511C22.0762 8.98488 19.5002 6.40894 16.334 6.40894C13.1677 6.40894 10.5918 8.98488 10.5918 12.1511C10.5918 15.3174 13.1677 17.8933 16.334 17.8933ZM16.334 8.323C18.4448 8.323 20.1621 10.0403 20.1621 12.1511C20.1621 14.262 18.4448 15.9792 16.334 15.9792C14.2232 15.9792 12.5059 14.262 12.5059 12.1511C12.5059 10.0403 14.2232 8.323 16.334 8.323Z"
                        fill="#FAFAFA"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_29656_2901">
                        <rect
                          width="32.6667"
                          height="32.6667"
                          fill="white"
                          transform="translate(0 0.666748)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h6 className="dark-gray fw-600 mb-6">Nuestra ubicacion</h6>
                  <p className="fw-400 mb-6 light-gray">{data.ubicacion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aqui empieza el mapa */}
      <div className="map pb-80">
        <div className="container-fluid">
          <div className="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31786.138708365183!2d-76.66758368581627!3d5.2206333952464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4813a598c8cd43%3A0xef9cea42eb2c7120!2sSantuario%20del%20Ecce%20Homo!5e0!3m2!1ses-419!2sco!4v1737997465305!5m2!1ses-419!2sco"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      {/* Aqui termina el mapa */}
      <section className="contact-sec pb-80">
        <div className="container-fluid">
          <div className="row row-gap-4">
            <div className="col-xl-6">
              <div className="img-contact">
                <img src="/media/pages/contact.png" alt="contct" />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="contact-block">
                <h4 className="fw-700 brown mb-12">Tiene alguna pregunta?</h4>
                <p className="light-gray mb-32">
                  No dude en ponerse en contacto con nosotros mediante el
                  formulario de contacto que aparece a continuación. Nos
                  encantaría saber de usted.
                </p>
                <form method="post" className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-block mb-24">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          required=""
                          placeholder="Nombre"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-block mb-24">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          required=""
                          placeholder="Correo"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-block mb-32">
                        <textarea
                          name="message"
                          rows="8"
                          cols="8"
                          id="comments"
                          className="form-control form-control-2"
                          placeholder="Tu mensaje"
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <button type="submit" className="cus-btn">
                        <span>Enviar</span>
                      </button>
                    </div>
                    <div id="message" className="alert-msg"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
