import { useState, useEffect } from "react";
import { BookOpen, Plus, Edit2, Trash2, X, Upload } from "lucide-react";

const Blogview = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
  });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const itemsPerPage = 10;
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/findblog`)
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const openNew = () => {
    setBlog({ name: "", description: "", image: "", link: "" });
    setSelectedFile(null);
    setPreviewUrl(null);
    setEditing(false);
    setDialogVisible(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setBlog({ ...blog, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const saveBlog = async () => {
    const formData = new FormData();
    formData.append("name", blog.name);
    formData.append("description", blog.description);
    formData.append("image", blog.image);
    formData.append("link", blog.link);

    const url = editing ? `${API}/editblog/${blog.id}` : `${API}/createblog`;
    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: formData,
    });

    showToast(`Blog ${editing ? "actualizado" : "creado"}`, "success");
    setDialogVisible(false);
    window.location.reload();
  };

  const deleteBlog = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este artículo?")) {
      await fetch(`${API}/deleteblog/${id}`, {
        method: "DELETE",
      });

      showToast("Blog eliminado", "success");
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  const editBlog = (rowData) => {
    setBlog(rowData);
    setPreviewUrl(rowData.image);
    setEditing(true);
    setDialogVisible(true);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Gestión de Blog</h1>
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
          <BookOpen size={18} />
          <span>Blog</span>
          <span>/</span>
          <a href="/administrador" className="hover:text-gray-900">Administración</a>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Artículos del Blog</h2>
              <p className="text-sm text-gray-600 mt-1">Administra publicaciones y reflexiones</p>
            </div>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={18} />
              Nuevo Artículo
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Imagen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Autor
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
                        <img
                          src={row.image}
                          alt={row.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs">
                        <div className="line-clamp-2">{row.name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{row.link}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => editBlog(row)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteBlog(row.id)}
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
                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                      No hay artículos publicados
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
                Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, blogs.length)} de {blogs.length} artículos
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
        {dialogVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {editing ? "Editar Artículo" : "Nuevo Artículo"}
                </h3>
                <button
                  onClick={() => setDialogVisible(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Autor/Creador
                  </label>
                  <input
                    type="text"
                    value={blog.link}
                    onChange={(e) => setBlog({ ...blog, link: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Nombre del autor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título del Artículo
                  </label>
                  <input
                    type="text"
                    value={blog.name}
                    onChange={(e) => setBlog({ ...blog, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Título llamativo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descripción/Contenido
                  </label>
                  <textarea
                    value={blog.description}
                    onChange={(e) => setBlog({ ...blog, description: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    placeholder="Contenido del artículo..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Imagen de Portada
                  </label>
                  
                  {previewUrl && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-semibold mb-2">Imagen Actual:</p>
                      <img src={previewUrl} alt="Preview" className="max-w-xs rounded-lg" />
                    </div>
                  )}
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <label className="cursor-pointer">
                      <span className="text-sm text-gray-600">
                        Haz clic para seleccionar o arrastra una imagen
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setDialogVisible(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveBlog}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editing ? "Actualizar" : "Publicar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogview;
