import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Calendar, User, ArrowRight, BookOpen, Sparkles } from "lucide-react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/findblog`)
      .then((res) => setBlogs(res.data.reverse()))
      .catch((err) => console.error(err));
  }, []);

  if (!blogs.length) return null;

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full mb-4">
            <BookOpen size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">Nuestro Blog</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
            Historias y Reflexiones
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Artículos que inspiran, testimonios que edifican y enseñanzas que transforman
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogs.slice(0, 3).map((blog, i) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onClick={() => navigate(`/blog-detalle/${blog.id}`)}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-transparent transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-gray-900">Artículo</span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                {/* Meta info */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span className="truncate max-w-[100px]">{blog.link}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                  {blog.name}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {blog.description}
                </p>

                <button className="inline-flex items-center gap-2 text-gray-900 font-semibold text-sm group-hover:gap-3 transition-all">
                  Leer más
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {blogs.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center mt-10 lg:mt-12"
          >
            <button
              onClick={() => navigate("/blogs")}
              className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              Ver Todos los Artículos
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
