import { useEffect, useState } from "react";
import { Info, Save, Upload, ChevronDown, ChevronUp, Home } from "lucide-react";
import { Link } from "react-router-dom";

const InformacionView = () => {
  const [data, setData] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [logoFile, setLogoFile] = useState(null);
  const [imagen1File, setImagen1File] = useState(null);
  const [imagen2File, setImagen2File] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    contact: true,
    logo: false,
    section1: false,
    section2: false,
    content: false,
    social: false,
  });
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/find-data`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) setData(result[0]);
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    if (logoFile) formData.append("logo", logoFile);
    if (imagen1File) formData.append("imagen_sec1", imagen1File);
    if (imagen2File) formData.append("imagen_sec2", imagen2File);

    fetch(`${API}/edit-data`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        showToast("Información actualizada correctamente", "success");

        fetch(`${API}/find-data`)
          .then((res) => res.json())
          .then((result) => {
            if (result.length > 0) setData(result[0]);
          });
      })
      .catch((err) => {
        showToast("No se pudo actualizar", "error");
        console.error(err);
      });
  };

  if (!data) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Cargando datos...</p>
      </div>
    </div>
  );

  const Section = ({ title, id, children }) => (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => toggleSection(id)}
        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
      >
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {expandedSections[id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {expandedSections[id] && (
        <div className="p-6 bg-white">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Volver al Inicio</span>
            </Link>
            <h1 className="white fw-700 text-center flex-1">Editar Información General</h1>
            <div className="w-32 sm:w-40"></div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast */}
        {toast.show && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white animate-fade-in`}>
            {toast.message}
          </div>
        )}

        {/* Navegación */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Info size={18} />
          <span>Información</span>
          <span>/</span>
          <a href="/administrador" className="hover:text-gray-900">Administración</a>
        </div>

        {/* Información de Contacto */}
        <Section title="Información de Contacto" id="contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="correo"
                value={data.correo || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="info@santuario.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Teléfono
              </label>
              <input
                type="text"
                name="numero"
                value={data.numero || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="+57 123 456 789"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                name="ubicacion"
                value={data.ubicacion || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Dirección completa del santuario"
              />
            </div>
          </div>
        </Section>

        {/* Logo */}
        <Section title="Logo del Santuario" id="logo">
          {data.logo && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold mb-2">Logo Actual:</p>
              <img src={data.logo} alt="Logo" className="h-20 w-auto" />
            </div>
          )}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto mb-2 text-gray-400" size={32} />
            <label className="cursor-pointer">
              <span className="text-sm text-gray-600">
                Haz clic para seleccionar un nuevo logo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogoFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            {logoFile && <p className="text-sm text-green-600 mt-2">✓ Archivo seleccionado: {logoFile.name}</p>}
          </div>
        </Section>

        {/* Sección 1 */}
        <Section title="Sección 1 - Hero Principal" id="section1">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título Principal
              </label>
              <input
                type="text"
                name="seccion_1titulo"
                value={data.seccion_1titulo || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Título del Hero"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="seccion_1descripcion"
                value={data.seccion_1descripcion || ""}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Descripción del Hero"
              />
            </div>

            {data.imagen_sec1 && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold mb-2">Imagen Actual:</p>
                <img src={data.imagen_sec1} alt="Sección 1" className="max-w-xs rounded-lg shadow" />
              </div>
            )}
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto mb-2 text-gray-400" size={32} />
              <label className="cursor-pointer">
                <span className="text-sm text-gray-600">
                  Seleccionar nueva imagen para Sección 1
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagen1File(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {imagen1File && <p className="text-sm text-green-600 mt-2">✓ Archivo seleccionado: {imagen1File.name}</p>}
            </div>
          </div>
        </Section>

        {/* Sección 2 */}
        <Section title="Sección 2 - Sobre Nosotros" id="section2">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                name="seccion_2titulo"
                value={data.seccion_2titulo || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Título de Sobre Nosotros"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="seccion_2descripcion"
                value={data.seccion_2descripcion || ""}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Descripción de Sobre Nosotros"
              />
            </div>

            {data.imagen_sec2 && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold mb-2">Imagen Actual:</p>
                <img src={data.imagen_sec2} alt="Sección 2" className="max-w-xs rounded-lg shadow" />
              </div>
            )}
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto mb-2 text-gray-400" size={32} />
              <label className="cursor-pointer">
                <span className="text-sm text-gray-600">
                  Seleccionar nueva imagen para Sección 2
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagen2File(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {imagen2File && <p className="text-sm text-green-600 mt-2">✓ Archivo seleccionado: {imagen2File.name}</p>}
            </div>
          </div>
        </Section>

        {/* Contenido Institucional */}
        <Section title="Contenido Institucional" id="content">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Misión
              </label>
              <textarea
                name="mision"
                value={data.mision || ""}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Misión del santuario"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Visión
              </label>
              <textarea
                name="vision"
                value={data.vision || ""}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Visión del santuario"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sobre Nosotros
              </label>
              <textarea
                name="sobrenosotros"
                value={data.sobrenosotros || ""}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Descripción general"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reseña Histórica
              </label>
              <textarea
                name="resena"
                value={data.resena || ""}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                placeholder="Historia del santuario"
              />
            </div>
          </div>
        </Section>

        {/* Redes Sociales */}
        <Section title="Redes Sociales" id="social">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                name="facebook"
                value={data.facebook || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="https://facebook.com/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={data.instagram || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="https://instagram.com/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Twitter
              </label>
              <input
                type="url"
                name="twitter"
                value={data.twitter || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </Section>

        {/* Botón de guardar sticky */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-center shadow-lg rounded-t-xl mt-6">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            <Save size={20} />
            Guardar Todos los Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformacionView;
