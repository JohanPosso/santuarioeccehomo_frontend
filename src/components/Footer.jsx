import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Church, Heart, ArrowRight } from "lucide-react";

const Footer = () => {
  const [data, setData] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/find-data`)
      .then((res) => res.json())
      .then((result) => result.length > 0 && setData(result[0]))
      .catch((err) => console.error(err));
  }, []);

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/sobre-nosotros", label: "Nosotros" },
    { path: "/servicios", label: "Servicios" },
    { path: "/calendario", label: "Calendario" },
    { path: "/blogs", label: "Blog" },
    { path: "/galeria", label: "Galería" },
    { path: "/contacto", label: "Contacto" }
  ];

  const schedules = [
    { label: "Lun - Sáb", time: "11:00 AM" },
    { label: "Domingo", time: "9:00 AM, 11:00 AM, 4:00 PM" }
  ];

  return (
    <footer className="bg-gray-900 text-white overflow-hidden">
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <Church className="mx-auto mb-4 text-white" size={48} />
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Únete a Nuestra Comunidad
          </h3>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Todos son bienvenidos en nuestra familia de fe. Ven y experimenta el amor de Dios.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-600 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            Visítanos Hoy
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            
            {/* Columna 1 - Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-block mb-6">
                {data?.logo ? (
                  <img src={data.logo} alt="Logo" className="h-14 w-auto" />
                ) : (
                  <div className="flex items-center gap-2">
                    <Church className="text-amber-400" size={32} />
                    <span className="text-2xl font-bold">Santuario</span>
                  </div>
                )}
              </Link>
              
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {data?.seccion_1descripcion || "Un lugar de paz, oración y encuentro con Dios."}
              </p>

              {/* Redes sociales */}
              <div className="flex gap-3">
                {data?.facebook && (
                  <a
                    href={data.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <Facebook size={18} />
                  </a>
                )}
                {data?.instagram && (
                  <a
                    href={data.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {data?.twitter && (
                  <a
                    href={data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <Twitter size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Columna 2 - Enlaces */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-6">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-amber-400 rounded-full group-hover:w-2 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3 - Horarios */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-6">Horarios de Misa</h3>
              <ul className="space-y-3">
                {schedules.map((schedule, i) => (
                  <li key={i} className="text-sm">
                    <div className="font-semibold text-white">{schedule.label}</div>
                    <div className="text-gray-400">{schedule.time}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 4 - Contacto */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-6">Contacto</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-gray-400">
                  <MapPin size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                  <span>Plan de Raspadura, Unión Panamericana, Chocó</span>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Phone size={16} className="text-amber-400 flex-shrink-0" />
                  <a href={`tel:${data?.numero}`} className="hover:text-amber-400 transition-colors">
                    {data?.numero || "+57 123 456 789"}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Mail size={16} className="text-amber-400 flex-shrink-0" />
                  <span className="truncate">{data?.correo || "info@santuario.com"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Santuario. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-2">
              Desarrollado con <Heart size={14} className="text-red-500" /> por{" "}
              <a 
                href="https://johanposso.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                Johan Posso
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
