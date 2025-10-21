import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, Info, Settings, BookOpen, Image, Clock, Calendar, UserCircle } from "lucide-react";

const AdminEndpoints = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de cerrar sesión?")) {
      localStorage.removeItem("user");
      setUser(null);
      setTimeout(() => {
        window.location.href = "/login";
      }, 300);
    }
  };

  const endpoints = [
    {
      title: "Gestionar Usuarios",
      description: "Administra usuarios del sistema",
      route: "/usuarios-view",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Información General",
      description: "Edita la información del sitio",
      route: "/informacion-view",
      icon: Info,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Gestionar Servicios",
      description: "Administra servicios pastorales",
      route: "/servicios-view",
      icon: Settings,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Gestionar Blog",
      description: "Publica artículos y reflexiones",
      route: "/blog-view",
      icon: BookOpen,
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Gestionar Galería",
      description: "Sube fotos de eventos",
      route: "/galeria-view",
      icon: Image,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Gestionar Personal",
      description: "Administra el equipo pastoral",
      route: "/personal-view",
      icon: UserCircle,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Gestionar Horarios",
      description: "Horarios de misas y confesiones",
      route: "/horarios-view",
      icon: Clock,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Calendario de Eventos",
      description: "Administra eventos anuales",
      route: "/calendario-view",
      icon: Calendar,
      color: "from-teal-500 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Panel de Administración
              </h1>
              <p className="text-white/80">
                Bienvenido, {user ? `${user.name} ${user.lastname}` : "Administrador"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all shadow-lg"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid de opciones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {endpoints.map((endpoint, index) => {
            const Icon = endpoint.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(endpoint.route)}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradiente de fondo en hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${endpoint.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Contenido */}
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${endpoint.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {endpoint.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {endpoint.description}
                  </p>
                </div>

                {/* Flecha indicadora */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`w-8 h-8 bg-gradient-to-br ${endpoint.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-lg">→</span>
                  </div>
                </div>

                {/* Línea decorativa */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${endpoint.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
              </div>
            );
          })}
        </div>

        {/* Info adicional */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Accesos Rápidos</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <span className="text-2xl">🏠</span>
              <div>
                <div className="font-semibold text-gray-900">Ver Sitio Web</div>
                <div className="text-xs text-gray-600">Ir a la página principal</div>
              </div>
            </button>

            <button
              onClick={() => navigate("/calendario")}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <span className="text-2xl">📅</span>
              <div>
                <div className="font-semibold text-gray-900">Ver Calendario</div>
                <div className="text-xs text-gray-600">Vista pública del calendario</div>
              </div>
            </button>

            <button
              onClick={() => navigate("/galeria")}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <span className="text-2xl">🖼️</span>
              <div>
                <div className="font-semibold text-gray-900">Ver Galería</div>
                <div className="text-xs text-gray-600">Vista pública de fotos</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEndpoints;
