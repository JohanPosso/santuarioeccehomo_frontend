import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GalleryModerno = () => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/find-galeria`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Validar que la respuesta sea un array
        if (Array.isArray(data)) {
          setImagenes(data);
        } else if (data && Array.isArray(data.data)) {
          setImagenes(data.data);
        } else if (data && data.error) {
          console.error("Error del servidor:", data.error, data.message);
          setImagenes([]);
        } else {
          console.warn("Respuesta inesperada del servidor:", data);
          setImagenes([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gallery:", error);
        setImagenes([]);
        setLoading(false);
      });
  }, [API]);

  const openLightbox = (imagen, index) => {
    setSelectedImage(imagen);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const showNext = () => {
    const nextIndex = (currentIndex + 1) % imagenes.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(imagenes[nextIndex]);
  };

  const showPrev = () => {
    const prevIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(imagenes[prevIndex]);
  };

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-church-primary"></div>
      </div>
    );
  }

  return (
    <>
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
              Galería
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">
              Momentos Especiales
            </h2>
          </motion.div>

          {imagenes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagenes.map((imagen, index) => (
                <motion.div
                  key={imagen.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => openLightbox(imagen, index)}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                >
                  <img
                    src={imagen.imagen || "/media/gallery/placeholder.jpg"}
                    alt={`Gallery ${imagen.id}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No hay imágenes disponibles.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
            >
              <FaTimes />
            </button>

            {imagenes.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); showPrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); showNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            <div onClick={(e) => e.stopPropagation()} className="max-w-5xl max-h-[90vh]">
              <img
                src={selectedImage.imagen}
                alt={`Gallery ${selectedImage.id}`}
                className="w-full h-full object-contain rounded"
              />
              <div className="text-center mt-4 text-white text-sm">
                {currentIndex + 1} / {imagenes.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryModerno;
