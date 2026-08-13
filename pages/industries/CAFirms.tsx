import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle2, ArrowRight, Lock, Briefcase, MailWarning, Database, Users } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const CAFirms: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>IT & Cybersecurity for CA & Accounting Firms in Ahmedabad | TechDefends</title>
        <meta name="description" content="Protect sensitive client data and secure your accounting practice with TechDefends' specialized Microsoft 365, email, and endpoint security services in Ahmedabad." />
        <link rel="canonical" href="https://techdefends.com/industries/ca-accounting-firms" />
        <meta property="og:title" content="Cybersecurity for CA & Accounting Firms | TechDefends" />
        <meta property="og:description" content="Protect sensitive client data and secure your accounting practice with TechDefends' specialized Microsoft 365, email, and endpoint security services in Ahmedabad." />
        <meta property="og:url" content="https://techdefends.com/industries/ca-accounting-firms" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cybersecurity for CA & Accounting Firms",
            "description": "Tailored IT security and managed services for Chartered Accountants and accounting firms in Ahmedabad.",
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
                 <Briefcase size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / Industries / CA & Accounting Firms
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                   Cybersecurity for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-red-400">CA & Accounting Firms</span>
                 </h1>
               </Reveal>
               <Reveal delay={0.3}>
                 <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                   Chartered Accountants handle highly sensitive financial data. We provide robust email security, endpoint protection, and secure remote working solutions for accounting practices in Ahmedabad.
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
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Securing Client Financial Data</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Accounting firms hold the keys to sensitive tax records, payroll data, and corporate financials. This makes your firm a prime target for phishing campaigns and business email compromise (BEC).
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <MailWarning className="text-rose-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Email Phishing & BEC</h3>
                  <p className="text-slate-600">Attackers frequently spoof executives or clients to intercept wire transfers and steal confidential documents.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Users className="text-brand-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Remote Work Vulnerabilities</h3>
                  <p className="text-slate-600">Auditors and staff working remotely need secure access to client files without exposing the firm to malware.</p>
                </div>
              </div>
            </Reveal>

            {/* Solutions */}
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">TechDefends Solutions for CA Firms</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We implement practical, business-oriented security measures that protect your data without disrupting your firm's daily productivity.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <MailWarning className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Microsoft 365 & Email Security</h3>
                    <p className="text-slate-600 mb-3">Enforce MFA, anti-phishing policies, and secure email gateways to stop business email compromise and protect client communications.</p>
                    <Link to="/services/microsoft-365" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Secure Your M365 <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Database className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Managed IT & Backup Recovery</h3>
                    <p className="text-slate-600 mb-3">Reliable data backups and disaster recovery planning ensure that ransomware cannot hold your firm's critical audit and tax files hostage.</p>
                    <Link to="/services/managed-soc" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore Managed Security <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Lock className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Endpoint Protection & Access Control</h3>
                    <p className="text-slate-600 mb-3">Secure laptops and mobile devices for auditors on the go, implementing strict access controls for client data.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Implementation & Benefits */}
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Business Benefits</h2>
              <ul className="space-y-4">
                {[
                  'Maintain absolute confidentiality of client financial records',
                  'Prevent costly wire transfer fraud and BEC attacks',
                  'Enable secure remote working for auditors and staff',
                  'Ensure quick recovery from data loss or ransomware incidents',
                  'Demonstrate strong cybersecurity posture to high-value corporate clients'
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
                  <h3 className="text-2xl font-bold mb-4">Protect Your Practice</h3>
                  <p className="text-slate-300 mb-8">
                    Don't let a cyber breach compromise your clients' trust. Get tailored IT security for your CA firm.
                  </p>
                  <Link 
                    to="/contact?industry=ca-accounting" 
                    onClick={() => trackEvent('industry_cta_click', { industry: 'CA & Accounting' })}
                    className="block w-full py-4 px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-center rounded-xl transition-all shadow-lg hover:shadow-brand-500/25 hover:-translate-y-1"
                  >
                    Secure Your Firm's IT Infrastructure
                  </Link>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Focus Areas</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Business Email Compromise Prevention</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Client Data Protection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Secure Auditor Access</span>
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

export default CAFirms;
