import { motion } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaPrayingHands, 
  FaBook
} from "react-icons/fa";

const ServicesModerno = () => {
  const services = [
    {
      icon: <FaCalendarAlt className="text-2xl" />,
      title: "Calendario de Actividades",
      description: "Mantente informado sobre nuestras misas, encuentros, retiros espirituales y eventos comunitarios.",
      image: "/banner-1.jpg",
    },
    {
      icon: <FaPrayingHands className="text-2xl" />,
      title: "Guías Espirituales",
      description: "Nuestros sacerdotes están aquí para acompañarte en tu camino de fe con orientación y apoyo.",
      image: "/banner-2.jpg",
    },
    {
      icon: <FaBook className="text-2xl" />,
      title: "Reflexiones y Sermones",
      description: "Accede a mensajes inspiradores que nutren el alma y fortalecen tu relación con Dios.",
      image: "/banner-3.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-church-secondary text-sm font-medium uppercase tracking-wider">
            Nuestros Servicios
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">
            Cómo Podemos Servirte
          </h2>
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            Descubre las diferentes formas en que nuestra comunidad puede acompañarte
          </p>
        </motion.div>

        {/* Grid de servicios */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Icono */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-church-primary shadow-md">
                  {service.icon}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5">
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesModerno;
