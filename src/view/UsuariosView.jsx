import { useEffect, useState } from "react";
import { Users, Plus, Edit2, Trash2, X, Eye, EyeOff } from "lucide-react";

const UsuariosView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [visible, setVisible] = useState(false);
  const [usuario, setUsuario] = useState({
    id: null,
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const API = import.meta.env.VITE_API_URL;

  const fetchUsuarios = () => {
    fetch(`${API}/get-usuarios`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error cargando usuarios:", err));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const url = isEditing
      ? `${API}/edit-usuarios/${usuario.id}`
      : `${API}/crear`;
    const method = isEditing ? "PUT" : "POST";

    if (!isEditing && !usuario.password.trim()) {
      showToast("Debe ingresar una contraseña", "error");
      return;
    }

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then(() => {
        fetchUsuarios();
        setVisible(false);
        setUsuario({ id: null, name: "", lastname: "", email: "", password: "" });
        showToast(
          isEditing ? "Usuario actualizado" : "Usuario creado",
          "success"
        );
      })
      .catch((err) => console.error("Error guardando usuario:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      fetch(`${API}/delete-usuarios/${id}`, { method: "DELETE" })
        .then(() => {
          fetchUsuarios();
          showToast("Usuario eliminado", "success");
        })
        .catch((err) => console.error("Error eliminando usuario:", err));
    }
  };

  const handleEdit = (rowData) => {
    setUsuario({ ...rowData, password: "" });
    setIsEditing(true);
    setVisible(true);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(usuarios.length / itemsPerPage);

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Gestión de Usuarios</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast */}
        {toast.show && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white flex items-center gap-2 animate-fade-in`}>
            {toast.message}
          </div>
        )}

        {/* Navegación */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <Users size={18} />
          <span>Usuarios</span>
          <span>/</span>
          <a href="/administrador" className="hover:text-gray-900">Administración</a>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Usuarios Administradores</h2>
              <p className="text-sm text-gray-600 mt-1">Gestiona los usuarios con acceso al panel</p>
            </div>
            <button
              onClick={() => {
                setUsuario({ id: null, name: "", lastname: "", email: "", password: "" });
                setIsEditing(false);
                setVisible(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={18} />
              Nuevo Usuario
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Apellido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Correo Electrónico
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.lastname}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.email}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(row)}
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, usuarios.length)} de {usuarios.length} usuarios
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
        {visible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
                </h3>
                <button
                  onClick={() => setVisible(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={usuario.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Nombre del usuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={usuario.lastname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Apellido del usuario"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={usuario.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="email@ejemplo.com"
                  />
                </div>

                {!isEditing && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={usuario.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Contraseña segura"
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
                )}
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setVisible(false)}
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

export default UsuariosView;
