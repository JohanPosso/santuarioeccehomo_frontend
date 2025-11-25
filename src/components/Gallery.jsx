import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

const Gallery = () => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    fetch(`${API}/find-galeria`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Validar que la respuesta sea un array
        if (Array.isArray(data)) {
          setImagenes(data);
        } else if (data && Array.isArray(data.data)) {
          setImagenes(data.data);
        } else if (data && data.error) {
          console.error("Error del servidor:", data.error, data.message);
          setImagenes([]);
        } else {
          console.warn("Respuesta inesperada del servidor:", data);
          setImagenes([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching gallery:", error);
        setImagenes([]);
      });
  }, [API]); // Se ejecuta solo una vez al montar el componente

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Galeria de fotos</h1>
        </div>
      </section>

      <section className="gallery py-80">
        <div className="container-fluid">
          <div className="row row-gap-4">
            {imagenes.length > 0 ? (
              // Mapea las imágenes desde el estado
              imagenes.map((imagen) => (
                <div key={imagen.id} className="col-xl-3 col-md-6">
                  <div className="img-gallery">
                    {/* Muestra la imagen si existe, si no, muestra un placeholder */}
                    <img
                      src={imagen.imagen || "/media/gallery/placeholder.jpg"}
                      alt={`Gallery ${imagen.id}`}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>Cargando imágenes...</p> // Muestra un mensaje de carga mientras se obtienen las imágenes
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
