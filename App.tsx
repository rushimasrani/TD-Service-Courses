import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import ServiceDetail from './pages/ServiceDetail';

import VaptService from './pages/services/Vapt';
import ManagedSocService from './pages/services/ManagedSoc';
import Microsoft365Service from './pages/services/Microsoft365';
import NetworkSecurityService from './pages/services/NetworkSecurity';

import CourseDetail from './pages/CourseDetail';

import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';

import PrivacyPolicy from './pages/PrivacyPolicy';
import Trainings from './pages/Trainings';

import FinancialServices from './pages/industries/FinancialServices';
import CAFirms from './pages/industries/CAFirms';
import ITCompanies from './pages/industries/ITCompanies';
import SmesStartups from './pages/industries/SmesStartups';
import Healthcare from './pages/industries/Healthcare';

import ChatWidget from './components/ChatWidget';
import WhatsAppButton from './components/WhatsAppButton';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/trainings" element={<Trainings />} />

            {/* Industries */}
            <Route path="/industries/financial-services" element={<FinancialServices />} />
            <Route path="/industries/ca-accounting-firms" element={<CAFirms />} />
            <Route path="/industries/it-companies" element={<ITCompanies />} />
            <Route path="/industries/smes-startups" element={<SmesStartups />} />
            <Route path="/industries/healthcare" element={<Healthcare />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            
            <Route path="/services/vapt" element={<VaptService />} />
            <Route path="/services/managed-soc" element={<ManagedSocService />} />
            <Route path="/services/microsoft-365" element={<Microsoft365Service />} />
            <Route path="/services/network-security" element={<NetworkSecurityService />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            
            {/* Phase 6 Routes */}
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
};

export default App;