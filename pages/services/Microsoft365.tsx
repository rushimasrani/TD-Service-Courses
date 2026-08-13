import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../../utils/analytics';
import { Helmet } from 'react-helmet-async';
import { Cloud, CheckCircle2, ArrowRight, Settings } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

const Microsoft365Service: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>Microsoft 365 Security & Management Services | TechDefends</title>
        <meta name="description" content="Secure, license, and manage your Microsoft 365 environment. We provide anti-phishing, DLP, and comprehensive M365 managed services for businesses." />
        <link rel="canonical" href="https://www.techdefends.com/services/microsoft-365" />
        <meta property="og:title" content="Microsoft 365 Security & Management Services | TechDefends" />
        <meta property="og:description" content="Secure, license, and manage your Microsoft 365 environment. We provide anti-phishing, DLP, and comprehensive M365 managed services for businesses." />
        <meta property="og:url" content="https://www.techdefends.com/services/microsoft-365" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Microsoft 365 Security & Management",
            "provider": {
              "@type": "Organization",
              "name": "TechDefends",
              "url": "https://www.techdefends.com"
            },
            "description": "Licensing, user management, and security configuration for Microsoft 365.",
            "serviceType": "Managed IT Services"
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
                 <Cloud size={48} className="text-white" />
               </div>
             </Reveal>
             <div className="flex-1">
               <Reveal delay={0.1}>
                 <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-2">
                   <Link to="/" className="hover:text-white transition-colors">Home</Link> / <Link to="/services/managed-it" className="hover:text-white transition-colors">Services</Link> / Microsoft 365
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <h1 className="text-3xl md:text-5xl font-extrabold">Microsoft 365 Security & Management</h1>
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
                  Microsoft 365 is the backbone of modern business communication, but its default security settings are not enough to protect against targeted phishing, ransomware, and data exfiltration. Misconfigured permissions and lack of MFA frequently lead to compromised business emails (BEC).
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Additionally, businesses often struggle with managing licenses, onboarding/offboarding employees efficiently, and ensuring data is properly backed up and retained.
                </p>
              </section>
            </Reveal>

            {/* TechDefends Solution */}
            <Reveal delay={0.1}>
              <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">The TechDefends Solution</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  We provide end-to-end management, deployment, and security hardening for your Microsoft 365 environment. From sourcing the right licenses to configuring advanced threat protection, we ensure your M365 tenant is secure, compliant, and cost-optimized.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">License Sourcing & Cost Optimization</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Advanced Email Security (Anti-Phishing/Spam)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Data Loss Prevention (DLP)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-600 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">User Identity & Access Management (MFA/SSO)</span>
                  </div>
                </div>
              </section>
            </Reveal>

            {/* Process */}
            <section>
              <Reveal delay={0.1}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Implementation Process</h2>
              </Reveal>
              <div className="space-y-4">
                {[
                  { title: '1. Assessment & Licensing', desc: 'We review your current setup, identify security gaps, and help procure the right Microsoft licenses for your needs.' },
                  { title: '2. Security Hardening', desc: 'We configure policies for MFA, conditional access, and threat protection based on best practices.' },
                  { title: '3. Data Migration & Deployment', desc: 'Seamless migration of emails, files, and teams from legacy systems to Microsoft 365.' },
                  { title: '4. Ongoing Administration', desc: 'We handle day-to-day user management, onboarding/offboarding, and permission changes.' },
                  { title: '5. Monitoring & Backup', desc: 'Continuous monitoring of sign-in logs and implementation of robust M365 backup solutions.' }
                ].map((step, idx) => (
                  <Reveal key={idx} delay={0.1 + (idx * 0.1)}>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 flex gap-4">
                      <div className="bg-brand-50 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                        <Settings className="text-brand-600" size={24} />
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
                <h3 className="text-2xl font-bold mb-4">Request Consultation</h3>
                <p className="text-slate-300 mb-6 text-sm">
                  Secure your communications and optimize your Microsoft 365 licensing. Let's discuss your requirements.
                </p>
                <Link 
                  to="/contact?service=microsoft-365" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Request Microsoft 365 Consultation <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Business Benefits</h3>
                <ul className="space-y-4">
                  {[
                    'Stop phishing attacks and email compromise',
                    'Ensure data cannot leave your organization',
                    'Reduce overhead of managing IT licenses',
                    'Streamlined onboarding for new employees',
                    'Expert support for M365 administration'
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

export default Microsoft365Service;
