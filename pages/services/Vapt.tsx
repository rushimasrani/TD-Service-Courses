import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import { Shield, CheckCircle2, ArrowRight, Target, Activity, Lock } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const VaptService: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>VAPT Services in Ahmedabad | Web Application Penetration Testing | TechDefends</title>
        <meta name="description" content="Identify critical security flaws before attackers do. TechDefends provides expert VAPT and penetration testing services in Ahmedabad to secure your infrastructure, apps, and cloud environments." />
        <link rel="canonical" href="https://www.techdefends.com/services/vapt" />
        <meta property="og:title" content="VAPT & Web Application Penetration Testing Services | TechDefends" />
        <meta property="og:description" content="Identify critical security flaws before attackers do. Our VAPT and penetration testing services secure your infrastructure, apps, and cloud environments." />
        <meta property="og:url" content="https://www.techdefends.com/services/vapt" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Vulnerability Assessment and Penetration Testing (VAPT)",
            "provider": {
              "@type": "Organization",
              "name": "TechDefends",
              "url": "https://www.techdefends.com"
            },
            "description": "Comprehensive vulnerability assessments and penetration testing to identify weaknesses before attackers do.",
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
                 <Shield size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / <Link to="/services/offensive-security" className="hover:text-white transition-colors">Services</Link> / VAPT
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-3xl md:text-5xl font-extrabold">Vulnerability Assessment & Penetration Testing (VAPT)</h1>
               </Reveal>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Business Problem */}
            <Reveal delay={0.3}>
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The Business Risk</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  In today's digital landscape, undiscovered vulnerabilities are a ticking time bomb. Cybercriminals actively scan for weak points in web applications, network infrastructures, and cloud environments to exploit sensitive data, disrupt operations, and demand ransoms.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Relying solely on automated scanners is no longer enough. Businesses need proactive, manual exploitation testing to uncover complex logic flaws and chained vulnerabilities before an actual breach occurs.
                </p>
              </section>
            </Reveal>

            {/* TechDefends Solution */}
            <Reveal delay={0.1}>
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The TechDefends Solution</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  TechDefends provides enterprise-grade VAPT services that go beyond automated compliance checkboxes. Our expert security researchers emulate real-world attackers to aggressively test your defenses, identify critical security gaps, and provide actionable remediation strategies.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Web Application Penetration Testing (OWASP Top 10)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Mobile App Security Testing (iOS & Android)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">External & Internal Network VAPT</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">API & Web Services Security Audits</span>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Process */}
            <section>
              <Reveal delay={0.1}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Our VAPT Methodology</h2>
              </Reveal>
              <div className="space-y-4">
                {[
                  { title: '1. Reconnaissance & Threat Modeling', desc: 'We gather intelligence on your digital footprint and identify potential attack vectors.' },
                  { title: '2. Automated Vulnerability Scanning', desc: 'Initial baseline scanning using industry-leading tools to identify known CVEs and misconfigurations.' },
                  { title: '3. Manual Exploitation & Deep Dive', desc: 'Our engineers manually attempt to exploit vulnerabilities, bypass authentication, and escalate privileges to gauge real-world impact.' },
                  { title: '4. Comprehensive Reporting', desc: 'We deliver an executive summary for management and a detailed technical report for developers, complete with proof-of-concepts.' },
                  { title: '5. Remediation & Retesting', desc: 'We support your team in fixing the issues and conduct a retest to verify successful remediation.' }
                ].map((step, idx) => (
                  <Reveal key={idx} delay={0.1 + (idx * 0.1)}>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 flex gap-4">
                      <div className="bg-brand-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                        <Target className="text-brand-600" size={24} />
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

          {/* Sidebar */}
          <div className="space-y-8">
            <Reveal delay={0.4}>
              <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Request a VAPT Quote</h3>
                <p className="text-slate-300 mb-6 text-sm">
                  Secure your infrastructure today. Contact our team for a free security consultation and scoping call.
                </p>
                <Link 
                  to="/contact?service=vapt" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Request a VAPT Quote <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Business Benefits</h3>
                <ul className="space-y-4">
                  {[
                    'Prevent costly data breaches and downtime',
                    'Meet compliance requirements (PCI-DSS, SOC2, HIPAA)',
                    'Secure customer trust and brand reputation',
                    'Identify business logic flaws automated tools miss',
                    'Prioritize remediation based on actual risk'
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

export default VaptService;
