import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const BlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  useEffect(() => {
    // Hacer la solicitud a la API
    axios
      .get("http://localhost:4000/findblog")
      .then((response) => {
        setBlogs(response.data.reverse()); // Guardar los blogs en el estado
      })
      .catch((error) => {
        console.error("Error al obtener los blogs:", error);
      });
  }, []);

  const handleReadMore = (id) => {
    // Redirigir al detalle de la publicación con el id correspondiente
    navigate(`/blog-detalle/${id}`);
  };

  return (
    <div>
      <section class="title-banner">
        <div class="container-fluid">
          <h1 class="white fw-700 text-center">Blog</h1>
        </div>
      </section>

      <section className="blog py-80">
        <div className="container-fluid">
          <h2 className="medium-black fw-700 heading mb-16">
            Historias y articulos
          </h2>
          <p className="light-gray heading mb-48">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
            <br />
            incididunt ut labore et dolore magna. adipiscing enim ad minim
            veniam.
          </p>
          <div className="row row-gap-4 justify-content-center">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className="col-xl-4 col-lg-6 col-md-6">
                  <div className="blog-image">
                    <img
                      src={`http://localhost:4000/image/${blog.image}`}
                      alt={blog.name}
                    />
                  </div>
                  <div className="text-block">
                    <div className="d-flex gap-12 align-items-center mb-8">
                      <p className="light-gray fw-400">Lana Steiner</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                      >
                        <circle cx="3" cy="3" r="3" fill="#92949F" />
                      </svg>
                      <p className="light-gray fw-400">Lana Steiner</p>
                    </div>
                    <h6 className="medium-black fw-700 mb-16">{blog.name}</h6>
                    <p className="light-gray mb-24">{blog.description}</p>
                    <div className="d-flex gap-8 align-items-center">
                      <button
                        className="btn btn-outline-info"
                        onClick={() => handleReadMore(blog.id)}
                      >
                        read more
                      </button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_31558_219)">
                          <path
                            d="M19.6222 18.1941C18.2348 15.7911 18.6278 11.2924 21.1909 9.8126M21.1909 9.8126C19.7225 10.6604 15.9226 11.7863 13.148 6.98045M21.1909 9.8126L5.97244 18.599"
                            stroke="#BF835E"
                            strokeWidth="1.84977"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_31558_219">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="translate(0 10.5) rotate(-30)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs available.</p> // Mensaje si no hay blogs
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogGrid;
