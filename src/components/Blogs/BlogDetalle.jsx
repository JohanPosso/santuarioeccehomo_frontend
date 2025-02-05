import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetalle = () => {
  const { id } = useParams(); // Obtener el id de la URL
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]); // Estado para los artículos recientes
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    // Hacer la solicitud para obtener el blog por su id
    axios
      .get(`${API}/findblog/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el blog:", error);
      });

    // Solicitar los últimos blogs (esto puede ajustarse según tu API)
    axios
      .get(`${API}/findblog`)
      .then((response) => {
        setLatestBlogs(response.data.reverse()); // Guardar los blogs en el estado
      })
      .catch((error) => {
        console.error("Error al obtener los últimos blogs:", error);
      });
  }, [id]);

  console.log("latestBlogs: ", latestBlogs); // Verifica cómo están los blogs en el estado

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Blog Detalle</h1>
        </div>
      </section>
      <section className="blog-sec py-80">
        <div className="container-fluid">
          <div className="row row-gap-4">
            <div className="col-xl-9">
              <div className="detail-section">
                <div className="detail-image mb-24">
                  <img src={`${API}/image/${blog.image}`} alt={blog.name} />
                </div>
                <h4 className="dark-gray fw-700 mb-24">{blog.name}</h4>
                <p className="dark-gray mb-32">{blog.description}</p>
                <p className="dark-gray mb-32">{blog.content}</p>
                {/* Agregar más detalles según el contenido */}
              </div>
            </div>

            {/* Sección de artículos recientes */}
            <div className="col-xl-3">
              <div className="block-3 mb-24">
                <h5 className="medium-black mb-16 fw-700">Ultimos articulos</h5>
                <div className="hr-line mb-16"></div>
                <div>
                  {latestBlogs.length > 0 ? (
                    latestBlogs.slice(0, 4).map(
                      (
                        item // Invertimos el array y luego limitamos a las primeras 4 publicaciones
                      ) => (
                        <a href={`/blog-detalle/${item.id}`} key={item.id}>
                          <div className="recent-blog mb-32">
                            <div className="d-flex gap-12">
                              <img
                                style={{
                                  width: "100px", // El ancho se ajustará al 100% del contenedor
                                  height: "100px", // Definimos una altura fija para las imágenes
                                  objectFit: "cover", // Mantiene la relación de aspecto pero corta las imágenes si es necesario
                                }}
                                src={`${API}/image/${item.image}`}
                                alt={item.name}
                                className="recent-blog-img"
                              />
                              <div className="blocks">
                                <p className="light-gray mb-8">
                                  {item.name.length > 30
                                    ? `${item.name.slice(0, 30)}...`
                                    : item.name}
                                </p>
                                <p className="subtitle dark-gray">
                                  {item.date}
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      )
                    )
                  ) : (
                    <p>No recent articles available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetalle;
