import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle2, ArrowRight, HeartPulse, Stethoscope, Lock, Database, MailWarning } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const Healthcare: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>Cybersecurity for Healthcare & Hospitals in Ahmedabad | TechDefends</title>
        <meta name="description" content="Protect sensitive patient data with TechDefends' specialized cybersecurity, endpoint protection, and managed IT services for healthcare providers in Ahmedabad." />
        <link rel="canonical" href="https://techdefends.com/industries/healthcare" />
        <meta property="og:title" content="Cybersecurity for Healthcare | TechDefends" />
        <meta property="og:description" content="Protect sensitive patient data with TechDefends' specialized cybersecurity, endpoint protection, and managed IT services for healthcare providers in Ahmedabad." />
        <meta property="og:url" content="https://techdefends.com/industries/healthcare" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cybersecurity for Healthcare",
            "description": "IT security and data protection solutions for hospitals, clinics, and healthcare providers in Ahmedabad.",
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
                 <HeartPulse size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / Industries / Healthcare
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                   Cybersecurity for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-red-400">Healthcare</span>
                 </h1>
               </Reveal>
               <Reveal delay={0.3}>
                 <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                   Protect sensitive patient health information, secure connected medical devices, and ensure uninterrupted care with advanced cybersecurity and managed IT solutions tailored for healthcare providers in Ahmedabad.
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
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Protecting Patient Data & Operational Continuity</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Hospitals, clinics, and diagnostic centers are high-value targets for cyberattacks. Ransomware can cripple critical systems, delaying patient care, while data breaches expose highly sensitive personal health information.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Lock className="text-rose-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ransomware & System Downtime</h3>
                  <p className="text-slate-600">Malicious software encrypting hospital management systems, Electronic Health Records (EHR), and halting clinical operations.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Stethoscope className="text-brand-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Vulnerable Medical Devices</h3>
                  <p className="text-slate-600">Legacy medical equipment and IoT devices connected to the network often lack modern security controls, creating easy entry points for attackers.</p>
                </div>
              </div>
            </Reveal>

            {/* Solutions */}
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">TechDefends Healthcare Solutions</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We implement strict access controls, robust endpoint protection, and reliable disaster recovery plans to keep your healthcare facility running securely.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Database className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Backup, Recovery & Incident Response</h3>
                    <p className="text-slate-600 mb-3">Immutable backups of patient records and swift incident response protocols to ensure operational continuity even during an attack.</p>
                    <Link to="/services/managed-soc" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore Managed Services <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Lock className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Network Security & VAPT</h3>
                    <p className="text-slate-600 mb-3">Network segmentation to isolate critical medical devices, alongside regular vulnerability assessments to identify and patch security gaps.</p>
                    <Link to="/services/network-security" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore Network Security <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <MailWarning className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Email Security & Access Control</h3>
                    <p className="text-slate-600 mb-3">Protecting administrative staff and doctors from phishing attacks while enforcing strict, role-based access to patient data.</p>
                    <Link to="/services/microsoft-365" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Secure Your M365 <ArrowRight size={16} />
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
                  'Ensure the absolute privacy and integrity of patient health information',
                  'Maintain continuous clinical operations by mitigating ransomware threats',
                  'Secure legacy medical equipment through network isolation',
                  'Recover quickly from technical disruptions with robust disaster recovery',
                  'Build trust with patients by demonstrating strong data protection practices'
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
                  <h3 className="text-2xl font-bold mb-4">Secure Patient Data</h3>
                  <p className="text-slate-300 mb-8">
                    Protect your healthcare facility from modern cyber threats with our specialized solutions.
                  </p>
                  <Link 
                    to="/contact?industry=healthcare" 
                    onClick={() => trackEvent('industry_cta_click', { industry: 'Healthcare' })}
                    className="block w-full py-4 px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-center rounded-xl transition-all shadow-lg hover:shadow-brand-500/25 hover:-translate-y-1"
                  >
                    Discuss Your Security Requirements
                  </Link>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Focus Areas</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Patient Data Protection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      
                      <span className="text-slate-600 text-sm">Ransomware Mitigation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Network Segmentation</span>
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

export default Healthcare;
