import { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle, Plus, Edit2, Trash2, X, Upload, Eye, EyeOff, Home } from "lucide-react";
import { Link } from "react-router-dom";

const PersonalAdminView = () => {
  const [personal, setPersonal] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    cargo: "",
    foto: null,
    orden: 0,
    activo: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPersonal();
  }, []);

  const fetchPersonal = () => {
    axios.get(`${API}/find-all-personal`)
      .then((res) => setPersonal(res.data))
      .catch((err) => console.error(err));
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("cargo", formData.cargo);
      formDataToSend.append("orden", formData.orden);
      formDataToSend.append("activo", formData.activo);
      
      if (selectedFile) {
        formDataToSend.append("foto", selectedFile);
      }

      if (isEditing) {
        await axios.put(`${API}/update-personal/${formData.id}`, formDataToSend);
        showToast("Personal actualizado", "success");
      } else {
        await axios.post(`${API}/crear-personal`, formDataToSend);
        showToast("Personal creado", "success");
      }

      closeModal();
      fetchPersonal();
    } catch (error) {
      console.error(error);
      showToast("Error al guardar", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este personal?")) {
      try {
        await axios.delete(`${API}/delete-personal/${id}`);
        setPersonal(personal.filter((p) => p.id !== id));
        showToast("Personal eliminado", "success");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openEditModal = (persona) => {
    setFormData(persona);
    setPreviewUrl(persona.foto || null);
    setIsEditing(true);
    setShowModal(true);
  };

  const openNewModal = () => {
    setFormData({ id: null, nombre: "", cargo: "", foto: null, orden: 0, activo: true });
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ id: null, nombre: "", cargo: "", foto: null, orden: 0, activo: true });
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = personal.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(personal.length / itemsPerPage);

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
            <h1 className="white fw-700 text-center flex-1">Gestión de Personal</h1>
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
          <UserCircle size={18} />
          <span>Personal</span>
          <span>/</span>
          <a href="/administrador" className="hover:text-gray-900">Administración</a>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Equipo Pastoral</h2>
              <p className="text-sm text-gray-600 mt-1">Administra el personal del santuario</p>
            </div>
            <button
              onClick={openNewModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={18} />
              Nuevo Personal
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Foto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Cargo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((row, index) => (
                    <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4">
                        {row.foto ? (
                          <img
                            src={row.foto}
                            alt={row.nombre}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserCircle size={24} className="text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.nombre}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.cargo}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          row.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {row.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(row)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No hay personal registrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, personal.length)} de {personal.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      currentPage === page
                        ? 'bg-gray-900 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditing ? "Editar Personal" : "Nuevo Personal"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Nombre del personal"
                  />
                </div>

                {/* Cargo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Ej: Párroco, Secretaria"
                  />
                </div>

                {/* Foto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Fotografía
                  </label>
                  {previewUrl && (
                    <div className="mb-3 flex justify-center">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                      />
                    </div>
                  )}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <label className="cursor-pointer">
                      <span className="text-sm text-gray-600">Seleccionar foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {selectedFile && <p className="text-sm text-green-600 mt-2">✓ {selectedFile.name}</p>}
                  </div>
                </div>

                {/* Orden */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Orden
                  </label>
                  <input
                    type="number"
                    value={formData.orden}
                    onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                {/* Activo */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Personal activo
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  {isEditing ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalAdminView;
