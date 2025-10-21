import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaBars, 
  FaTimes, 
  FaChurch
} from "react-icons/fa";

const HeaderModerno = () => {
  const [logo, setLogo] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/find-data`);
        const data = await response.json();
        if (data.length > 0) {
          setLogo(data[0].logo);
        }
      } catch (error) {
        console.error("Error al obtener el logo:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/sobre-nosotros", label: "Sobre Nosotros" },
    { path: "/servicios", label: "Servicios" },
    { path: "/blogs", label: "Blog" },
    { path: "/galeria", label: "Galería" },
    { path: "/contacto", label: "Contacto" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-white py-4"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {logo ? (
              <img
                src={logo}
                alt="Santuario Logo"
                className="h-12 w-auto"
              />
            ) : (
              <div className="flex items-center gap-2">
                <FaChurch className="text-church-primary text-2xl" />
                <span className="font-serif text-xl text-church-primary font-bold">
                  Santuario
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-300 relative group ${
                  isActive(item.path)
                    ? "text-church-primary"
                    : "text-gray-700 hover:text-church-primary"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-church-secondary transition-transform duration-300 ${
                    isActive(item.path)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
            
            <Link
              to="/donaciones"
              className="px-5 py-2 bg-church-secondary text-white text-sm font-medium rounded hover:bg-opacity-90 transition-all duration-300"
            >
              Donar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-church-primary text-xl p-2"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 mt-4 pt-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded transition-all ${
                    isActive(item.path)
                      ? "bg-church-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/donaciones"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 bg-church-secondary text-white text-sm font-medium rounded text-center mt-2"
              >
                Donar
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default HeaderModerno;
