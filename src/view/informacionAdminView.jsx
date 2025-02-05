import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { TabMenu } from "primereact/tabmenu";
import { useRef } from "react";

const InformacionView = () => {
  const [data, setData] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    fetch(`${API}/find-data`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) setData(result[0]);
      })
      .catch((err) => console.error("Error cargando datos:", err));
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch(`${API}/edit-data`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Actualizado",
          detail: "Datos actualizados correctamente",
          life: 3000,
        });
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

  if (!data) return <p>Cargando datos...</p>;
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
      <section class="title-banner">
        <div class="container-fluid">
          <h1 class="white fw-700 text-center">Editar Información</h1>
        </div>
      </section>
      <div className="p-4">
        <Toast ref={toast} />

        <TabMenu model={items} />

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
          </div>
        </Panel>

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
          </div>
        </Panel>

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
          </div>
        </Panel>

        <Panel header="Valores de la Iglesia" className="mb-4">
          <div className="p-fluid">
            <label>Misión</label>
            <textarea
              className="form-control"
              rows={3}
              name="mision"
              value={data.mision}
              onChange={handleChange}
            />
            <label>Visión</label>
            <textarea
              className="form-control"
              rows={3}
              name="vision"
              value={data.vision}
              onChange={handleChange}
            />
            <label>Sobre Nosotros</label>
            <textarea
              className="form-control"
              rows={3}
              name="sobrenosotros"
              value={data.sobrenosotros}
              onChange={handleChange}
            />
            <label>Reseña</label>
            <textarea
              className="form-control"
              rows={3}
              name="resena"
              value={data.resena}
              onChange={handleChange}
            />
          </div>
        </Panel>

        <Panel header="Redes Sociales" className="mb-4">
          <div className="p-fluid grid">
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
