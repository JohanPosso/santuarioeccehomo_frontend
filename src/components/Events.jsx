import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Church, HandHeart, Sparkles, ArrowRight } from "lucide-react";

const Events = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  const events = [
    {
      icon: Heart,
      title: "Retiro Espiritual",
      description: "Experiencias de paz, reflexión y renovación espiritual. Espacios de oración para fortalecer tu fe.",
      image: "/media/services/services-1.png",
      color: "bg-rose-500"
    },
    {
      icon: Church,
      title: "Confesiones y Dirección",
      description: "Sacramento de reconciliación y orientación espiritual con nuestros sacerdotes disponibles.",
      image: "/media/services/iglesia_bg.png",
      color: "bg-blue-500"
    },
    {
      icon: HandHeart,
      title: "Obras de Caridad",
      description: "Iniciativas solidarias para ayudar a quienes más lo necesitan. Tu amor hecho acción.",
      image: "/media/services/services-3.png",
      color: "bg-amber-500"
    }
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
            <Sparkles size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">Actividades y Eventos</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
            Experiencias que Transforman Vidas
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Participa en nuestras actividades diseñadas para fortalecer tu fe y servir a la comunidad
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-transparent transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                
                <div className={`absolute top-5 left-5 w-12 h-12 sm:w-14 sm:h-14 ${event.color} rounded-xl flex items-center justify-center shadow-xl`}>
                  <event.icon className="text-white" size={24} />
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 lg:mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-10 lg:p-12 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              ¿Quieres Participar?
            </h3>
            <p className="text-base sm:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Únete a nuestras actividades y forma parte de una comunidad que vive y comparte la fe
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Contáctanos Ahora
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
