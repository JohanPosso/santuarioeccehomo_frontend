import { Heart, Building2, CreditCard, Copy, Check } from "lucide-react";
import { useState } from "react";

const DonacionesView = () => {
  const [copied, setCopied] = useState(false);

  const cuentaInfo = {
    banco: "Bancolombia",
    numero: "53600014913",
    tipo: "Ahorros",
    titular: "Santuario Ecce Homo"
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center">
            <Heart className="mx-auto mb-6 text-red-400" size={56} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Haz una Donación
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Tu generosidad hace posible que sigamos sirviendo a nuestra comunidad
            </p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Imagen */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/media/services/services-1.png"
                alt="Santuario"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Información */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                ¡Tu Apoyo es Importante!
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Con tu donación, nos ayudas a mantener el santuario, realizar obras de caridad y continuar con nuestras actividades pastorales. Cada aporte, sin importar su tamaño, marca una diferencia significativa.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={18} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Mantenimiento del Santuario</div>
                    <div className="text-sm text-gray-600">Preservamos este espacio sagrado</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={18} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Obras de Caridad</div>
                    <div className="text-sm text-gray-600">Ayudamos a quienes más lo necesitan</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={18} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Actividades Pastorales</div>
                    <div className="text-sm text-gray-600">Fortalecemos la fe de la comunidad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Datos bancarios */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <Building2 className="mx-auto mb-4 text-amber-400" size={48} />
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Datos para Transferencia
              </h3>
              <p className="text-white/80">
                Puedes hacer tu donación mediante transferencia bancaria
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-white/70 mb-1">Banco</div>
                    <div className="text-xl font-bold text-white">{cuentaInfo.banco}</div>
                  </div>

                  <div>
                    <div className="text-sm text-white/70 mb-1">Tipo de Cuenta</div>
                    <div className="text-xl font-bold text-white">{cuentaInfo.tipo}</div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="text-sm text-white/70 mb-1">Número de Cuenta</div>
                    <div className="flex items-center justify-between gap-4 bg-white/10 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white tracking-wider">
                        {cuentaInfo.numero}
                      </div>
                      <button
                        onClick={() => copyToClipboard(cuentaInfo.numero)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        title="Copiar"
                      >
                        {copied ? (
                          <Check size={20} className="text-green-400" />
                        ) : (
                          <Copy size={20} className="text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="text-sm text-white/70 mb-1">Titular</div>
                    <div className="text-lg font-semibold text-white">{cuentaInfo.titular}</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-white/60 text-sm">
                  💛 ¡Gracias por tu generosidad y apoyo! Que Dios te bendiga 💛
                </p>
              </div>
            </div>
          </div>
      </div>
      </section>
    </div>
  );
};

export default DonacionesView;
