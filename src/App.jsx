import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";

// Componentes principales
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Events from "./components/Events";
import Team from "./components/Team";
import Blog from "./components/Blogs/Blog";
import Footer from "./components/Footer";
import MassTime from "./components/MassTime";
import PreguntasFrecuentes from "./components/PreguntasFrecuentes";
import PersonalSection from "./components/PersonalSection";

// Páginas
import BlogGridModerno from "./components/Blogs/BlogGridModerno";
import BlogDetalle from "./components/Blogs/BlogDetalle";
import ContactoModerno from "./components/ContactoModerno";
import ServiciosGridModerno from "./components/ServiciosGridModerno";
import SobreNosotrosModerno from "./components/SobreNosotrosModerno";
import GaleriaView from "./view/GaleriaView";
import DonacionesView from "./view/DonacionesView";

// Admin
import AdminEndpoints from "./components/AdminView";
import InformacionView from "./view/informacionAdminView";
import ServiciosView from "./view/serviciosAdminView";
import BlogView from "./view/blogAdminView";
import UsuariosView from "./view/UsuariosView";
import GaleriaAdminView from "./view/GaleriaAdminView";
import LoginView from "./view/loginView";
import NotFoundPage from "./view/NotFoundPage";
import PersonalAdminView from "./view/PersonalAdminView";
import HorariosAdminView from "./view/HorariosAdminView";
import CalendarioAdminView from "./view/CalendarioAdminView";
import CalendarioView from "./view/CalendarioView";

import "./App.css";

function AppContent() {
  const location = useLocation();
  
  // Rutas que no deben mostrar Header y Footer
  const isAdminRoute = location.pathname.includes('/administrador') || 
                       location.pathname.includes('-view') || 
                       location.pathname === '/login';

  return (
    <div>
      {!isAdminRoute && <Header />}
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
                <PersonalSection />
                <Team />
                <MassTime />
                <Blog />
                <PreguntasFrecuentes />
              </>
            }
          />
          
          <Route path="/blogs" element={<BlogGridModerno />} />
          <Route path="/blog-detalle/:id" element={<BlogDetalle />} />
          <Route path="/contacto" element={<ContactoModerno />} />
          <Route path="/servicios" element={<ServiciosGridModerno />} />
          <Route path="/galeria" element={<GaleriaView />} />
          <Route path="/donaciones" element={<DonacionesView />} />
          <Route path="/sobre-nosotros" element={<SobreNosotrosModerno />} />
          <Route path="/calendario" element={<CalendarioView />} />

          {/* Admin Routes */}
          <Route path="/administrador" element={<ProtectedRoute element={<AdminEndpoints />} />} />
          <Route path="/informacion-view" element={<ProtectedRoute element={<InformacionView />} />} />
          <Route path="/servicios-view" element={<ProtectedRoute element={<ServiciosView />} />} />
          <Route path="/blog-view" element={<ProtectedRoute element={<BlogView />} />} />
          <Route path="/usuarios-view" element={<ProtectedRoute element={<UsuariosView />} />} />
          <Route path="/galeria-view" element={<ProtectedRoute element={<GaleriaAdminView />} />} />
          <Route path="/personal-view" element={<ProtectedRoute element={<PersonalAdminView />} />} />
          <Route path="/horarios-view" element={<ProtectedRoute element={<HorariosAdminView />} />} />
          <Route path="/calendario-view" element={<ProtectedRoute element={<CalendarioAdminView />} />} />
          <Route path="/login" element={<LoginView />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
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
