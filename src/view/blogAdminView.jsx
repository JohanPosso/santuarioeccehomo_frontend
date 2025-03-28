import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { TabMenu } from "primereact/tabmenu";

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
  const toast = React.useRef(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API}/findblog`)
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  const openNew = () => {
    setBlog({ name: "", description: "", image: "", link: "" });
    setEditing(false);
    setDialogVisible(true);
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

    toast.current.show({
      severity: "success",
      summary: "Éxito",
      detail: `Blog ${editing ? "actualizado" : "creado"}`,
      life: 3000,
    });
    setDialogVisible(false);
    window.location.reload();
  };

  const deleteBlog = async (id) => {
    await fetch(`${API}/deleteblog/${id}`, {
      method: "DELETE",
    });

    toast.current.show({
      severity: "success",
      summary: "Éxito",
      detail: "Blog eliminado",
      life: 3000,
    });
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  const editBlog = (rowData) => {
    setBlog(rowData);
    setEditing(true);
    setDialogVisible(true);
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.image}`}
        alt={rowData.name}
        style={{ width: "100px" }}
      />
    );
  };
  const items = [
    { label: "Blog", icon: "pi pi-list" },
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

      <div className="containerd p-4">
        <TabMenu model={items} />

        <Toast ref={toast} />
        <Button label="Nuevo Blog" icon="pi pi-plus" onClick={openNew} />
        <DataTable
          stripedRows
          value={blogs}
          paginator
          rows={5}
          responsiveLayout="scroll"
        >
          <Column field="name" header="Nombre" sortable />
          <Column field="description" header="Descripción" sortable />
          <Column field="link" header="Creador" sortable />
          <Column body={imageBodyTemplate} header="Imagen" />
          <Column
            body={(rowData) => (
              <>
                <Button icon="pi pi-pencil" onClick={() => editBlog(rowData)} />
                <Button
                  icon="pi pi-trash"
                  className="p-button-danger"
                  onClick={() => deleteBlog(rowData.id)}
                />
              </>
            )}
            header="Acciones"
          />
        </DataTable>

        <Dialog
          visible={dialogVisible}
          style={{ width: "450px" }}
          header="Detalles del Blog"
          modal
          onHide={() => setDialogVisible(false)}
        >
          <div className="p-fluid">
            <label>Creador</label>
            <InputText
              value={blog.link}
              onChange={(e) => setBlog({ ...blog, link: e.target.value })}
            />
            <label>Titulo</label>
            <InputText
              value={blog.name}
              onChange={(e) => setBlog({ ...blog, name: e.target.value })}
            />

            <label>Descripción</label>
            <InputTextarea
              value={blog.description}
              onChange={(e) =>
                setBlog({ ...blog, description: e.target.value })
              }
            />

            <label>Imagen</label>
            <FileUpload
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              auto
              chooseLabel="Seleccionar"
              customUpload
              uploadHandler={(event) => {
                if (event.files.length > 0) {
                  setBlog({ ...blog, image: event.files[0] });
                }
              }}
            />
          </div>
          <Button label="Guardar" icon="pi pi-check" onClick={saveBlog} />
        </Dialog>
      </div>
    </div>
  );
};

export default Blogview;
