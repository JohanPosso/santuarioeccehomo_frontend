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
  const [servicio, setServicio] = useState({ nombre: "", descripcion: "" });
  const toast = useRef(null);

  useEffect(() => {
    fetch("http://localhost:4000/find-servicio")
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => console.error("Error cargando servicios:", err));
  }, []);

  const handleChange = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch("http://localhost:4000/crear-servicio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicio),
    })
      .then((res) => res.json())
      .then(() => {
        setServicios([...servicios, servicio]);
        setVisible(false);
        toast.current.show({
          severity: "success",
          summary: "Guardado",
          detail: "Servicio creado",
          life: 3000,
        });
      })
      .catch((err) => console.error("Error al guardar servicio:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/delete-servicio/${id}`, { method: "DELETE" })
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
  };

  const items = [
    { label: "Servicios", icon: "pi pi-list" },
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
          onClick={() => setVisible(true)}
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
                <button className="btn btn-outline-warning">
                  <span
                    className="pi pi-pencil"
                    onClick={() => handleEdit(rowData)}
                  />
                </button>
                <button className="btn btn-outline-danger">
                  <span
                    className="pi pi-trash"
                    onClick={() => handleDelete(rowData.id)}
                  />
                </button>
              </div>
            )}
          />
        </DataTable>

        <Dialog
          header="Nuevo Servicio"
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
              label="Guardar"
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
