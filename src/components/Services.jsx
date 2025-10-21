import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Users, BookOpen, Sparkles } from "lucide-react";

const Services = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  const services = [
    {
      icon: Calendar,
      title: "Calendario de Actividades",
      description: "Participa en nuestras misas, retiros espirituales, procesiones y eventos que fortalecen la fe de nuestra comunidad.",
      image: "/banner-1.jpg",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Acompañamiento Espiritual",
      description: "Nuestros sacerdotes y guías espirituales están disponibles para acompañarte en tu camino de fe.",
      image: "/banner-2.jpg",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: BookOpen,
      title: "Reflexiones Diarias",
      description: "Accede a sermones, meditaciones y reflexiones que nutren tu alma y fortalecen tu espíritu.",
      image: "/banner-3.jpg",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
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
            <span className="text-xs font-semibold uppercase tracking-wider">Nuestros Servicios</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
            ¿Cómo Podemos Servirte?
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Descubre las diferentes formas en que podemos acompañarte en tu jornada espiritual
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Imagen con overlay */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-60 group-hover:opacity-50 transition-opacity duration-500`} />
                
                {/* Icono flotante */}
                <div className="absolute top-5 right-5 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <service.icon className="text-gray-900" size={20} />
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Línea decorativa */}
              <div className={`h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
