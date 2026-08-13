import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle2, ArrowRight, Server, Cloud, Activity, Terminal, Monitor } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const ITCompanies: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>Cybersecurity Services for IT Companies & MSPs in Ahmedabad | TechDefends</title>
        <meta name="description" content="Advanced cybersecurity assessments, VAPT, and infrastructure security solutions for IT companies, software houses, and MSPs in Ahmedabad." />
        <link rel="canonical" href="https://techdefends.com/industries/it-companies" />
        <meta property="og:title" content="Cybersecurity Services for IT Companies & MSPs | TechDefends" />
        <meta property="og:description" content="Advanced cybersecurity assessments, VAPT, and infrastructure security solutions for IT companies, software houses, and MSPs in Ahmedabad." />
        <meta property="og:url" content="https://techdefends.com/industries/it-companies" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cybersecurity for IT Companies",
            "description": "Cybersecurity assessments, VAPT, and infrastructure security for IT companies in Ahmedabad.",
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
                 <Server size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / Industries / IT Companies & MSPs
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                   Cybersecurity for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-red-400">IT Companies & MSPs</span>
                 </h1>
               </Reveal>
               <Reveal delay={0.3}>
                 <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                   Elevate your internal security posture. We provide advanced VAPT, cloud security, and infrastructure assessments for technology companies and software houses in Ahmedabad.
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
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Securing the Technology Stack</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                As an IT company, your infrastructure, codebase, and client environments are constantly probed by threat actors. A compromise in your systems can easily cascade into a supply chain attack affecting your clients.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Terminal className="text-rose-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Application Vulnerabilities</h3>
                  <p className="text-slate-600">Unpatched software, insecure APIs, and misconfigured cloud environments expose critical intellectual property and client data.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Monitor className="text-brand-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Infrastructure Threats</h3>
                  <p className="text-slate-600">Advanced Persistent Threats (APTs) targeting internal networks, active directories, and development pipelines.</p>
                </div>
              </div>
            </Reveal>

            {/* Solutions */}
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Advanced Security Solutions</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We act as a specialized extension of your technical team, delivering deep-dive security assessments and robust defensive implementations.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Terminal className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Comprehensive VAPT</h3>
                    <p className="text-slate-600 mb-3">Thorough Vulnerability Assessment and Penetration Testing for web applications, mobile apps, and internal network infrastructure to uncover hidden flaws.</p>
                    <Link to="/services/vapt" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      View VAPT Services <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Cloud className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Cloud & Infrastructure Security</h3>
                    <p className="text-slate-600 mb-3">Hardening AWS, Azure, and on-premise environments. Implementation of robust firewall policies, endpoint security, and zero-trust networks.</p>
                    <Link to="/services/network-security" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      View Infrastructure Security <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Activity className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Managed Security Monitoring</h3>
                    <p className="text-slate-600 mb-3">Proactive security monitoring and Microsoft 365 hardening to defend against sophisticated cyber threats and ensure high availability.</p>
                    <Link to="/services/managed-soc" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore Managed Security <ArrowRight size={16} />
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
                  'Identify and remediate critical vulnerabilities in your software and infrastructure',
                  'Protect intellectual property and source code from exfiltration',
                  'Prevent supply chain attacks that could compromise your clients',
                  'Ensure secure deployment pipelines and cloud architectures',
                  'Validate internal security posture with independent expert assessments'
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
                  <h3 className="text-2xl font-bold mb-4">Validate Your Security Posture</h3>
                  <p className="text-slate-300 mb-8">
                    Discuss your infrastructure and application security requirements with our technical experts.
                  </p>
                  <Link 
                    to="/contact?industry=it-companies" 
                    onClick={() => trackEvent('industry_cta_click', { industry: 'IT Companies' })}
                    className="block w-full py-4 px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-center rounded-xl transition-all shadow-lg hover:shadow-brand-500/25 hover:-translate-y-1"
                  >
                    Talk to a Security Expert
                  </Link>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Core Capabilities</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Deep-dive Penetration Testing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Cloud Infrastructure Hardening</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Independent Security Audits</span>
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

export default ITCompanies;
