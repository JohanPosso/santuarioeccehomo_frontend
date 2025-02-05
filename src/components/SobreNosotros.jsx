import React, { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const SobreNosotros = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/find-data`)
      .then((response) => {
        setData(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Sobre nosotros</h1>
        </div>
      </section>

      <section className="tabs-sec py-80">
        <div className="container-fluid">
          <p style={{ fontSize: 18 }} className="d-flex justify-content-center">
            {data.sobrenosotros}
          </p>
          <br />
          <div className="services-tabs mb-48 d-flex justify-content-center">
            <ul
              className="nav unstyled nav-pills d-flex"
              id="pills-all"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-vision-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-vision"
                  type="button"
                  role="tab"
                  aria-controls="pills-vision"
                  aria-selected="true"
                >
                  Vision
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-mission-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-mission"
                  type="button"
                  role="tab"
                  aria-controls="pills-mission"
                  aria-selected="false"
                >
                  Mision
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-resena-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-resena"
                  type="button"
                  role="tab"
                  aria-controls="pills-resena"
                  aria-selected="false"
                >
                  Reseña
                </button>
              </li>
            </ul>
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-vision"
              role="tabpanel"
              aria-labelledby="pills-vision-tab"
            >
              <div className="row row-gap-4 align-items-center">
                <div className="col-lg-6 col-md-6">
                  <h2 className="medium-black fw-700 mb-16">Nuestra vision</h2>
                  <p style={{ fontSize: 16 }} className=" mb-16">
                    {data.vision}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-mission"
              role="tabpanel"
              aria-labelledby="pills-mission-tab"
            >
              <div className="row row-gap-4 align-items-center">
                <div className="col-lg-6 col-md-6">
                  <h2 className="medium-black fw-700 mb-16">Nuestra mision</h2>
                  <p style={{ fontSize: 16 }} className=" mb-16">
                    {data.mision}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-resena"
              role="tabpanel"
              aria-labelledby="pills-resena-tab"
            >
              <div className="row row-gap-4 align-items-center">
                <div className="col-lg-6 col-md-6">
                  <h2 className="medium-black fw-700 mb-16">
                    Reseña historica
                  </h2>
                  <p style={{ fontSize: 16 }} className=" mb-16">
                    {data.resena}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;
