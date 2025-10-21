import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, HelpCircle, Sparkles, ArrowRight } from "lucide-react";

const PreguntasFrecuentes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  const faqs = [
    {
      question: "¿Dónde se encuentra ubicado el Santuario?",
      answer: "Estamos ubicados en el Corregimiento Plan de Raspadura, Municipio Unión Panamericana, Chocó. Un lugar de gran significado espiritual."
    },
    {
      question: "¿Cuáles son los horarios de misas?",
      answer: "Lunes a Sábado a las 11:00 AM. Los domingos celebramos tres misas: 9:00 AM, 11:00 AM y 4:00 PM."
    },
    {
      question: "¿Hay costo para entrar al santuario?",
      answer: "La entrada es completamente gratuita. Aceptamos donaciones voluntarias para el mantenimiento del santuario."
    },
    {
      question: "¿Se pueden realizar sacramentos?",
      answer: "Sí, ofrecemos bautizos, matrimonios, confirmaciones y otros sacramentos. Contáctanos para agendar."
    },
    {
      question: "¿Ofrecen hospedaje o alojamiento?",
      answer: "Hay opciones de hospedaje cerca del santuario. Recomendamos reservar con anticipación en fechas especiales."
    }
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4">
            <HelpCircle size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">Preguntas Frecuentes</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-4">
            ¿Tienes Alguna Duda?
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 px-4">
            Encuentra respuestas a las preguntas más comunes
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown 
                    className={`${activeIndex === i ? "text-amber-600" : "text-gray-400"}`} 
                    size={20} 
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 lg:mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              ¿No encontraste tu respuesta?
            </h3>
            <p className="text-sm sm:text-base text-white/90 mb-6">
              Estamos aquí para ayudarte. Escríbenos y con gusto te atenderemos.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Contáctanos
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PreguntasFrecuentes;
