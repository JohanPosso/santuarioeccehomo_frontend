import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaBible, FaChurch, FaPrayingHands, FaHandshake } from "react-icons/fa";

const TeamModerno = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API}/find-servicio`);
        setServices(response.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const icons = [
    <FaBible className="text-xl" />,
    <FaChurch className="text-xl" />,
    <FaPrayingHands className="text-xl" />,
    <FaHandshake className="text-xl" />,
  ];

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-church-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container-custom">
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
            Servicios Pastorales
          </h2>
          <p className="text-base text-gray-700 max-w-3xl mx-auto">
            Ofrecemos diversos servicios para acompañarte en tu camino de fe
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 bg-church-primary rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                {icons[index]}
              </div>

              <h3 className="text-base font-serif font-bold text-gray-900 mb-2">
                {service.nombre}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.descripcion}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamModerno;
