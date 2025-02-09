import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // Importa el componente
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Events from "./components/Events";
import Team from "./components/Team";
import Blog from "./components/Blogs/Blog";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import MassTime from "./components/MassTime";
import ChooseUs from "./components/ChooseUs";
import TeamSection from "./components/TeamSection";
import BlogGrid from "./components/Blogs/BlogGrid";
import BlogDetalle from "./components/Blogs/BlogDetalle";
import Contacto from "./components/Contacto";
import ServiciosGrid from "./components/ServiciosGrid";
import AdminEndpoints from "./components/AdminView";
import InformacionView from "./view/informacionAdminView";
import ServiciosView from "./view/serviciosAdminView";
import BlogView from "./view/blogAdminView";
import NotFoundPage from "./view/NotFoundPage";
import LoginView from "./view/loginView";
import SobreNosotros from "./components/SobreNosotros";
import UsuariosView from "./view/UsuariosView";
import PreguntasFrecuentes from "./components/PreguntasFrecuentes";
import DonacionesView from "./view/DonacionesView";
import SubirFotoView from "./view/SubirFotoView";
import "./App.css";

function AppContent() {
  return (
    <div className="tt-smooth-scroll">
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Services />
                <Events />
                <Team />
                <MassTime />
                <ChooseUs />
                <TeamSection />
                <Blog />
                <PreguntasFrecuentes />
              </>
            }
          />
          <Route path="/blogs" element={<BlogGrid />} />
          <Route path="/blog-detalle" element={<BlogDetalle />} />
          <Route path="/blog-detalle/:id" element={<BlogDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/servicios" element={<ServiciosGrid />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/donaciones" element={<DonacionesView />} />

          {/* RUTAS PROTEGIDAS */}
          <Route
            path="/administrador"
            element={<ProtectedRoute element={<AdminEndpoints />} />}
          />
          <Route
            path="/informacion-view"
            element={<ProtectedRoute element={<InformacionView />} />}
          />
          <Route
            path="/servicios-view"
            element={<ProtectedRoute element={<ServiciosView />} />}
          />
          <Route
            path="/blog-view"
            element={<ProtectedRoute element={<BlogView />} />}
          />
          <Route
            path="/usuarios-view"
            element={<ProtectedRoute element={<UsuariosView />} />}
          />
          <Route
            path="/galeria-view"
            element={<ProtectedRoute element={<SubirFotoView />} />}
          />

          <Route path="/login" element={<LoginView />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;
