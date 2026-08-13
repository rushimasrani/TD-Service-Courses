import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import { Lock, CheckCircle2, ArrowRight, Activity, ShieldAlert } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const ManagedSocService: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>Managed SOC & Security Operations Center Services | TechDefends</title>
        <meta name="description" content="Protect your organization with 24/7 continuous threat monitoring and incident response. TechDefends Managed SOC provides enterprise-level defensive security." />
        <link rel="canonical" href="https://www.techdefends.com/services/managed-soc" />
        <meta property="og:title" content="Managed SOC & Security Operations Center Services | TechDefends" />
        <meta property="og:description" content="Protect your organization with 24/7 continuous threat monitoring and incident response. TechDefends Managed SOC provides enterprise-level defensive security." />
        <meta property="og:url" content="https://www.techdefends.com/services/managed-soc" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Managed SOC (Security Operations Center)",
            "provider": {
              "@type": "Organization",
              "name": "TechDefends",
              "url": "https://www.techdefends.com"
            },
            "description": "24/7 continuous threat monitoring, threat hunting, and incident response for enterprise networks.",
            "serviceType": "Managed Security Services"
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
                 <Activity size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / <Link to="/services/defensive-security" className="hover:text-white transition-colors">Services</Link> / Managed SOC
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-3xl md:text-5xl font-extrabold">Managed SOC & Security Monitoring</h1>
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
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The Challenge of Alert Fatigue</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  Deploying security tools like firewalls, EDRs, and SIEMs is only half the battle. Organizations are often overwhelmed by thousands of daily security alerts, lacking the in-house expertise or resources to monitor them 24/7, triage false positives, and respond to legitimate threats in real-time.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  When a cyber attack happens at 2 AM on a Sunday, relying on next-business-day IT support is a recipe for disaster.
                </p>
              </section>
            </Reveal>

            {/* TechDefends Solution */}
            <Reveal delay={0.1}>
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The TechDefends Managed SOC Solution</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  TechDefends acts as your dedicated Security Operations Center. We ingest logs from your existing endpoints, firewalls, and cloud environments, providing 24/7/365 eyes-on-glass monitoring. We implement, configure, and manage security platforms to detect, isolate, and neutralize threats before they impact your business.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">24/7/365 Continuous Threat Monitoring</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">SIEM Implementation & Tuning</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Proactive Threat Hunting</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Digital Forensics & Incident Response (DFIR)</span>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Process */}
            <section>
              <Reveal delay={0.1}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">How Our Managed SOC Works</h2>
              </Reveal>
              <div className="space-y-4">
                {[
                  { title: '1. Onboarding & Integration', desc: 'We connect your firewalls, M365 environment, servers, and endpoint security agents to our centralized SIEM platform.' },
                  { title: '2. Baseline & Tuning', desc: 'We tune the correlation rules to match your environment, drastically reducing false positives and alert noise.' },
                  { title: '3. Continuous Monitoring', desc: 'Our security analysts monitor the dashboards 24/7, analyzing anomalies and suspicious behaviors.' },
                  { title: '4. Triage & Investigation', desc: 'When a critical alert triggers, our analysts investigate the root cause to determine if it is a true positive threat.' },
                  { title: '5. Incident Response', desc: 'We contain the threat immediately (e.g., isolating a host, blocking an IP) and guide your team through remediation.' }
                ].map((step, idx) => (
                  <Reveal key={idx} delay={0.1 + (idx * 0.1)}>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 flex gap-4">
                      <div className="bg-brand-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                        <ShieldAlert className="text-brand-600" size={24} />
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
                <h3 className="text-2xl font-bold mb-4">Talk to a Security Expert</h3>
                <p className="text-slate-300 mb-6 text-sm">
                  Stop ignoring alerts. Let our analysts secure your perimeter 24/7. Contact us to discuss your SOC requirements.
                </p>
                <Link 
                  to="/contact?service=managed-soc" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Talk to a Security Expert <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Business Benefits</h3>
                <ul className="space-y-4">
                  {[
                    'Fraction of the cost of building an in-house SOC',
                    'Immediate response to active threats 24/7/365',
                    'Meet regulatory logging and monitoring compliance',
                    'Free up your internal IT team for core projects',
                    'Access to elite security analysts and incident responders'
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

export default ManagedSocService;
