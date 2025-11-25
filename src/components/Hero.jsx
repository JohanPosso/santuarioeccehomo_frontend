import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Heart, Mail, ArrowRight, Church } from "lucide-react";

const Hero = () => {
  const [data, setData] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/find-data`)
      .then((res) => setData(res.data[0]))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{
        backgroundImage: `url('/iglesia.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay oscuro para mejorar legibilidad del texto */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Contenido de texto */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-amber-800 rounded-full mb-6 backdrop-blur-sm"
            >
              <Church size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Bienvenido a Nuestro Santuario</span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight font-sans drop-shadow-lg">
              {data.seccion_1titulo}
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
              {data.seccion_1descripcion}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contacto"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                <Mail size={18} />
                Contáctanos
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/donaciones"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Heart size={18} />
                Hacer una Donación
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/30">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-1 drop-shadow-lg">50+</div>
                <div className="text-sm text-white/90">Años de Historia</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-1 drop-shadow-lg">1K+</div>
                <div className="text-sm text-white/90">Fieles</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-1 drop-shadow-lg">100+</div>
                <div className="text-sm text-white/90">Eventos</div>
              </div>
            </div>
          </motion.div>

          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Imagen principal */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={data.imagen_sec1}
                  alt="Santuario"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Decoraciones */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-400/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl" />

              {/* Card flotante */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-6 left-6 right-6 sm:left-8 sm:right-auto sm:w-64 bg-white rounded-2xl p-5 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Te Esperamos</div>
                    <div className="text-xs text-gray-600">Únete a nuestra comunidad</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
