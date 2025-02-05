import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import axios from "axios"; // Usar axios en lugar de fetch

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // Inicializar el hook useNavigate
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Hacer la solicitud a la API con axios
    axios
      .get(`${API}/findblog`)
      .then((response) => {
        setBlogs(response.data.reverse()); // Guardar los blogs en el estado
      })
      .catch((error) => {
        console.error("Error al obtener los blogs:", error); // Manejo de errores
      });
  }, []);

  const handleReadMore = (id) => {
    // Redirigir al detalle del blog
    navigate(`/blog-detalle/${id}`);
  };

  return (
    <section className="blog py-80">
      <div className="container-fluid">
        <h2 className="medium-black fw-700 heading mb-16">
          Historias y artículos
        </h2>
        <p className="light-gray heading mb-48">
          Descubre relatos inspiradores y reflexiones sobre la fe, la comunidad
          y la vida en nuestro santuario. Encuentra enseñanzas que fortalecen el
          espíritu y testimonios que iluminan el camino.
        </p>
        <div className="row row-gap-4 justify-content-center">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                style={{ overflow: "auto" }}
                className="col-xl-4 col-lg-6 col-md-6"
              >
                <div className="blog-image">
                  <img
                    src={`${API}/image/${blog.image}`}
                    alt={blog.name}
                    onClick={() => handleReadMore(blog.id)} // Llamar la función handleReadMore
                  />
                </div>
                <div className="text-block">
                  <div className="d-flex gap-12 align-items-center mb-8">
                    <p className="light-gray fw-400">
                      Creador por: {blog.link}
                    </p>

                    <p className="light-gray fw-400">
                      {new Date(blog.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <h6 className="medium-black fw-700 mb-16">{blog.name}</h6>
                  <p className="light-gray mb-24">{blog.description}</p>
                  <div className="d-flex gap-8 align-items-center">
                    <button
                      className="btn btn-outline-info"
                      onClick={() => handleReadMore(blog.id)} // Llamar la función handleReadMore
                    >
                      Leer más
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
            <p>No hay blogs disponibles.</p> // Mensaje si no hay blogs
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
