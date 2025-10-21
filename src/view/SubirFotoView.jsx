import { useState, useRef } from "react";
import { Image, Upload, X, Check } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function SubirFotoView() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const fileInputRef = useRef(null);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const filesWithPreview = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadedFiles(prev => [...prev, ...filesWithPreview]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      showToast("Selecciona al menos una imagen", "error");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    uploadedFiles.forEach(({ file }) => {
      formData.append("image", file);
    });

    try {
      const response = await fetch(`${API}/subir-foto`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showToast("Fotos subidas correctamente", "success");
        setUploadedFiles([]);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        showToast("Error al subir las fotos", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Error al subir las fotos", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Subir Fotos a Galería</h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <Image size={18} />
          <span>Galería</span>
          <span>/</span>
          <a href="/administrador" className="hover:text-gray-900">Administración</a>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
              <Image className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Agregar Fotos a la Galería</h2>
            <p className="text-gray-600">Puedes subir múltiples imágenes a la vez</p>
          </div>

          {/* Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
          >
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-700 font-medium mb-2">Arrastra y suelta tus imágenes aquí</p>
            <p className="text-sm text-gray-500 mb-4">o haz clic para seleccionar</p>
            <button
              type="button"
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Seleccionar Fotos
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Vista previa */}
          {uploadedFiles.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Archivos Seleccionados ({uploadedFiles.length})
                </h3>
                <button
                  onClick={() => setUploadedFiles([])}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Limpiar todo
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                {uploadedFiles.map((fileObj, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={fileObj.preview}
                      alt={fileObj.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <p className="text-white text-xs text-center px-2 line-clamp-2">{fileObj.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    Subir {uploadedFiles.length} {uploadedFiles.length === 1 ? 'Foto' : 'Fotos'}
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Nota:</strong> El tamaño máximo por imagen es de 10MB. Formatos aceptados: JPG, PNG, WEBP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
