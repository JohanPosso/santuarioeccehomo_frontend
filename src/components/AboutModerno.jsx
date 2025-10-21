import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const AboutModerno = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/find-data`)
      .then((response) => {
        setData(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setLoading(false);
      });
  }, []);

  const values = [
    "Servicio a la comunidad",
    "Oración y espiritualidad",
    "Amor y compasión",
    "Formación en la fe",
  ];

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-church-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Columna izquierda - Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              {data?.imagen_sec2 ? (
                <img
                  src={data.imagen_sec2}
                  alt="Sobre Nosotros"
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-church-primary to-church-accent" />
              )}
            </div>
          </motion.div>

          {/* Columna derecha - Contenido */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-3">
              <span className="text-church-secondary text-sm font-medium uppercase tracking-wider">
                Sobre Nosotros
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              {data?.seccion_2titulo || "Bienvenidos al Santuario"}
            </h2>

            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              {data?.seccion_2descripcion ||
                "Somos una comunidad de fe comprometida con el servicio, la oración y el amor. Nuestro santuario es un espacio abierto para todos aquellos que buscan paz, esperanza y encuentro con Dios."}
            </p>

            {/* Valores */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2"
                >
                  <FaCheckCircle className="text-church-secondary text-sm mt-1 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{value}</span>
                </div>
              ))}
            </div>

            <Link
              to="/sobre-nosotros"
              className="inline-flex items-center gap-2 px-6 py-3 bg-church-primary text-white text-sm font-medium rounded hover:bg-church-accent transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <span>Conoce Más</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutModerno;
