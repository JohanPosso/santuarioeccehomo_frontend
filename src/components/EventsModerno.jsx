import { motion } from "framer-motion";
import { 
  FaPrayingHands, 
  FaHandsHelping, 
  FaChurch
} from "react-icons/fa";

const EventsModerno = () => {
  const events = [
    {
      icon: <FaPrayingHands className="text-2xl" />,
      title: "Retiro Espiritual",
      description: "Vive una experiencia de paz y reflexión. Encuentra un espacio de oración y renovación para fortalecer tu relación con Dios.",
      image: "/media/services/services-1.png",
    },
    {
      icon: <FaChurch className="text-2xl" />,
      title: "Confesiones y Dirección Espiritual",
      description: "Acércate al sacramento de la reconciliación. Nuestros sacerdotes están disponibles para escucharte y guiarte.",
      image: "/media/services/iglesia_bg.png",
    },
    {
      icon: <FaHandsHelping className="text-2xl" />,
      title: "Obras de Caridad",
      description: "Forma parte de nuestras iniciativas de ayuda. Contribuye con donaciones, voluntariado y acciones solidarias.",
      image: "/media/services/services-3.png",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-church-secondary text-sm font-medium uppercase tracking-wider">
            Actividades
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">
            Experiencias que Transforman
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-church-primary shadow-md">
                  {event.icon}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsModerno;
