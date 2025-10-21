import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Church, BookOpen, Heart, Users, Sparkles } from "lucide-react";

const ServiciosGridModerno = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/find-servicio`)
      .then((res) => {
        setServicios(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const icons = [Church, BookOpen, Heart, Users];
  const colors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-500"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero */}
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
            <Church className="mx-auto mb-6 text-amber-400" size={56} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Nuestros Servicios
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Servicios pastorales dedicados al crecimiento espiritual de nuestra comunidad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid de Servicios */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="text-center mb-12 lg:mb-16">
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  En nuestro santuario ofrecemos diversos servicios para acompañarte en tu camino de fe, 
                  desde celebraciones litúrgicas y confesiones hasta orientación espiritual y actividades comunitarias.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {servicios.map((servicio, i) => {
                  const Icon = icons[i % icons.length];
                  return (
                    <motion.div
                      key={servicio.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100"
                    >
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${colors[i % colors.length]} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="text-white" size={32} />
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                        {servicio.nombre}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {servicio.descripcion}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServiciosGridModerno;
