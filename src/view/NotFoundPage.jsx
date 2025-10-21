import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        
        {/* 404 Animado */}
        <div className="mb-8">
          <div className="text-9xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent animate-pulse">
            404
          </div>
        </div>

        {/* Icono */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <Search className="text-white" size={36} />
          </div>
        </div>

        {/* Título y descripción */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          ¡Ups! Página no encontrada
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          La página que buscas no existe o ha sido movida. Por favor, verifica la URL o regresa a la página principal.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Home size={20} />
            Ir al Inicio
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowLeft size={20} />
            Volver Atrás
          </button>
        </div>

        {/* Enlaces útiles */}
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            Enlaces útiles:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/sobre-nosotros" className="text-gray-600 hover:text-gray-900 transition-colors">
              Sobre Nosotros
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/servicios" className="text-gray-600 hover:text-gray-900 transition-colors">
              Servicios
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/calendario" className="text-gray-600 hover:text-gray-900 transition-colors">
              Calendario
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/blogs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/contacto" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
