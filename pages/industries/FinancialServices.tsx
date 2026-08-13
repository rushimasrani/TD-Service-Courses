import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle2, ArrowRight, Target, Lock, Building, FileKey, AlertTriangle, Scale } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const FinancialServices: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>Cybersecurity for Financial Services & FinTech in Ahmedabad | TechDefends</title>
        <meta name="description" content="Secure your financial institution or FinTech startup with TechDefends' specialized cybersecurity, VAPT, and managed IT services in Ahmedabad, India." />
        <link rel="canonical" href="https://techdefends.com/industries/financial-services" />
        <meta property="og:title" content="Cybersecurity for Financial Services & FinTech | TechDefends" />
        <meta property="og:description" content="Secure your financial institution or FinTech startup with TechDefends' specialized cybersecurity, VAPT, and managed IT services in Ahmedabad, India." />
        <meta property="og:url" content="https://techdefends.com/industries/financial-services" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cybersecurity for Financial Services",
            "description": "Cybersecurity and managed IT services tailored for the financial sector and FinTech companies in Ahmedabad.",
            "provider": {
              "@type": "Organization",
              "name": "TechDefends",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ahmedabad",
                "addressCountry": "IN"
              }
            }
          })}
        </script>
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-900/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
             <Reveal>
               <div className="p-4 bg-brand-600 rounded-xl shadow-lg shadow-brand-900/50">
                 <Building size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / Industries / Financial Services
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                   Cybersecurity for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-red-400">Financial Services & FinTech</span>
                 </h1>
               </Reveal>
               <Reveal delay={0.3}>
                 <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                   Protect sensitive client financial data, ensure operational resilience, and defend against sophisticated cyber threats with TechDefends' tailored security solutions for financial institutions in Ahmedabad and across India.
                 </p>
               </Reveal>
             </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* Industry Challenges & Risks */}
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">The High-Stakes Threat Landscape</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Financial institutions and FinTech companies are primary targets for cybercriminals. A single breach can lead to devastating financial loss, regulatory penalties, and irreparable reputational damage.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <AlertTriangle className="text-rose-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Data Breaches & Ransomware</h3>
                  <p className="text-slate-600">Targeted attacks aiming to exfiltrate confidential customer financial records or lock critical trading and banking systems.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Scale className="text-brand-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Compliance Pressures</h3>
                  <p className="text-slate-600">Stringent requirements to maintain data protection standards, ensuring strict access controls and robust audit trails.</p>
                </div>
              </div>
            </Reveal>

            {/* Solutions */}
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">TechDefends Financial Security Solutions</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We provide end-to-end security architectures designed specifically for the rigorous demands of the financial sector.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Target className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">VAPT & Infrastructure Assessment</h3>
                    <p className="text-slate-600 mb-3">Comprehensive Vulnerability Assessment and Penetration Testing for core banking applications, payment gateways, and trading platforms.</p>
                    <Link to="/services/vapt" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore VAPT <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Lock className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Managed Network Security & Firewall</h3>
                    <p className="text-slate-600 mb-3">Next-generation firewall configuration, encrypted VPN tunnels, and zero-trust network access to secure sensitive data in transit.</p>
                    <Link to="/services/network-security" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore Network Security <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <FileKey className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Microsoft 365 & Email Security</h3>
                    <p className="text-slate-600 mb-3">Protect against Business Email Compromise (BEC), phishing, and secure internal communications with advanced M365 hardening and data loss prevention (DLP).</p>
                    <Link to="/services/microsoft-365" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore M365 Security <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Implementation & Benefits */}
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Business Benefits</h2>
              <ul className="space-y-4">
                {[
                  'Safeguard client financial data and intellectual property',
                  'Maintain high availability and business continuity',
                  'Support compliance readiness through robust security controls',
                  'Reduce the financial risk associated with data breaches',
                  'Enhance client trust and brand reputation'
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

          </div>

          {/* Sidebar CTA & Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Reveal delay={0.2}>
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-900/20 mb-8 border border-slate-800">
                  <h3 className="text-2xl font-bold mb-4">Secure Your Financial Infrastructure</h3>
                  <p className="text-slate-300 mb-8">
                    Partner with Ahmedabad's trusted cybersecurity experts to protect your financial institution.
                  </p>
                  <Link 
                    to="/contact?industry=financial-services" 
                    onClick={() => trackEvent('industry_cta_click', { industry: 'Financial Services' })}
                    className="block w-full py-4 px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-center rounded-xl transition-all shadow-lg hover:shadow-brand-500/25 hover:-translate-y-1"
                  >
                    Book a Financial Security Assessment
                  </Link>
                  <p className="text-xs text-slate-400 mt-4 text-center">
                    Strict confidentiality maintained for all inquiries.
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Why TechDefends?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Enterprise-grade security solutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Local expertise based in Ahmedabad</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Zero-trust architecture implementation</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialServices;
