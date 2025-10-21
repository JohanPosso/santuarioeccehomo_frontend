import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaHeart, FaDonate } from "react-icons/fa";

const HeroModerno = () => {
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

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-church-primary border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gray-50">
      {/* Background sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232c3e50' fill-opacity='0.4'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Contenido */}
      <div className="container-custom relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda - Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-5"
            >
              {data?.seccion_1titulo || "Santuario Ecce Homo"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed"
            >
              {data?.seccion_1descripcion ||
                "Un lugar de paz, oración y encuentro con Dios. Te invitamos a ser parte de nuestra comunidad."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 bg-church-primary text-white text-sm font-medium rounded hover:bg-church-accent transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <FaHeart className="text-sm" />
                Contáctanos
              </Link>

              <Link
                to="/donaciones"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-church-primary text-church-primary text-sm font-medium rounded hover:bg-church-primary hover:text-white transition-all duration-300"
              >
                <FaDonate className="text-sm" />
                Hacer una Donación
              </Link>
            </motion.div>
          </motion.div>

          {/* Columna derecha - Imagen */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {data?.imagen_sec1 ? (
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src={data.imagen_sec1}
                  alt="Santuario"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-church-primary to-church-accent rounded-lg" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroModerno;
