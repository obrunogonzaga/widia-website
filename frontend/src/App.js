import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Methodology from "./pages/Methodology";
import Cases from "./pages/Cases";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/metodologia" element={<Methodology />} />
          <Route path="/casos" element={<Cases />} />
          {/* Placeholder routes */}
          <Route path="/sobre" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Sobre</h1><p>Página em desenvolvimento</p></div>} />
          <Route path="/contato" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Contato</h1><p>Página em desenvolvimento</p></div>} />
          <Route path="*" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Página não encontrada</h1><p>A página que você está procurando não existe.</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
