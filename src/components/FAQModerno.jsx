import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FAQModerno = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "¿Dónde se encuentra ubicado el Santuario?",
      answer: "El santuario se encuentra ubicado en el Corregimiento Plan de Raspadura, Municipio Unión Panamericana, Chocó.",
    },
    {
      question: "¿Cuáles son los horarios de misas?",
      answer: "Lunes a Sábado 11:00 AM. Domingos: 9:00 AM, 11:00 AM y 4:00 PM.",
    },
    {
      question: "¿Hay algún costo para entrar?",
      answer: "La entrada es gratuita. Se aceptan donaciones voluntarias para el mantenimiento.",
    },
    {
      question: "¿Se pueden realizar eventos religiosos?",
      answer: "Sí, ofrecemos servicios de bautizos, matrimonios y otras celebraciones. Contacta la administración para más información.",
    },
  ];

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
            Preguntas Frecuentes
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mt-2 mb-4">
            ¿Tienes Dudas?
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className={`text-sm ${activeIndex === index ? 'text-church-secondary' : 'text-gray-400'}`} />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQModerno;
