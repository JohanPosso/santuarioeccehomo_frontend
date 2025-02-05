import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useUser(); // Usa el contexto de usuario
  const navigate = useNavigate(); // Para redirigir después del login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reiniciar errores al intentar nuevamente

    try {
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API}/token`, {
        email,
        password,
      });

      const userData = response.data;
      login(userData); // Guarda en el contexto

      if (remember) {
        localStorage.setItem("user", JSON.stringify(userData)); // Guarda en localStorage si está marcado
      }

      console.log("Login successful", userData);
      navigate("/administrador"); // Redirige sin recargar
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      setError("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <div className="content">
      <section className="title-banner">
        <div className="container-fluid">
          <h1 className="white fw-700 text-center">Inicio de sesión</h1>
        </div>
      </section>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/src/assets/media/backgrounds/iglesia_bg.png"
              alt="Image"
              className="img-fluid"
            />
          </div>
          <div className="col-md-6 contents py-4">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4">
                  <p className="mb-4">
                    Ingresa tus credenciales para acceder al panel de
                    administración.
                  </p>
                </div>
                {error && <p className="alert alert-danger">{error}</p>}
                <form onSubmit={handleLogin}>
                  <div className="form-group first">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group last mb-4">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex mb-5 align-items-center">
                    <label className="control control--checkbox mb-0">
                      <span className="caption">Recordarme</span>
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                      <div className="control__indicator"></div>
                    </label>
                  </div>
                  <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="btn btn-block btn-primary"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
