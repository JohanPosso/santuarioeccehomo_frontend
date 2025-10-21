import { motion } from "framer-motion";
import { 
  FaClock, 
  FaChurch, 
  FaPrayingHands
} from "react-icons/fa";

const MassTimeModerno = () => {
  const massSchedule = [
    { day: "Lunes - Sábado", time: "11:00 AM" },
    { day: "Domingo", time: "9:00 AM, 11:00 AM, 4:00 PM" },
  ];

  const confessionSchedule = [
    { day: "Miércoles", time: "6:00 PM - 7:00 PM" },
    { day: "Domingo", time: "10:00 AM - 11:00 AM" },
    { day: "Por cita", time: "Previa coordinación" },
  ];

  return (
    <section className="py-16 md:py-20 bg-church-primary text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-church-secondary text-sm font-medium uppercase tracking-wider">
            Horarios
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mt-2 mb-4">
            Celebraciones y Servicios
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Horarios de Misa */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/20">
              <div className="w-12 h-12 bg-church-secondary rounded-lg flex items-center justify-center">
                <FaChurch className="text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold">Horario de Misas</h3>
                <p className="text-xs text-white/80">Celebraciones Eucarísticas</p>
              </div>
            </div>

            <div className="space-y-3">
              {massSchedule.map((schedule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FaClock className="text-church-secondary mt-1 text-sm" />
                  <div>
                    <div className="font-medium text-sm">{schedule.day}</div>
                    <div className="text-xs text-white/80">{schedule.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Horarios de Confesión */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/20">
              <div className="w-12 h-12 bg-church-secondary rounded-lg flex items-center justify-center">
                <FaPrayingHands className="text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold">Confesiones</h3>
                <p className="text-xs text-white/80">Sacramento de Reconciliación</p>
              </div>
            </div>

            <div className="space-y-3">
              {confessionSchedule.map((schedule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FaClock className="text-church-secondary mt-1 text-sm" />
                  <div>
                    <div className="font-medium text-sm">{schedule.day}</div>
                    <div className="text-xs text-white/80">{schedule.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MassTimeModerno;
