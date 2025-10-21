import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Calendar as CalendarIcon, MapPin, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";

const CalendarioView = () => {
  const [eventos, setEventos] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvento, setSelectedEvento] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = () => {
    axios.get(`${API}/find-eventos`)
      .then((res) => setEventos(res.data))
      .catch((err) => console.error(err));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventosForDay = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, day);
    
    return eventos.filter(evento => {
      const eventoDate = new Date(evento.fecha_inicio);
      return eventoDate.toDateString() === date.toDateString();
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

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
            <CalendarIcon className="mx-auto mb-6 text-amber-400" size={56} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Calendario de Eventos
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Eventos, celebraciones y actividades de nuestra comunidad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendario */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header del calendario */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex justify-between items-center">
              <button
                onClick={prevMonth}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="text-white" size={20} />
              </button>
              
              <h2 className="text-xl font-bold text-white capitalize">
                {monthName}
              </h2>
              
              <button
                onClick={nextMonth}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="text-white" size={20} />
              </button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 bg-gray-100 border-b border-gray-200">
              {days.map((day) => (
                <div key={day} className="p-3 text-center text-sm font-semibold text-gray-700">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid de días */}
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {/* Días vacíos antes del inicio del mes */}
              {[...Array(startingDayOfWeek)].map((_, i) => (
                <div key={`empty-${i}`} className="bg-gray-50 p-2 h-24 sm:h-32" />
              ))}

              {/* Días del mes */}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const eventosDelDia = getEventosForDay(day);
                const hasEventos = eventosDelDia.length > 0;

                return (
                  <div
                    key={day}
                    className={`bg-white p-2 h-24 sm:h-32 relative hover:bg-gray-50 transition-colors ${
                      hasEventos ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div className="text-sm font-semibold text-gray-900 mb-1">{day}</div>
                    
                    {/* Eventos del día */}
                    <div className="space-y-1">
                      {eventosDelDia.slice(0, 2).map((evento) => (
                        <div
                          key={evento.id}
                          onClick={() => setSelectedEvento(evento)}
                          className="text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ backgroundColor: evento.color, color: 'white' }}
                          title={evento.titulo}
                        >
                          {evento.titulo}
                        </div>
                      ))}
                      {eventosDelDia.length > 2 && (
                        <div className="text-xs text-gray-500 px-2">
                          +{eventosDelDia.length - 2} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lista de próximos eventos */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Próximos Eventos</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventos.slice(0, 6).map((evento, i) => (
                <motion.div
                  key={evento.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setSelectedEvento(evento)}
                  className="bg-white border-l-4 rounded-lg p-6 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  style={{ borderLeftColor: evento.color }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-gray-900 flex-1">{evento.titulo}</h4>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    {evento.fecha_inicio && (
                      <div className="flex items-center gap-2">
                        <CalendarIcon size={14} />
                        <span>
                          {new Date(evento.fecha_inicio).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                    {evento.hora && (
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{evento.hora}</span>
                      </div>
                    )}
                    {evento.ubicacion && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{evento.ubicacion}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal de detalles del evento */}
      {selectedEvento && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvento(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Imagen si existe */}
            {selectedEvento.imagen && (
              <div className="relative h-64">
                <img
                  src={selectedEvento.imagen || "/media/events/event-1.png"}
                  alt={selectedEvento.titulo}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedEvento(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            <div className="p-8">
              {!selectedEvento.imagen && (
                <button
                  onClick={() => setSelectedEvento(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedEvento.color }} />
                {selectedEvento.tipo && (
                  <span className="text-sm font-semibold text-gray-600 uppercase">{selectedEvento.tipo}</span>
                )}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedEvento.titulo}
              </h2>

              {selectedEvento.descripcion && (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedEvento.descripcion}
                </p>
              )}

              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <CalendarIcon size={18} className="text-amber-600" />
                  <span>
                    {new Date(selectedEvento.fecha_inicio).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {selectedEvento.hora && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock size={18} className="text-amber-600" />
                    <span>{selectedEvento.hora}</span>
                  </div>
                )}

                {selectedEvento.ubicacion && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin size={18} className="text-amber-600" />
                    <span>{selectedEvento.ubicacion}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CalendarioView;

