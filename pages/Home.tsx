import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import { ArrowRight, CheckCircle, Shield, Activity, Users, Lock, ChevronRight, Clock, Award, Target } from 'lucide-react';
import { SERVICES, MOCK_NEWS, MOCK_NEWS_POOL } from '../constants';
import ServiceCard from '../components/ServiceCard';
import HeroBackground from '../components/HeroBackground';
import NewsCard from '../components/NewsCard';
import { Reveal } from '../components/Reveal';
import TechnologyEcosystem from '../components/TechnologyEcosystem';
import { Server, GraduationCap, FileText, LayoutGrid, ShieldCheck } from 'lucide-react';


const Home: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sharedNewsId = searchParams.get('news_id');

  // Handle scrolling to news section if a specific news ID is present
  useEffect(() => {
    if (sharedNewsId) {
      const newsSection = document.getElementById('news-section');
      if (newsSection) {
        setTimeout(() => {
          newsSection.scrollIntoView({ behavior: 'smooth' });
        }, 500); // Slight delay to ensure rendering
      }
    }
  }, [sharedNewsId]);

  // Combine all news sources for lookup
  const allNews = [...MOCK_NEWS, ...MOCK_NEWS_POOL];
  
  // Find shared item if it exists
  const sharedItem = sharedNewsId ? allNews.find(n => n.id === sharedNewsId) : null;

  // Filter regular news (last 6 months)
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  let displayNews = MOCK_NEWS
    .filter(news => {
      const newsDate = new Date(news.date);
      return newsDate >= sixMonthsAgo && newsDate <= now;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Logic to ensure the shared item is visible and at the top
  if (sharedItem) {
    // Remove if already present to avoid duplicates
    displayNews = displayNews.filter(n => n.id !== sharedItem.id);
    // Add to the top
    displayNews.unshift(sharedItem);
  }

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Cybersecurity Company in Ahmedabad | VAPT & Managed IT Services | TechDefends</title>
        <meta name="description" content="TechDefends is a leading cybersecurity company in Ahmedabad offering VAPT, managed IT services, and enterprise-grade security solutions for businesses. TechDefends provides robust defense strategies and network security." />
        <link rel="canonical" href="https://www.techdefends.com/" />
        <meta property="og:title" content="Premium Cybersecurity & Managed IT Services in Ahmedabad | TechDefends" />
        <meta property="og:description" content="Protect your business with enterprise-grade cybersecurity, VAPT, and managed IT services." />
        <meta property="og:url" content="https://www.techdefends.com/" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "TechDefends",
            "image": "https://techdefends.com/logo.png",
            "@id": "https://techdefends.com",
            "url": "https://techdefends.com",
            "telephone": "+918128522079",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "64, 6th Floor, Supermall, CG Road",
              "addressLocality": "Ahmedabad",
              "addressRegion": "Gujarat",
              "postalCode": "380009",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://www.linkedin.com/company/techdefends"
            ]
          })}
        </script>

      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white min-h-[85vh] flex items-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        </div>
        
        {/* Interactive Particle Background */}
        <HeroBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Reveal delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-900/50 border border-brand-700/50 rounded-full text-brand-400 text-sm font-medium backdrop-blur-sm hover:bg-brand-900/70 transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                  Enterprise-Grade Cybersecurity
                </div>
              </Reveal>
              
              
              <Reveal delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  <span className="block text-white uppercase text-3xl md:text-4xl mb-2">Cybersecurity Services</span>
                  <span className="block text-brand-500 uppercase text-3xl md:text-4xl mb-2">Technology Solutions</span>
                  <span className="block text-slate-300 uppercase text-3xl md:text-4xl">Professional Training</span>
                </h1>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                  TechDefends is your unified partner for enterprise-grade security assessments, secure infrastructure deployment, and world-class cybersecurity training.
                </p>
              </Reveal>

              
              <Reveal delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/contact" 
                    onClick={() => trackEvent('security_assessment_cta')}
                    className="px-8 py-4 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-all duration-300 shadow-lg shadow-brand-900/50 flex items-center justify-center gap-2 hover:-translate-y-1"
                  >
                    Book a Free Security Assessment <ArrowRight size={18} />
                  </Link>
                  <Link 
                    to="/services/vapt" 
                    className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:-translate-y-1"
                  >
                    Explore Services
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="flex items-center gap-8 pt-8 text-slate-400 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand-500" size={20} /> Zero Trust Approach
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand-500" size={20} /> 24/7 SOC Support
                  </div>
                </div>
              </Reveal>
            </div>
            
            <div className="hidden lg:block relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
               <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-4 animate-float">
                 <img 
                   src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                   alt="Cybersecurity Dashboard" 
                   className="rounded-xl w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                 />
                 {/* Floating Badges */}
                 <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow" style={{ animationDuration: '4s' }}>
                   <div className="bg-green-100 p-2 rounded-full text-green-600">
                     <Shield size={24} />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500 font-semibold uppercase">System Status</p>
                     <p className="text-slate-900 font-bold">100% Secure</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <TechnologyEcosystem />

      {/* Mission & Vision - Added Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Diagonal cut background */}
        <div className="absolute inset-0 bg-white transform -skew-y-3 origin-top-left translate-y-1/2 opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 text-brand-500 font-bold tracking-wide uppercase text-sm mb-4">
                  <Target size={18} /> Our Purpose
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                  Securing the Digital Frontier
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  <strong className="text-white">Our Mission:</strong> To democratize enterprise-grade security, making it accessible and manageable for businesses of all sizes. We strive to be the shield against the unseen, empowering you to innovate without fear.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  <strong className="text-white">Our Vision:</strong> A world where digital trust is the standard, not a luxury. We envision a future where organizations can operate resiliently in an increasingly complex threat landscape.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <Link to="/about" className="text-white font-semibold border-b-2 border-brand-500 hover:text-brand-400 transition-colors pb-1 inline-flex items-center gap-1 group">
                  Read our full story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Reveal>
            </div>
            
            <div className="relative">
              <Reveal delay={0.4}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-colors">
                      <Shield className="text-brand-500 mb-3" size={32} />
                      <h3 className="text-white font-bold mb-1">Protection</h3>
                      <p className="text-slate-400 text-sm">Uncompromising security standards.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-colors">
                      <Users className="text-brand-500 mb-3" size={32} />
                      <h3 className="text-white font-bold mb-1">People First</h3>
                      <p className="text-slate-400 text-sm">Security that empowers your team.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-colors">
                      <Activity className="text-brand-500 mb-3" size={32} />
                      <h3 className="text-white font-bold mb-1">Resilience</h3>
                      <p className="text-slate-400 text-sm">Bounce back faster from threats.</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:bg-slate-750 transition-colors">
                      <Lock className="text-brand-500 mb-3" size={32} />
                      <h3 className="text-white font-bold mb-1">Integrity</h3>
                      <p className="text-slate-400 text-sm">Trust built on transparency.</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3">Our Expertise</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Comprehensive Cyber Defense & IT Solutions</h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600">
                From offensive simulations to defensive strategies and managed infrastructure, we cover every aspect of your digital landscape.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.1}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Reveal delay={0.4}>
              <Link to="/contact" className="inline-flex items-center text-brand-600 font-bold hover:text-brand-700 transition-colors group">
                Discuss your project with us <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      
      {/* Security Products & Technology Solutions */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <h2 className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3">Enterprise Solutions</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Security Products & Technology Solutions</h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600">
                We act as your trusted implementation partner, helping you identify requirements, source the right technologies, deploy seamlessly, and provide ongoing configuration support.
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-500 transition-colors h-full">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6 text-brand-600">
                  <Server size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">Next-Gen Firewalls & Network</h4>
                <p className="text-slate-600 mb-6">Secure your perimeter with industry-leading NGFWs. We handle sizing, deployment, and policy configuration.</p>
                <Link to="/services/network-security" className="text-brand-600 font-semibold hover:text-brand-700 flex items-center group">Learn More <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /></Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-500 transition-colors h-full">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6 text-brand-600">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">Endpoint & Email Security</h4>
                <p className="text-slate-600 mb-6">Protect against malware and phishing with advanced EDR and email gateways perfectly integrated into your environment.</p>
                <Link to="/services/microsoft-365" className="text-brand-600 font-semibold hover:text-brand-700 flex items-center group">Learn More <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /></Link>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-500 transition-colors h-full">
                <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6 text-brand-600">
                  <LayoutGrid size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">Identity & Access Management</h4>
                <p className="text-slate-600 mb-6">Implement Zero Trust with MFA, Single Sign-On (SSO), and secure directory integrations for your workforce.</p>
                <Link to="/services/managed-soc" className="text-brand-600 font-semibold hover:text-brand-700 flex items-center group">Learn More <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Professional Training Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <h2 className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3">TechDefends Academy</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Professional Cybersecurity Training</h3>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-slate-600 mb-6">
                  Equip yourself or your team with real-world skills. Our professional training programs are designed and delivered by active security practitioners, offering hands-on exposure to modern enterprise environments.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-brand-500 mt-1" size={20} />
                    <span className="text-slate-700">Practical labs simulating real-world enterprise infrastructure.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-brand-500 mt-1" size={20} />
                    <span className="text-slate-700">Industry-aligned curriculum updated to current threat landscapes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-brand-500 mt-1" size={20} />
                    <span className="text-slate-700">Corporate batches and individual professional tracks available.</span>
                  </li>
                </ul>
              </Reveal>
              <Reveal delay={0.3}>
                <Link to="/trainings" className="inline-flex px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
                  Explore Training Programs
                </Link>
              </Reveal>
            </div>
            <div className="relative">
              <Reveal delay={0.2}>
                <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                  <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Professional Training" className="w-full h-auto" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-800 transform skew-x-12 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-900/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-brand-500 font-bold tracking-wide uppercase text-sm mb-3">Why Choose Us</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6">The TechDefends Advantage</h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                We combine elite offensive capabilities with robust defensive strategies to provide 360° protection for your enterprise.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Reveal delay={0.3} className="h-full">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-brand-500/50 hover:bg-slate-800 transition-all duration-300 group hover:-translate-y-2 h-full">
                <div className="w-14 h-14 bg-slate-700 rounded-lg flex items-center justify-center text-brand-500 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  <Activity size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">Proactive Defense</h4>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-sm leading-relaxed">
                  We don't wait for attacks. Our offensive security team continuously tests your defenses to find and fix vulnerabilities first.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.4} className="h-full">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-brand-500/50 hover:bg-slate-800 transition-all duration-300 group hover:-translate-y-2 h-full">
                <div className="w-14 h-14 bg-slate-700 rounded-lg flex items-center justify-center text-brand-500 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  <Lock size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">Compliance Ready</h4>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-sm leading-relaxed">
                  Seamlessly achieve and maintain compliance with PCI-DSS, HIPAA, SOC2, and GDPR through our GRC frameworks.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.5} className="h-full">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-brand-500/50 hover:bg-slate-800 transition-all duration-300 group hover:-translate-y-2 h-full">
                <div className="w-14 h-14 bg-slate-700 rounded-lg flex items-center justify-center text-brand-500 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  <Award size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">Certified Experts</h4>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-sm leading-relaxed">
                  Our team holds top certifications (OSCP, CISSP, CISA) with extensive experience in high-stakes environments.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.6} className="h-full">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-brand-500/50 hover:bg-slate-800 transition-all duration-300 group hover:-translate-y-2 h-full">
                <div className="w-14 h-14 bg-slate-700 rounded-lg flex items-center justify-center text-brand-500 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  <Clock size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">24/7 Support</h4>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-sm leading-relaxed">
                  Our Security Operations Center (SOC) provides round-the-clock monitoring and rapid incident response.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section id="news-section" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-brand-600 font-bold tracking-wide uppercase text-sm mb-3">Latest Insights</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Cybersecurity News & Trends</h3>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Stay informed with the latest updates from the world of information security, vulnerabilities, and emerging tech.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayNews.length > 0 ? (
              displayNews.map((news, index) => (
                <NewsCard 
                  key={news.id} 
                  item={news} 
                  index={index} 
                  initiallyExpanded={news.id === sharedItem?.id}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-slate-500 py-12">
                No recent news articles available.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Ready to fortify your business?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-brand-100 text-lg mb-10 max-w-2xl mx-auto">
              Get a comprehensive security assessment today. Protect your data, your customers, and your reputation with TechDefends.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" onClick={() => trackEvent('quote_request_cta')} className="px-8 py-4 bg-white text-brand-700 font-bold rounded-lg hover:bg-slate-100 transition-all duration-300 shadow-lg hover:-translate-y-1">
                Request a Security Quote
              </Link>
              <Link to="/services/vapt" className="px-8 py-4 bg-brand-700 text-white font-bold rounded-lg hover:bg-brand-800 transition-all duration-300 shadow-lg border border-brand-500 hover:-translate-y-1">
                View All Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;