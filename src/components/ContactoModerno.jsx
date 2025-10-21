import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Send, Church } from "lucide-react";

const ContactoModerno = () => {
  const [data, setData] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/find-data`)
      .then((res) => setData(res.data[0]))
      .catch((err) => console.error(err));
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfono",
      content: data?.numero || "+57 123 456 789",
      link: `tel:${data?.numero}`,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Correo Electrónico",
      content: data?.correo || "info@santuario.com",
      link: `mailto:${data?.correo}`,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: data?.ubicacion || "Plan de Raspadura, Chocó",
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Banner */}
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
            <Church className="mx-auto mb-6 text-amber-400" size={56} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Contáctanos
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Estamos aquí para atenderte y acompañarte en tu camino de fe
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards de Contacto */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <info.icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                
                {info.link ? (
                  <a href={info.link} className="text-sm sm:text-base text-gray-600 hover:text-amber-600 transition-colors">
                    {info.content}
                  </a>
                ) : (
                  <p className="text-sm sm:text-base text-gray-600">
                    {info.content}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31786.138708365183!2d-76.66758368581627!3d5.2206333952464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4813a598c8cd43%3A0xef9cea42eb2c7120!2sSantuario%20del%20Ecce%20Homo!5e0!3m2!1ses-419!2sco!4v1737997465305!5m2!1ses-419!2sco"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Formulario */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative rounded-2xl overflow-hidden shadow-xl hidden lg:block"
            >
              <img 
                src="/media/pages/contact.png" 
                alt="Contacto" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Envíanos un Mensaje
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Completa el formulario y nos pondremos en contacto contigo pronto
              </p>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    required
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu correo"
                    required
                    className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base transition-all"
                  />
                </div>
                
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tu mensaje..."
                  required
                  className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base resize-none transition-all"
                />

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                >
                  <Send size={18} />
                  Enviar Mensaje
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactoModerno;
