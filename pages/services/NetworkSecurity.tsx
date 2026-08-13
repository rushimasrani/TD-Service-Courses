import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import { Network, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const NetworkSecurityService: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>Network Security & Next-Gen Firewall Solutions | TechDefends</title>
        <meta name="description" content="Secure your business network with enterprise-grade firewalls, VPNs, and intrusion prevention systems. We deploy and manage Sophos, Fortinet, and Palo Alto solutions." />
        <link rel="canonical" href="https://www.techdefends.com/services/network-security" />
        <meta property="og:title" content="Network Security & Next-Gen Firewall Solutions | TechDefends" />
        <meta property="og:description" content="Secure your business network with enterprise-grade firewalls, VPNs, and intrusion prevention systems. We deploy and manage Sophos, Fortinet, and Palo Alto solutions." />
        <meta property="og:url" content="https://www.techdefends.com/services/network-security" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Network Security & Firewall Deployment",
            "provider": {
              "@type": "Organization",
              "name": "TechDefends",
              "url": "https://www.techdefends.com"
            },
            "description": "Next-gen firewall deployment and management for fortified network perimeters. We deploy Sophos, Fortinet, and Palo Alto Networks.",
            "serviceType": "Cybersecurity Services"
          })}
        </script>
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
             <Reveal>
               <div className="p-4 bg-brand-600 rounded-xl shadow-lg shadow-brand-900/50">
                 <Network size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / Services / Network Security
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-3xl md:text-5xl font-extrabold">Network Security & Firewalls</h1>
               </Reveal>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* Business Problem */}
            <Reveal delay={0.3}>
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The Business Risk</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  The network perimeter has evolved. With remote workforces, cloud adoption, and sophisticated malware, relying on basic routers and outdated firewalls leaves your business exposed to unauthorized access, ransomware propagation, and data theft.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Organizations need deep packet inspection, intrusion prevention, and secure remote access to ensure business continuity and protect sensitive data assets.
                </p>
              </section>
            </Reveal>

            {/* TechDefends Solution */}
            <Reveal delay={0.1}>
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The TechDefends Solution</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  TechDefends is your trusted implementation partner for enterprise-grade network security. We assess your infrastructure, source the right hardware/licenses, and deploy Next-Generation Firewalls (NGFW) to build a resilient and secure network architecture.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Next-Gen Firewall Deployment</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Intrusion Detection & Prevention (IDS/IPS)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Secure Remote Access (VPN & Zero Trust)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Web Filtering & Application Control</span>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Technologies */}
            <section>
              <Reveal delay={0.1}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Technologies We Deploy</h2>
              </Reveal>
              <div className="space-y-4">
                {[
                  { title: 'Sophos', desc: 'Deployment of Sophos XG Firewalls and Intercept X for unified threat management and synchronized security.' },
                  { title: 'Fortinet', desc: 'FortiGate firewall configurations providing high-performance network security and SD-WAN capabilities.' },
                  { title: 'Palo Alto Networks', desc: 'Industry-leading Next-Generation Firewalls tailored for complex enterprise environments.' }
                ].map((step, idx) => (
                  <Reveal key={idx} delay={0.1 + (idx * 0.1)}>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 flex gap-4">
                      <div className="bg-brand-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                        <Shield className="text-brand-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                        <p className="text-slate-600 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-8">
            <Reveal delay={0.4}>
              <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Request Assessment</h3>
                <p className="text-slate-300 mb-6 text-sm">
                  Upgrade your network perimeter. Contact us for a free network security assessment and hardware quote.
                </p>
                <Link 
                  to="/contact?service=network-security" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Request Network Security Assessment <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Business Benefits</h3>
                <ul className="space-y-4">
                  {[
                    'Block malware and ransomware at the gateway',
                    'Securely connect branch offices and remote workers',
                    'Gain granular visibility into network traffic',
                    'Ensure high availability and network redundancy',
                    'Expert hardware sizing, licensing, and support'
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="text-brand-600 shrink-0 mt-0.5" size={18} />
                      <span className="text-slate-600 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSecurityService;
