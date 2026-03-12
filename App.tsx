import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WritingBank from './pages/WritingBank';
import Library from './pages/Library';
import NLPTool from './pages/NLPTool';
import PublishPolicy from './pages/PublishPolicy';
import Login from './pages/Login';
import SearchResults from './pages/SearchResults';
import RequestPublication from './pages/RequestPublication';
import AcademicParaphraser from './pages/AcademicParaphraser';
import CitationGenerator from './pages/CitationGenerator';
import StylisticAuditor from './pages/StylisticAuditor';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Sitemap from './pages/Sitemap';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => {
  // إضافة حالة لإدارة اللغة
  const [lang, setLang] = useState<"ar" | "en">("en");

  const toggleLang = () => {
    setLang(prev => (prev === "en" ? "ar" : "en"));
  };

  return (
    <Router>
      <ScrollToTop />
      <Layout lang={lang} toggleLang={toggleLang}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing-bank" element={<WritingBank />} />
          <Route path="/paraphraser" element={<AcademicParaphraser />} />
          <Route path="/library" element={<Library />} />
          <Route path="/nlp-tool" element={<NLPTool />} />
          <Route path="/citations" element={<CitationGenerator />} />
          <Route path="/stylistic-auditor" element={<StylisticAuditor />} />
          <Route path="/publish-with-us" element={<PublishPolicy />} />
          <Route path="/request-publication" element={<RequestPublication />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
