import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

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
          {/* Placeholder routes */}
          <Route path="/servicos" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Serviços</h1><p>Página em desenvolvimento</p></div>} />
          <Route path="/metodologia" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Metodologia</h1><p>Página em desenvolvimento</p></div>} />
          <Route path="/casos" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Casos</h1><p>Página em desenvolvimento</p></div>} />
          <Route path="/sobre" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Sobre</h1><p>Página em desenvolvimento</p></div>} />
          <Route path="/contato" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Contato</h1><p>Página em desenvolvimento</p></div>} />
          <Route path="*" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Página não encontrada</h1><p>A página que você está procurando não existe.</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
