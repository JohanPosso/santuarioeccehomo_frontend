import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, Plus, Edit2, Trash2, X, Star, Home } from "lucide-react";
import { Link } from "react-router-dom";

const HorariosAdminView = () => {
  const [horarios, setHorarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    tipo: "misa",
    dia: "",
    hora: "",
    descripcion: "",
    destacado: false,
    orden: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchHorarios();
  }, []);

  const fetchHorarios = () => {
    axios.get(`${API}/find-horarios`)
      .then((res) => setHorarios(res.data))
      .catch((err) => console.error(err));
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await axios.put(`${API}/update-horario/${formData.id}`, formData);
        showToast("Horario actualizado", "success");
      } else {
        await axios.post(`${API}/crear-horario`, formData);
        showToast("Horario creado", "success");
      }

      closeModal();
      fetchHorarios();
    } catch (error) {
      console.error(error);
      showToast("Error al guardar", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este horario?")) {
      try {
        await axios.delete(`${API}/delete-horario/${id}`);
        setHorarios(horarios.filter((h) => h.id !== id));
        showToast("Horario eliminado", "success");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openEditModal = (horario) => {
    setFormData(horario);
    setIsEditing(true);
    setShowModal(true);
  };

  const openNewModal = () => {
    setFormData({ id: null, tipo: "misa", dia: "", hora: "", descripcion: "", destacado: false, orden: 0 });
    setIsEditing(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ id: null, tipo: "misa", dia: "", hora: "", descripcion: "", destacado: false, orden: 0 });
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = horarios.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(horarios.length / itemsPerPage);

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
            <h1 className="white fw-700 text-center flex-1">Gestión de Horarios</h1>
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
          <Clock size={18} />
          <span>Horarios</span>
          <span>/</span>
          <a href="/administrador" className="hover:text-gray-900">Administración</a>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Horarios de Misas y Confesiones</h2>
              <p className="text-sm text-gray-600 mt-1">Administra los horarios del santuario</p>
            </div>
            <button
              onClick={openNewModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={18} />
              Nuevo Horario
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Día
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Destacado
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
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          row.tipo === 'misa' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {row.tipo === 'misa' ? 'Misa' : 'Confesión'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{row.dia}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.hora}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.descripcion}</td>
                      <td className="px-6 py-4 text-center">
                        {row.destacado && <Star size={18} className="inline text-amber-500 fill-amber-500" />}
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
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No hay horarios registrados
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
                Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, horarios.length)} de {horarios.length}
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
                  {isEditing ? "Editar Horario" : "Nuevo Horario"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Tipo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo *
                  </label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="misa">Misa</option>
                    <option value="confesion">Confesión</option>
                  </select>
                </div>

                {/* Día */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Día *
                  </label>
                  <input
                    type="text"
                    value={formData.dia}
                    onChange={(e) => setFormData({ ...formData, dia: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Ej: Lunes a Viernes, Domingos"
                  />
                </div>

                {/* Hora */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hora *
                  </label>
                  <input
                    type="text"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Ej: 7:00 AM, 6:00 PM"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descripción (Opcional)
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    placeholder="Información adicional..."
                  />
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

                {/* Destacado */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.destacado}
                    onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Marcar como destacado
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

export default HorariosAdminView;
