import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { Lock, Mail, Eye, EyeOff, LogIn, Shield } from "lucide-react";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API}/token`, {
        email,
        password,
      });

      const userData = response.data;
      login(userData);

      if (remember) {
        localStorage.setItem("user", JSON.stringify(userData));
      }

      console.log("Login successful", userData);
      navigate("/administrador");
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      setError("Credenciales incorrectas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Lado izquierdo - Imagen */}
        <div className="hidden md:block relative">
          <img
            src="/media/backgrounds/iglesia_bg.png"
            alt="Santuario"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/60 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <Shield size={64} className="mx-auto mb-6 text-amber-400" />
              <h2 className="text-3xl font-bold mb-4">Panel de Administración</h2>
              <p className="text-white/80 text-lg">
                Gestiona el contenido del sitio web del Santuario
              </p>
            </div>
          </div>
        </div>

        {/* Lado derecho - Formulario */}
        <div className="p-8 sm:p-12 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            
            {/* Logo y título */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="text-amber-400" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenido
              </h1>
              <p className="text-gray-600">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Recordarme */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Recordar mi sesión
                </label>
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Ingresando...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Iniciar Sesión
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Volver al sitio web
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
