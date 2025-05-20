import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/index";
import Services from "./pages/Services/index";
import Methodology from "./pages/Methodology/index";
import Cases from "./pages/Cases/index";
import About from "./pages/About/index";
import Contact from "./pages/Contact/index";
import Blog from "./pages/Blog/index";
import BlogPost from "./pages/Blog/BlogPost";

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
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<div className="container-custom py-32 min-h-screen"><h1 className="text-4xl mb-4">Página não encontrada</h1><p>A página que você está procurando não existe.</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
