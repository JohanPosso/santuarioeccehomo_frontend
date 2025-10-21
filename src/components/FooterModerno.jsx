import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaChurch,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

const FooterModerno = () => {
  const [data, setData] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/find-data`)
      .then((response) => response.json())
      .then((result) => {
        if (result.length > 0) {
          setData(result[0]);
        }
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/sobre-nosotros", label: "Sobre Nosotros" },
    { path: "/servicios", label: "Servicios" },
    { path: "/blogs", label: "Blog" },
    { path: "/galeria", label: "Galería" },
    { path: "/contacto", label: "Contacto" },
    { path: "/donaciones", label: "Donaciones" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1 - Logo e Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              {data?.logo ? (
                <img src={data.logo} alt="Logo" className="h-12 w-auto" />
              ) : (
                <div className="flex items-center gap-2">
                  <FaChurch className="text-church-secondary text-2xl" />
                  <span className="text-xl font-serif font-bold">Santuario</span>
                </div>
              )}
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-md">
              {data?.seccion_1descripcion || "Un lugar de paz y oración. Te invitamos a ser parte de nuestra comunidad."}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-gray-400">
                <FaMapMarkerAlt className="text-church-secondary mt-1 text-xs" />
                <span>Dirección del Santuario, Ciudad</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaPhone className="text-church-secondary text-xs" />
                <a href="tel:+123456789">+57 123 456 789</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FaEnvelope className="text-church-secondary text-xs" />
                <a href="mailto:info@santuario.com">info@santuario.com</a>
              </div>
            </div>
          </div>

          {/* Columna 2 - Enlaces */}
          <div>
            <h3 className="text-base font-serif font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-church-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 - Redes Sociales */}
          <div>
            <h3 className="text-base font-serif font-bold mb-4">Síguenos</h3>
            <div className="flex gap-3">
              {data?.facebook && (
                <a
                  href={data.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-church-secondary rounded-full flex items-center justify-center transition-all"
                >
                  <FaFacebook />
                </a>
              )}
              {data?.instagram && (
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-church-secondary rounded-full flex items-center justify-center transition-all"
                >
                  <FaInstagram />
                </a>
              )}
              {data?.twitter && (
                <a
                  href={data.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-church-secondary rounded-full flex items-center justify-center transition-all"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Santuario. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a 
              href="https://johanposso.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-church-secondary hover:underline"
            >
              Johan Posso
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterModerno;
