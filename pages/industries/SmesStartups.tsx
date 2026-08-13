import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle2, ArrowRight, Rocket, ShieldCheck, Database, Laptop, Lock } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const SmesStartups: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>Cybersecurity & IT Solutions for SMEs and Startups in Ahmedabad | TechDefends</title>
        <meta name="description" content="Affordable, enterprise-grade cybersecurity and managed IT services for SMEs and startups in Ahmedabad. Protect your business as it scales." />
        <link rel="canonical" href="https://techdefends.com/industries/smes-startups" />
        <meta property="og:title" content="Cybersecurity & IT for SMEs and Startups | TechDefends" />
        <meta property="og:description" content="Affordable, enterprise-grade cybersecurity and managed IT services for SMEs and startups in Ahmedabad. Protect your business as it scales." />
        <meta property="og:url" content="https://techdefends.com/industries/smes-startups" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Cybersecurity for SMEs and Startups",
            "description": "Cybersecurity, Managed IT, and Microsoft 365 solutions for small to medium enterprises and startups in Ahmedabad.",
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
                 <Rocket size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / Industries / SMEs & Startups
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                   Cybersecurity & IT for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-red-400">SMEs & Startups</span>
                 </h1>
               </Reveal>
               <Reveal delay={0.3}>
                 <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                   Enterprise-grade security doesn't have to be complicated. We provide practical, scalable managed IT and cybersecurity solutions for growing businesses in Ahmedabad that lack a dedicated internal security team.
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
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Securing Growth Without the Overhead</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Small and medium-sized enterprises (SMEs) are frequently targeted because attackers assume they lack the defenses of larger corporations. You need robust protection that scales with your business, without requiring a massive internal IT budget.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <ShieldCheck className="text-rose-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Limited Internal Resources</h3>
                  <p className="text-slate-600">Managing firewalls, endpoints, and backups takes time away from focusing on core business growth.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <Lock className="text-brand-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Data Loss & Ransomware</h3>
                  <p className="text-slate-600">A single ransomware attack or hardware failure can cripple a small business if proper backups aren't in place.</p>
                </div>
              </div>
            </Reveal>

            {/* Solutions */}
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Practical Solutions for Growing Businesses</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We handle your IT and security operations so you can focus on scaling your company.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Database className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Managed IT & Backups</h3>
                    <p className="text-slate-600 mb-3">Comprehensive management of your IT infrastructure, including automated data backups and disaster recovery planning.</p>
                    <Link to="/services/managed-soc" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore Managed Services <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Laptop className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Microsoft 365 & Endpoint Protection</h3>
                    <p className="text-slate-600 mb-3">Secure email configurations, device management, and next-generation antivirus (NGAV) to protect your team's laptops and communications.</p>
                    <Link to="/services/microsoft-365" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Secure Your M365 <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-200 hover:border-brand-300 transition-colors shadow-sm">
                  <div className="bg-slate-50 p-3 rounded-xl h-fit">
                    <Lock className="text-brand-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Network Security & Firewalls</h3>
                    <p className="text-slate-600 mb-3">Implementation and management of secure office networks, Wi-Fi, and firewalls to keep unauthorized users out.</p>
                    <Link to="/services/network-security" className="text-brand-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Explore Network Security <ArrowRight size={16} />
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
                  'Access enterprise-grade security expertise without hiring a full-time IT team',
                  'Predictable monthly costs for managed IT and security services',
                  'Ensure business continuity with reliable backups and disaster recovery',
                  'Protect sensitive customer data and intellectual property',
                  'Scale your IT infrastructure seamlessly as your business grows'
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
                  <h3 className="text-2xl font-bold mb-4">Protect Your Growth</h3>
                  <p className="text-slate-300 mb-8">
                    Let us handle your IT security so you can focus on running your business.
                  </p>
                  <Link 
                    to="/contact?industry=smes-startups" 
                    onClick={() => trackEvent('industry_cta_click', { industry: 'SMEs & Startups' })}
                    className="block w-full py-4 px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-center rounded-xl transition-all shadow-lg hover:shadow-brand-500/25 hover:-translate-y-1"
                  >
                    Get a Cybersecurity Assessment
                  </Link>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Why TechDefends?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Cost-effective, scalable solutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Responsive local support in Ahmedabad</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Shield className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">Proactive threat monitoring</span>
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

export default SmesStartups;
