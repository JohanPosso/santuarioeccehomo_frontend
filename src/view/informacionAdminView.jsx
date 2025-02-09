import { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { TabMenu } from "primereact/tabmenu";
import { FileUpload } from "primereact/fileupload";

const InformacionView = () => {
  const [data, setData] = useState(null);
  const toast = useRef(null);
  const logoRef = useRef(null);
  const imagenSec1Ref = useRef(null);
  const imagenSec2Ref = useRef(null);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Cargar datos al iniciar
    fetch(`${API}/find-data`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) setData(result[0]); // Establecer los datos si existen
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  const handleChange = (e) => {
    // Manejar cambios en los campos del formulario
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    if (logoRef.current?.files?.[0]) {
      formData.append("logo", logoRef.current.files[0]);
    }
    if (imagenSec1Ref.current?.files?.[0]) {
      formData.append("imagen_sec1", imagenSec1Ref.current.files[0]);
    }
    if (imagenSec2Ref.current?.files?.[0]) {
      formData.append("imagen_sec2", imagenSec2Ref.current.files[0]);
    }

    fetch(`${API}/edit-data`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Actualizado",
          detail: "Datos actualizados correctamente",
          life: 3000,
        });

        // Recargar los datos después de la actualización
        fetch(`${API}/find-data`)
          .then((res) => res.json())
          .then((result) => {
            if (result.length > 0) setData(result[0]); // Actualizar el estado con los datos nuevos
          })
          .catch((err) => console.error("Error recargando datos:", err));
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo actualizar",
          life: 3000,
        });
        console.error("Error actualizando datos:", err);
      });
  };

  const handleImageUpload = (e, fieldName) => {
    const file = e.files[0]; // Obtener el archivo subido
    setData((prevState) => ({
      ...prevState,
      [fieldName]: file, // Guardar el archivo en el estado
    }));
  };

  if (!data) return <p>Cargando datos...</p>; // Mostrar mensaje mientras se cargan los datos

  const items = [
    { label: "Informacion", icon: "pi pi-list" },
    {
      label: "Administracion",
      icon: "pi pi-home",
      url: "/administrador",
    },
  ];

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Editar Información</h1>
        </div>
      </section>
      <div className="p-4">
        <Toast ref={toast} />{" "}
        {/* Notificación para mostrar el estado del proceso */}
        <TabMenu model={items} /> {/* Menú de pestañas */}
        {/* Panel para Información General */}
        <Panel header="Información General" className="mb-4">
          <div className="p-fluid grid">
            <div className="col-12 md:col-6">
              <label>Correo</label>
              <InputText
                name="correo"
                value={data.correo}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 md:col-6">
              <label>Número</label>
              <InputText
                name="numero"
                value={data.numero}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label>Ubicación</label>
              <InputText
                name="ubicacion"
                value={data.ubicacion}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label>Misión</label>
              <textarea
                className="form-control"
                rows={5}
                name="mision"
                value={data.mision}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label>Visión</label>
              <textarea
                className="form-control"
                rows={5}
                name="vision"
                value={data.vision}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label>Sobre Nosotros</label>
              <textarea
                className="form-control"
                rows={5}
                name="sobrenosotros"
                value={data.sobrenosotros}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label>Reseña</label>
              <textarea
                className="form-control"
                rows={5}
                name="resena"
                value={data.resena}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 md:col-4">
              <label>Facebook</label>
              <InputText
                name="facebook"
                value={data.facebook}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 md:col-4">
              <label>Instagram</label>
              <InputText
                name="instagram"
                value={data.instagram}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 md:col-4">
              <label>Twitter</label>
              <InputText
                name="twitter"
                value={data.twitter}
                onChange={handleChange}
              />
            </div>
          </div>
        </Panel>
        {/* Panel para Logo */}
        <Panel header="Logo" className="mb-4">
          <div className="p-fluid">
            <label>Logo</label>
            {data.logo && (
              <div>
                <img
                  src={`${API}/image/${data.logo}`}
                  alt="Logo Actual"
                  width="100"
                />
              </div>
            )}
            <FileUpload
              ref={logoRef}
              name="logo"
              accept="image/*"
              maxFileSize={5000000}
              customUpload
              uploadHandler={(e) => handleImageUpload(e, "logo")}
              emptyTemplate={
                <p className="m-0">Arrastra y suelta un archivo para subir</p>
              }
            />
          </div>
        </Panel>
        {/* Panel para Sección 1 */}
        <Panel header="Sección 1" className="mb-4">
          <div className="p-fluid">
            <label>Título</label>
            <InputText
              name="seccion_1titulo"
              value={data.seccion_1titulo}
              onChange={handleChange}
            />
            <label>Descripción</label>
            <textarea
              className="form-control"
              rows={5}
              name="seccion_1descripcion"
              value={data.seccion_1descripcion}
              onChange={handleChange}
            />
            <label>Imagen Sección 1</label>
            {data.imagen_sec1 && (
              <div>
                <img
                  src={`${API}/image/${data.imagen_sec1}`}
                  alt="Imagen Sección 1"
                  width="100"
                />
              </div>
            )}
            <FileUpload
              name="imagen_sec1"
              accept="image/*"
              maxFileSize={5000000}
              customUpload
              uploadHandler={(e) => handleImageUpload(e, "imagen_sec1")}
              emptyTemplate={
                <p className="m-0">Arrastra y suelta un archivo para subir</p>
              }
            />
          </div>
        </Panel>
        {/* Panel para Sección 2 */}
        <Panel header="Sección 2" className="mb-4">
          <div className="p-fluid">
            <label>Título</label>
            <InputText
              name="seccion_2titulo"
              value={data.seccion_2titulo}
              onChange={handleChange}
            />
            <label>Descripción</label>
            <textarea
              className="form-control"
              rows={5}
              name="seccion_2descripcion"
              value={data.seccion_2descripcion}
              onChange={handleChange}
            />
            <label>Imagen Sección 2</label>
            {data.imagen_sec2 && (
              <div>
                <img
                  src={`${API}/image/${data.imagen_sec2}`}
                  alt="Imagen Sección 2"
                  width="100"
                />
              </div>
            )}
            <FileUpload
              name="imagen_sec2"
              accept="image/*"
              maxFileSize={5000000}
              customUpload
              uploadHandler={(e) => handleImageUpload(e, "imagen_sec2")}
              emptyTemplate={
                <p className="m-0">Arrastra y suelta un archivo para subir</p>
              }
            />
          </div>
        </Panel>
        {/* Botón para actualizar la información */}
        <div className="text-center mt-4">
          <Button
            label="Actualizar Información"
            icon="pi pi-save"
            className="p-button-success"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default InformacionView;
