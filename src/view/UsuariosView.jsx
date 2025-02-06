import { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { TabMenu } from "primereact/tabmenu";

import "primeicons/primeicons.css";

const UsuariosView = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [visible, setVisible] = useState(false);
  const [usuario, setUsuario] = useState({
    id: null,
    name: "",
    lastname: "",
    email: "",
    password: "", // Nuevo campo para contraseña
  });
  const [isEditing, setIsEditing] = useState(false);
  const toast = useRef(null);
  const API = import.meta.env.VITE_API_URL;

  // Función para obtener usuarios
  const fetchUsuarios = () => {
    fetch(`${API}/get-usuarios`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error cargando usuarios:", err));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const url = isEditing
      ? `${API}/edit-usuarios/${usuario.id}`
      : `${API}/crear`;
    const method = isEditing ? "PUT" : "POST";

    // Validar que se ingrese la contraseña al crear un usuario
    if (!isEditing && !usuario.password.trim()) {
      toast.current.show({
        severity: "warn",
        summary: "Contraseña requerida",
        detail: "Debe ingresar una contraseña para el nuevo usuario",
        life: 3000,
      });
      return;
    }

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then(() => {
        fetchUsuarios(); // Recargar la lista tras guardar
        setVisible(false);
        setUsuario({
          id: null,
          name: "",
          lastname: "",
          email: "",
          password: "",
        });
        toast.current.show({
          severity: "success",
          summary: isEditing ? "Actualizado" : "Guardado",
          detail: isEditing ? "Usuario actualizado" : "Usuario creado",
          life: 3000,
        });
      })
      .catch((err) => console.error("Error guardando usuario:", err));
  };

  const handleDelete = (id) => {
    fetch(`${API}/delete-usuarios/${id}`, { method: "DELETE" })
      .then(() => {
        fetchUsuarios(); // Recargar la lista tras eliminar
        toast.current.show({
          severity: "warn",
          summary: "Eliminado",
          detail: "Usuario eliminado",
          life: 3000,
        });
      })
      .catch((err) => console.error("Error eliminando usuario:", err));
  };

  const handleEdit = (rowData) => {
    setUsuario({ ...rowData, password: "" }); // La contraseña no se edita aquí
    setIsEditing(true);
    setVisible(true);
  };

  const items = [
    { label: "Servicios", icon: "pi pi-list" },
    { label: "Administración", icon: "pi pi-home", url: "/administrador" },
  ];

  return (
    <div>
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Contactatenos</h1>
        </div>
      </section>
      <Toast ref={toast} />
      <div className="container">
        <TabMenu model={items} />
        <Button
          label="Nuevo Usuario"
          icon="pi pi-plus"
          className="p-button-success mb-3"
          onClick={() => {
            setUsuario({
              id: null,
              name: "",
              lastname: "",
              email: "",
              password: "",
            });
            setIsEditing(false);
            setVisible(true);
          }}
        />

        <DataTable
          stripedRows
          value={usuarios}
          paginator
          rows={5}
          responsiveLayout="scroll"
        >
          <Column field="name" header="Nombre" sortable />
          <Column field="lastname" header="Apellido" sortable />
          <Column field="email" header="Correo Electrónico" sortable />
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
          header={isEditing ? "Editar Usuario" : "Nuevo Usuario"}
          visible={visible}
          style={{ width: "30vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="p-fluid">
            <label>Nombre</label>
            <InputText
              name="name"
              value={usuario.name}
              onChange={handleChange}
            />
            <label>Apellido</label>
            <InputText
              name="lastname"
              value={usuario.lastname}
              onChange={handleChange}
            />
            <label>Correo Electrónico</label>
            <InputText
              name="email"
              value={usuario.email}
              onChange={handleChange}
            />
            {!isEditing && ( // Solo mostrar la contraseña al crear un usuario
              <>
                <label>Contraseña</label>
                <InputText
                  name="password"
                  type="password"
                  value={usuario.password}
                  onChange={handleChange}
                />
              </>
            )}
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

export default UsuariosView;
