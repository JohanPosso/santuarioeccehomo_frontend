import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Heart, Users, BookOpen, ArrowRight, Sparkles } from "lucide-react";

const About = () => {
  const [data, setData] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/find-data`)
      .then((res) => setData(res.data[0]))
      .catch((err) => console.error(err));
  }, []);

  const features = [
    {
      icon: Heart,
      title: "Amor y Servicio",
      description: "Dedicados a servir con compasión y amor cristiano a toda nuestra comunidad",
      gradient: "from-rose-400 to-pink-500"
    },
    {
      icon: Users,
      title: "Comunidad Unida",
      description: "Somos una familia en la fe que comparte, ora y crece junta en Cristo",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: BookOpen,
      title: "Palabra de Dios",
      description: "Fundamentados en las Sagradas Escrituras y la enseñanza de la Iglesia",
      gradient: "from-amber-400 to-orange-500"
    }
  ];

  if (!data) return null;

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full mb-4">
            <Sparkles size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">Sobre Nosotros</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
              {data.seccion_2titulo}
            </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {data.seccion_2descripcion}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:-translate-y-2"
            >
              {/* Gradiente de fondo en hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              
              {/* Icono */}
              <div className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                <feature.icon className="text-white" size={28} />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 relative">
                {feature.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed relative">
                {feature.description}
              </p>

              {/* Línea decorativa */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`} />
            </motion.div>
          ))}
        </div>

        {/* Imagen + Valores */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-12 lg:mt-20">
          
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={data.imagen_sec2}
                alt="Sobre nosotros"
                className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover"
              />
              
              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/10 via-transparent to-blue-600/10" />
            </div>

            {/* Decoración esquina */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-l-4 border-t-4 border-amber-400 rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-r-4 border-b-4 border-amber-400 rounded-br-2xl" />
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-6" />
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Nuestros Valores y Misión
              </h3>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                "Servicio con amor y dedicación a la comunidad",
                "Oración y vida espiritual activa diaria",
                "Comunidad acogedora e inclusiva para todos",
                "Compromiso firme con los más necesitados"
              ].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-200 transition-colors">
                    <div className="w-2 h-2 bg-amber-600 rounded-full" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{value}</span>
                </motion.div>
              ))}
            </div>

            <Link
              to="/sobre-nosotros"
              className="group inline-flex items-center gap-2 text-gray-900 font-semibold hover:text-amber-600 transition-all"
            >
              Conoce nuestra historia completa
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
