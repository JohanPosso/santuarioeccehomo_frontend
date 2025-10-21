import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Calendar, User, ArrowLeft, BookOpen, Clock } from "lucide-react";

const BlogDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    
    axios.get(`${API}/findblog/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener el blog:", error);
        setLoading(false);
      });

    axios.get(`${API}/findblog`)
      .then((response) => {
        setLatestBlogs(response.data.reverse().filter(b => b.id !== parseInt(id)).slice(0, 5));
      })
      .catch((error) => {
        console.error("Error al obtener los últimos blogs:", error);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Artículo no encontrado</p>
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Volver a blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero con imagen de portada */}
      <section className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
        <div className="absolute inset-0">
          <img
            src={blog.image}
            alt={blog.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full pb-12 sm:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <button
                onClick={() => navigate("/blogs")}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors mb-6"
              >
                <ArrowLeft size={18} />
                Volver a Blogs
              </button>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {blog.name}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>{blog.link || "Autor"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{blog.date || new Date().toLocaleDateString('es-ES')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Artículo principal */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 lg:p-12"
              >
                <article className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {blog.description}
                  </div>
                  {blog.content && (
                    <div className="mt-8 text-gray-700 leading-relaxed whitespace-pre-line">
                      {blog.content}
                    </div>
                  )}
                </article>

                {/* Separador */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-gray-600">
                    <BookOpen size={20} />
                    <span className="text-sm">Publicado por {blog.link || "Santuario Ecce Homo"}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Artículos recientes */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-4"
              >
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Clock size={20} className="text-amber-500" />
                    Artículos Recientes
                  </h3>
                  
                  {latestBlogs.length > 0 ? (
                    <div className="space-y-4">
                      {latestBlogs.map((item) => (
                        <a
                          key={item.id}
                          href={`/blog-detalle/${item.id}`}
                          className="group block"
                        >
                          <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {item.date || new Date().toLocaleDateString('es-ES')}
                              </p>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No hay artículos recientes disponibles.</p>
                  )}

                  <button
                    onClick={() => navigate("/blogs")}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all"
                  >
                    Ver Todos los Artículos
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetalle;
