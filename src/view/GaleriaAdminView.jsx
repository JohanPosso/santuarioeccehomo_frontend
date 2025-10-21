import { useState, useEffect } from "react";
import { Image, Video, Plus, Edit2, Trash2, X, Upload, Play, Home } from "lucide-react";
import { Link } from "react-router-dom";

const GaleriaAdminView = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    imagen: "",
    tipo: "imagen",
  });
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [filterTipo, setFilterTipo] = useState("todos");
  const itemsPerPage = 12;
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchGaleria();
  }, []);

  const fetchGaleria = () => {
    fetch(`${API}/find-galeria`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const openNew = () => {
    setItem({ imagen: "", tipo: "imagen" });
    setSelectedFile(null);
    setPreviewUrl(null);
    setEditing(false);
    setDialogVisible(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setItem({ ...item, imagen: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const saveItem = async () => {
    if (!editing && !selectedFile) {
      showToast("Debes seleccionar un archivo", "error");
      return;
    }

    const formData = new FormData();
    formData.append("tipo", item.tipo);
    
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const url = editing ? `${API}/update-galeria/${item.id}` : `${API}/crear-galeria`;
    const method = editing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        showToast(`${item.tipo === 'imagen' ? 'Imagen' : 'Video'} ${editing ? "actualizado" : "agregado"}`, "success");
        setDialogVisible(false);
        fetchGaleria();
      } else {
        showToast("Error al guardar", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Error al guardar", "error");
    }
  };

  const deleteItem = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este elemento?")) {
      try {
        await fetch(`${API}/delete-galeria/${id}`, {
          method: "DELETE",
        });

        showToast("Elemento eliminado", "success");
        fetchGaleria();
      } catch (error) {
        console.error("Error:", error);
        showToast("Error al eliminar", "error");
      }
    }
  };

  const editItem = (rowData) => {
    setItem(rowData);
    setPreviewUrl(rowData.imagen);
    setEditing(true);
    setDialogVisible(true);
  };

  // Filtrar por tipo
  const filteredItems = filterTipo === "todos" 
    ? items 
    : items.filter(i => i.tipo === filterTipo);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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
            <h1 className="white fw-700 text-center flex-1">Gestión de Galería</h1>
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

        {/* Header con acciones */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Galería Multimedia</h2>
              <p className="text-gray-600">Gestiona imágenes y videos de la galería</p>
            </div>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md"
            >
              <Plus size={20} />
              Agregar Nuevo
            </button>
          </div>

          {/* Filtros */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setFilterTipo("todos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterTipo === "todos" 
                  ? "bg-gray-900 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todos ({items.length})
            </button>
            <button
              onClick={() => setFilterTipo("imagen")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterTipo === "imagen" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Image size={16} />
              Imágenes ({items.filter(i => i.tipo === 'imagen').length})
            </button>
            <button
              onClick={() => setFilterTipo("video")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterTipo === "video" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Video size={16} />
              Videos ({items.filter(i => i.tipo === 'video').length})
            </button>
          </div>
        </div>

        {/* Grid de elementos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {currentItems.map((galleryItem) => (
            <div key={galleryItem.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-48 bg-gray-100">
                {galleryItem.tipo === 'imagen' ? (
                  <img
                    src={galleryItem.imagen}
                    alt={galleryItem.titulo || "Galería"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={galleryItem.imagen}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="text-white" size={40} />
                    </div>
                  </div>
                )}
                
                {/* Badge de tipo */}
                <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold text-white ${
                  galleryItem.tipo === 'imagen' ? 'bg-blue-600' : 'bg-purple-600'
                }`}>
                  {galleryItem.tipo === 'imagen' ? (
                    <span className="flex items-center gap-1">
                      <Image size={12} />
                      Imagen
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Video size={12} />
                      Video
                    </span>
                  )}
                </div>

                {/* Acciones */}
                <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => editItem(galleryItem)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteItem(galleryItem.id)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-600">
                  {galleryItem.tipo === 'imagen' ? 'Imagen' : 'Video'} #{galleryItem.id}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay elementos */}
        {currentItems.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Image className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No hay elementos</h3>
            <p className="text-gray-600 mb-6">
              {filterTipo === "todos" 
                ? "Agrega tu primera imagen o video a la galería" 
                : `No hay ${filterTipo}s en la galería`}
            </p>
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus size={20} />
              Agregar Ahora
            </button>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Anterior
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === i + 1
                    ? "bg-gray-900 text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Modal de Crear/Editar */}
      {dialogVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {editing ? "Editar Elemento" : "Agregar Nuevo Elemento"}
              </h3>
              <button
                onClick={() => setDialogVisible(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Contenido *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipo"
                      value="imagen"
                      checked={item.tipo === "imagen"}
                      onChange={(e) => setItem({ ...item, tipo: e.target.value })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Image size={18} />
                    <span>Imagen</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipo"
                      value="video"
                      checked={item.tipo === "video"}
                      onChange={(e) => setItem({ ...item, tipo: e.target.value })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <Video size={18} />
                    <span>Video</span>
                  </label>
                </div>
              </div>

              {/* Upload de Archivo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {item.tipo === 'imagen' ? 'Imagen' : 'Video'} {!editing && '*'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {previewUrl ? (
                    <div className="space-y-4">
                      {item.tipo === 'imagen' ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                      ) : (
                        <video
                          src={previewUrl}
                          controls
                          className="max-h-48 mx-auto rounded-lg"
                        />
                      )}
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Cambiar archivo
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                      <p className="text-sm text-gray-600 mb-2">
                        {item.tipo === 'imagen' 
                          ? 'Haz clic para seleccionar una imagen'
                          : 'Haz clic para seleccionar un video'}
                      </p>
                      <input
                        type="file"
                        accept={item.tipo === 'imagen' ? 'image/*' : 'video/*'}
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        Seleccionar Archivo
                      </label>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {item.tipo === 'imagen' 
                    ? 'Formatos: JPG, PNG, WEBP. Máx 10MB'
                    : 'Formatos: MP4, WEBM. Máx 50MB'}
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t">
              <button
                onClick={() => setDialogVisible(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveItem}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                {editing ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaAdminView;

