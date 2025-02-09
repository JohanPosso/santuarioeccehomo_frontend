import React from "react";
import { FileUpload } from "primereact/fileupload";
import { TabMenu } from "primereact/tabmenu";

const API = import.meta.env.VITE_API_URL;

export default function SubirFotoView() {
  const onUpload = (e) => {
    // Aquí puedes manejar el evento después de que la carga se haya completado
    console.log("Fotos subidas: ", e.files);
  };

  const onError = (e) => {
    // Aquí puedes manejar el error en caso de que falle la carga
    console.error("Error al subir las fotos: ", e.error);
  };
  const items = [
    { label: "Servicios", icon: "pi pi-list" },
    { label: "Administración", icon: "pi pi-home", url: "/administrador" },
  ];
  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Subir foto a galeria</h1>
        </div>
      </section>
      <div className="container py-3">
        <TabMenu model={items} />

        <FileUpload
          name="image"
          url={`${API}/subir-foto`} // URL del backend donde se recibirán las fotos
          multiple
          accept="image/*"
          maxFileSize={10000000} // Tamaño máximo permitido para las fotos
          onUpload={onUpload} // Maneja la respuesta después de la carga
          onError={onError} // Maneja el error si ocurre un fallo
          emptyTemplate={
            <p className="m-0">
              Arrastre y suelte los archivos aquí para cargarlos.
            </p>
          }
        />
      </div>
    </div>
  );
}
