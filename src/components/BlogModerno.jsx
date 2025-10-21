import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

const BlogModerno = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/findblog`)
      .then((response) => {
        setBlogs(response.data.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los blogs:", error);
        setLoading(false);
      });
  }, []);

  const handleReadMore = (id) => {
    navigate(`/blog-detalle/${id}`);
  };

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-church-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-church-secondary text-sm font-medium uppercase tracking-wider">
            Blog
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">
            Historias y Artículos
          </h2>
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Reflexiones y testimonios que iluminan el camino
          </p>
        </motion.div>

        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => handleReadMore(blog.id)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <FaUser className="text-xs" />
                      <span className="truncate">{blog.link}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-xs" />
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 line-clamp-2">
                    {blog.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                    {blog.description}
                  </p>

                  <button className="inline-flex items-center gap-2 text-church-primary text-sm font-medium hover:gap-3 transition-all">
                    <span>Leer más</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No hay blogs disponibles.</p>
          </div>
        )}

        {blogs.length > 3 && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/blogs")}
              className="px-6 py-3 bg-church-primary text-white text-sm font-medium rounded hover:bg-church-accent transition-all duration-300 shadow-md"
            >
              Ver Todos los Artículos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogModerno;
