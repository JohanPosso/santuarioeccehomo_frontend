import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Users, Sparkles, Church } from "lucide-react";

const PersonalSection = () => {
  const [personal, setPersonal] = useState([]);
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/find-personal`)
      .then((res) => setPersonal(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!personal.length) return null;

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-4">
            <Church size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">Nuestro Equipo Pastoral</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
            Quienes Nos Guían
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Personas dedicadas al servicio de Dios y al acompañamiento espiritual de nuestra comunidad
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {personal.map((persona, i) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Foto */}
              <div className="relative h-80 overflow-hidden bg-gray-100">
                {persona.foto ? (
                  <>
                    <img
                      src={persona.foto}
                      alt={persona.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                    <Users size={56} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 text-center relative z-10">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {persona.nombre}
                </h3>
                <p className="text-sm text-amber-600 font-semibold">
                  {persona.cargo}
                </p>
              </div>

              {/* Línea decorativa */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalSection;
