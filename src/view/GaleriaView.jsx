import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Video, Play } from "lucide-react";

const GaleriaView = () => {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/find-galeria`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        // Validar que la respuesta sea un array
        if (Array.isArray(data)) {
          setImagenes(data);
        } else if (data && Array.isArray(data.data)) {
          // Si viene envuelto en un objeto
          setImagenes(data.data);
        } else if (data && data.error) {
          // Si hay un error, mostrar mensaje pero no romper la aplicación
          console.error("Error del servidor:", data.error, data.message);
          setImagenes([]); // Establecer array vacío para evitar errores
        } else {
          // Si no es un array válido, establecer array vacío
          console.warn("Respuesta inesperada del servidor:", data);
          setImagenes([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener la galería:", err);
        setImagenes([]); // Establecer array vacío para evitar errores
        setLoading(false);
      });
  }, [API]);

  const openLightbox = (imagen, index) => {
    setSelectedImage(imagen);
    setCurrentIndex(index);
  };

  const closeLightbox = () => setSelectedImage(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <ImageIcon className="text-amber-400" size={56} />
              <Video className="text-purple-400" size={56} />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Galería Multimedia
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Momentos especiales y memorables de nuestra comunidad de fe en imágenes y videos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Galería */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : imagenes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {imagenes.map((imagen, i) => (
                <motion.div
                  key={imagen.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  onClick={() => openLightbox(imagen, i)}
                  className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
                >
                  {imagen.tipo === 'video' ? (
                    <>
                      <video
                        src={imagen.imagen}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Play className="text-white" size={40} />
                      </div>
                    </>
                  ) : (
                    <img
                      src={imagen.imagen || "/media/gallery/placeholder.jpg"}
                      alt={`Galería ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  
                  {/* Overlay en hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {imagen.tipo === 'video' ? (
                      <Video className="text-white" size={32} />
                    ) : (
                      <ImageIcon className="text-white" size={32} />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <ImageIcon className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-600 text-lg">No hay imágenes disponibles.</p>
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
              className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={24} />
            </button>

            {imagenes.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); showPrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); showNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div onClick={(e) => e.stopPropagation()} className="max-w-6xl w-full">
              {selectedImage.tipo === 'video' ? (
                <motion.video
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={selectedImage.imagen}
                  controls
                  autoPlay
                  className="w-full max-h-[85vh] object-contain rounded-lg"
                />
              ) : (
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={selectedImage.imagen}
                  alt={`Galería ${currentIndex + 1}`}
                  className="w-full max-h-[85vh] object-contain rounded-lg"
                />
              )}
              
              <div className="text-center mt-4">
                <p className="text-white/60 text-sm">
                  {currentIndex + 1} / {imagenes.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GaleriaView;
