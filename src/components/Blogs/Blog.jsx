import React, { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/findblog")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blog data:", error));
  }, []);

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
          {blogs.map((blog) => (
            <div key={blog.id} className="col-xl-4 col-lg-6 col-md-6">
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                <div className="blog-image">
                  <img
                    src={`http://localhost:4000/image/${blog.image}`}
                    alt={blog.name}
                  />
                </div>
              </a>
              <div className="text-block">
                <div className="d-flex gap-12 align-items-center mb-8">
                  <p className="light-gray fw-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <a href={blog.link} target="_blank" rel="noopener noreferrer">
                  <h6 className="medium-black fw-700 mb-16">{blog.name}</h6>
                  <p className="light-gray mb-24">{blog.description}</p>
                  <div className="d-flex gap-8 align-items-center">
                    <p className="text">Leer más</p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
