import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

const BlogGridModerno = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/findblog`)
      .then((res) => {
        setBlogs(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <BookOpen className="mx-auto mb-6 text-amber-400" size={56} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Nuestro Blog
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Reflexiones, historias y enseñanzas que iluminan el camino espiritual
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid de Blogs */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog, i) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
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
                  </div>

                  <div className="p-5 sm:p-6">
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
                    
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 line-clamp-3">
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
          ) : (
            <div className="text-center py-20">
              <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 text-lg">No hay artículos disponibles.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogGridModerno;
