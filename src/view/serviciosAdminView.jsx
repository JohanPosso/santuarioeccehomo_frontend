import { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { TabMenu } from "primereact/tabmenu";

import "primeicons/primeicons.css";

const ServiciosView = () => {
  const [servicios, setServicios] = useState([]);
  const [visible, setVisible] = useState(false);
  const [servicio, setServicio] = useState({
    id: null,
    nombre: "",
    descripcion: "",
  });
  const toast = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`${API}/find-servicio`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => console.error("Error cargando servicios:", err));
  }, []);

  const handleChange = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const url = isEditing
      ? `${API}/update-servicio/${servicio.id}` // Para editar
      : `${API}/crear-servicio`; // Para crear
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicio),
    })
      .then((res) => res.json())
      .then((savedServicio) => {
        if (isEditing) {
          // Actualiza el servicio en la lista sin necesidad de recargar
          fetch(`${API}/find-servicio`)
            .then((res) => res.json())
            .then((data) => {
              setServicios(data); // Actualiza el estado con los nuevos servicios
            });
        } else {
          setServicios((prevServicios) => [...prevServicios, savedServicio]); // Agrega el nuevo servicio
        }

        // Cierra el diálogo y limpia el formulario
        setVisible(false);
        setServicio({ nombre: "", descripcion: "" });

        toast.current.show({
          severity: "success",
          summary: isEditing ? "Actualizado" : "Guardado",
          detail: isEditing ? "Servicio actualizado" : "Servicio creado",
          life: 3000,
        });
      })
      .catch((err) => console.error("Error guardando servicio:", err));
  };

  const handleDelete = (id) => {
    fetch(`${API}/delete-servicio/${id}`, { method: "DELETE" })
      .then(() => {
        setServicios(servicios.filter((s) => s.id !== id));
        toast.current.show({
          severity: "warn",
          summary: "Eliminado",
          detail: "Servicio eliminado",
          life: 3000,
        });
      })
      .catch((err) => console.error("Error eliminando servicio:", err));
  };

  const handleEdit = (rowData) => {
    setServicio(rowData);
    setVisible(true);
    setIsEditing(true); // Cambia el estado a edición
  };

  const items = [
    { label: "Servicios", icon: "pi pi-list" },
    { label: "Administración", icon: "pi pi-home", url: "/administrador" },
  ];

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Gestión de Servicios</h1>
        </div>
      </section>
      <div className="p-4">
        <TabMenu model={items} />

        <Toast ref={toast} />
        <Button
          label="Nuevo Servicio"
          icon="pi pi-plus"
          className="p-button-success mb-3"
          onClick={() => {
            setServicio({ id: null, nombre: "", descripcion: "" });
            setIsEditing(false);
            setVisible(true);
          }}
        />

        <DataTable
          stripedRows
          value={servicios}
          paginator
          rows={5}
          responsiveLayout="scroll"
        >
          <Column field="nombre" header="Nombre" sortable />
          <Column field="descripcion" header="Descripción" sortable />
          <Column
            header="Acciones"
            body={(rowData) => (
              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleEdit(rowData)}
                >
                  <span className="pi pi-pencil" />
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(rowData.id)}
                >
                  <span className="pi pi-trash" />
                </button>
              </div>
            )}
          />
        </DataTable>

        <Dialog
          header={isEditing ? "Editar Servicio" : "Nuevo Servicio"}
          visible={visible}
          style={{ width: "30vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="p-fluid">
            <label>Nombre</label>
            <InputText
              name="nombre"
              value={servicio.nombre}
              onChange={handleChange}
            />
            <label>Descripción</label>
            <InputText
              name="descripcion"
              value={servicio.descripcion}
              onChange={handleChange}
            />
          </div>
          <div className="text-right mt-3">
            <Button
              label={isEditing ? "Actualizar" : "Guardar"}
              icon="pi pi-check"
              className="p-button-success"
              onClick={handleSave}
            />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default ServiciosView;
