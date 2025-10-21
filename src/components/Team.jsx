import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Church, BookOpen, Heart, Users, Sparkles } from "lucide-react";

const Team = () => {
  const [services, setServices] = useState([]);
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/find-servicio`)
      .then((res) => setServices(res.data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  const icons = [Church, BookOpen, Heart, Users];
  const colors = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-500"
  ];

  if (!services.length) return null;

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
            <Sparkles size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">Servicios Pastorales</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
            Al Servicio de la Fe
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Servicios dedicados a tu crecimiento espiritual y el de tu familia
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center border border-gray-100"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${colors[i]} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {service.nombre}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.descripcion}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
