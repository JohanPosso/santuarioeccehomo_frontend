import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Clock, Church, Heart, MapPin, Sparkles } from "lucide-react";

const MassTime = () => {
  const [horarios, setHorarios] = useState([]);
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/find-horarios`)
      .then((res) => setHorarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  const misas = horarios.filter(h => h.tipo === 'misa');
  const confesiones = horarios.filter(h => h.tipo === 'confesion');

  // Horarios por defecto si no hay en BD
  const defaultMisas = [
    { dia: "Lunes - Sábado", hora: "11:00 AM", destacado: false },
    { dia: "Domingo", hora: "9:00 AM, 11:00 AM, 4:00 PM", destacado: true }
  ];

  const defaultConfesiones = [
    { dia: "Miércoles", hora: "6:00 PM - 7:00 PM" },
    { dia: "Domingo", hora: "10:00 AM - 11:00 AM" },
    { dia: "Por cita previa", hora: "Contáctanos" }
  ];

  const horariosDisplay = {
    misas: misas.length > 0 ? misas : defaultMisas,
    confesiones: confesiones.length > 0 ? confesiones : defaultConfesiones
  };

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full mb-4 border border-amber-500/30">
            <Clock size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">Horarios</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 px-4">
            Celebraciones y Servicios
          </h2>
          
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-4">
            Te esperamos para celebrar juntos la fe y encontrarnos con Dios
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Misas */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-colors duration-300"
          >
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/20">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Church size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Misas</h3>
                <p className="text-xs sm:text-sm text-white/70">Celebraciones Eucarísticas</p>
              </div>
            </div>

            <div className="space-y-4">
              {horariosDisplay.misas.map((horario, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 rounded-xl transition-all ${
                    horario.destacado 
                      ? "bg-amber-500/20 border border-amber-500/30" 
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Clock className="text-amber-400 mt-0.5 flex-shrink-0" size={18} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm sm:text-base">
                      {horario.dia}
                    </div>
                    <div className="text-sm text-white/70">
                      {horario.hora}
                    </div>
                    {horario.descripcion && (
                      <div className="text-xs text-white/60 mt-1">
                        {horario.descripcion}
                      </div>
                    )}
                  </div>
                  {horario.destacado && (
                    <span className="text-xs font-semibold text-amber-400 bg-amber-500/20 px-2 py-1 rounded-full whitespace-nowrap">
                      Popular
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Confesiones */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-colors duration-300"
          >
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/20">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Heart size={28} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Confesiones</h3>
                <p className="text-xs sm:text-sm text-white/70">Sacramento de Reconciliación</p>
              </div>
            </div>

            <div className="space-y-4">
              {horariosDisplay.confesiones.map((horario, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                >
                  <Clock className="text-purple-400 mt-0.5 flex-shrink-0" size={18} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm sm:text-base">
                      {horario.dia}
                    </div>
                    <div className="text-sm text-white/70">
                      {horario.hora}
                    </div>
                    {horario.descripcion && (
                      <div className="text-xs text-white/60 mt-1">
                        {horario.descripcion}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Nota */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 text-white/60 text-xs sm:text-sm px-4">
            <MapPin size={14} className="text-amber-400" />
            <span>Los horarios pueden variar en días festivos. Para más información, contáctanos.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MassTime;
