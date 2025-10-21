import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Church, Target, Award, Book } from "lucide-react";

const SobreNosotrosModerno = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("vision");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/find-data`)
      .then((res) => setData(res.data[0]))
      .catch((err) => console.error(err));
  }, []);

  const tabs = [
    { id: "vision", label: "Visión", icon: Target, content: data?.vision },
    { id: "mision", label: "Misión", icon: Church, content: data?.mision },
    { id: "resena", label: "Historia", icon: Book, content: data?.resena }
  ];

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
            <Church className="mx-auto mb-6 text-amber-400" size={56} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Sobre Nosotros
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Conoce nuestra historia, misión y propósito
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          
          {data && (
            <>
              {/* Descripción general */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 lg:mb-16"
              >
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {data.sobrenosotros}
                </p>
              </motion.div>

              {/* Tabs */}
              <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 flex-wrap px-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gray-900 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
                {tabs.map((tab) => (
                  activeTab === tab.id && (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                          <tab.icon className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {tab.label}
                        </h2>
                      </div>
                      
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                        {tab.content}
                      </p>
                    </motion.div>
                  )
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SobreNosotrosModerno;
