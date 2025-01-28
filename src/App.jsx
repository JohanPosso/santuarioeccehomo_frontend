import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import "./App.css";

const App = () => {
  return (
    <Router>
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
                  <Gallery />
                </>
              }
            />
            <Route path="/blogs" element={<BlogGrid />} />
            <Route path="/blog-detalle" element={<BlogDetalle />} />
            <Route path="/blog-detalle/:id" element={<BlogDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/servicios" element={<ServiciosGrid />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
