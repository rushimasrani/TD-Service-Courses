import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { SERVICES } from '../constants';
import Logo from './Logo';
import { isAcademyDomain, getAcademyUrl, getMainSiteUrl, CrossDomainLink } from '../utils/domain';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileNestedCourses, setMobileNestedCourses] = useState(false);
  const [mobileNestedCareerCourses, setMobileNestedCareerCourses] = useState(false);
  const location = useLocation();
  const isAcademy = isAcademyDomain();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and sync scroll state on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setIsScrolled(window.scrollY > 20);
  }, [location.pathname]);

  // Route matching for light background sections (Courses and Trainings)
  const isCoursesPage = location.pathname === '/courses' || location.pathname.startsWith('/courses/');
  const isTrainingsPage = location.pathname === '/trainings' || location.pathname.startsWith('/trainings/');
  const isLightPage = isCoursesPage || isTrainingsPage;

  // Dynamic styles based on scroll, mobile menu, or light-themed page route
  const isOpaque = isScrolled || isOpen || isLightPage;

  const navBackground = isOpaque ? 'bg-white shadow-md' : 'bg-transparent';
  const navPadding = isScrolled ? 'py-2' : 'py-5';
  
  const textColor = isOpaque ? 'text-slate-700' : 'text-white/90';
  const hoverColor = isOpaque ? 'hover:text-brand-600' : 'hover:text-white';
  
  const logoMainColor = isOpaque ? 'text-slate-900' : 'text-white';
  const logoSubColor = isOpaque ? 'text-slate-500' : 'text-slate-300';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${navBackground} ${navPadding}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group" aria-label={isAcademy ? "TechDefends Academy Home" : "TechDefends Home"}>
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Logo size={40} className="shadow-sm" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`text-2xl font-bold leading-none transition-colors duration-300 ${logoMainColor}`}>
                  Tech<span className="text-brand-600">Defends</span>
                </span>
                {isAcademy && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 px-1.5 py-0.5 bg-brand-50 rounded border border-brand-200">
                    Academy
                  </span>
                )}
              </div>
              <span className={`text-[0.55rem] sm:text-[0.65rem] font-medium tracking-widest uppercase mt-1 transition-colors duration-300 ${logoSubColor}`}>
                {isAcademy ? "Cybersecurity & IT Training Hub" : "Secure Today, Scale Tomorrow"}
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7">
            {isAcademy ? (
              <>
                <Link to="/" className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}>Training Hub</Link>
              </>
            ) : (
              <>
                <Link to="/" className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}>Home</Link>
                <Link to="/about" className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}>About Us</Link>
                <Link to="/case-studies" className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}>Case Studies</Link>
                <Link to="/resources" className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}>Resources</Link>

                {/* Industries Dropdown */}
                <div className="relative group">
                  <button className={`font-medium text-sm flex items-center gap-1 transition-colors duration-300 py-2 ${textColor} ${hoverColor}`}>
                    Industries <ChevronDown size={14} />
                  </button>
                  
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[280px] bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top p-2 flex flex-col gap-1">
                     <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-slate-100"></div>
                     
                     <Link to="/industries/financial-services" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Financial Services & FinTech
                     </Link>
                     <Link to="/industries/ca-accounting-firms" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       CA & Accounting Firms
                     </Link>
                     <Link to="/industries/it-companies" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       IT Companies & MSPs
                     </Link>
                     <Link to="/industries/smes-startups" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       SMEs & Startups
                     </Link>
                     <Link to="/industries/healthcare" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Healthcare & Hospitals
                     </Link>
                  </div>
                </div>
              </>
            )}

            {/* Trainings / Programs Dropdown */}
            <div className="relative group">
              <button className={`font-medium text-sm flex items-center gap-1 transition-colors duration-300 py-2 ${textColor} ${hoverColor}`}>
                {isAcademy ? "Programs" : "Trainings"} <ChevronDown size={14} />
              </button>
              
              {/* Mega Menu Dropdown */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[300px] bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top p-4 flex flex-col gap-2">
                 <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-slate-100"></div>
                 
                 <div className="relative group/courses">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-default relative z-10 w-full group-hover/courses:bg-slate-50">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Courses</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">Focused short-term upskilling</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                  </div>
                  
                  {/* Flyout Menu for Courses */}
                  <div className="absolute left-[95%] top-0 ml-1 w-[280px] bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover/courses:opacity-100 group-hover/courses:visible transition-all duration-200 p-2 flex flex-col gap-1">
                     <CrossDomainLink to="/courses/aws-solution-architect" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       AWS Solution Architect Career Program
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/diploma-enterprise-network-security" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Diploma in Enterprise Network Engineering & Security
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/elite-offensive-security" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Elite Offensive Security & Ethical Hacking Program
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/ms-office-365" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Master in Microsoft Office 365 Suite
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/professional-devops-engineering" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Professional DevOps Engineering Program
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/professional-server-management" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Professional Server Management Program
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/soc-monitoring-incident-response" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       SOC Monitoring & Incident Response Specialist
                     </CrossDomainLink>
                  </div>
                 </div>

                 <div className="relative group/careers">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-default relative z-10 w-full group-hover/careers:bg-slate-50">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">Career Courses</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">Multi-month career programs</p>
                    </div>
                    <ChevronRight size={14} className="text-slate-500" />
                  </div>
                  
                  {/* Flyout Menu for Career Courses */}
                  <div className="absolute left-[95%] top-0 ml-1 w-[280px] bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover/careers:opacity-100 group-hover/careers:visible transition-all duration-200 p-2 flex flex-col gap-1">
                     <CrossDomainLink to="/courses/network-engineering-diploma" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Enterprise Network Engineering
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/devops-master-program" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Enterprise Cloud & DevOps Master
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/enterprise-cyber-defense-architect" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       Enterprise Cyber Defense Architect
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/ai-powered-cyber-security" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       AI-Powered Cyber Security Master
                     </CrossDomainLink>
                     <CrossDomainLink to="/courses/nextgen-ai-soc-elite" targetDomain="academy" onClick={() => setIsOpen(false)} className="block p-3 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors">
                       NextGen AI SOC Elite Program
                     </CrossDomainLink>
                  </div>
                 </div>

                 <CrossDomainLink 
                   to="/trainings/internship"
                   targetDomain="academy" 
                   onClick={() => setIsOpen(false)}
                   className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer relative z-10 w-full group/internship"
                 >
                   <div>
                     <div className="flex items-center gap-2">
                       <h4 className="text-sm font-semibold text-slate-900 group-hover/internship:text-brand-600 transition-colors">Internship</h4>
                       <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600 rounded border border-brand-100">Apply</span>
                     </div>
                     <p className="text-xs text-slate-500 line-clamp-1">Hands-on practical training & mentorship</p>
                   </div>
                   <ChevronRight size={14} className="text-slate-400 group-hover/internship:text-brand-600 transition-colors" />
                 </CrossDomainLink>

                 <CrossDomainLink 
                   to={isAcademy ? "/" : "/trainings"} 
                   targetDomain="academy"
                   className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-50 hover:text-brand-600 transition-colors cursor-pointer relative z-10 w-full mt-2 border-t border-slate-100"
                 >
                    <span className="text-sm font-bold">View All Programs</span>
                    <ChevronRight size={14} />
                 </CrossDomainLink>
              </div>
            </div>

            {/* Corporate Services link or Dropdown */}
            {isAcademy ? (
              <>
                <CrossDomainLink 
                  to="/services/vapt" 
                  targetDomain="main" 
                  className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}
                >
                  Corporate Services
                </CrossDomainLink>
                <CrossDomainLink 
                  to="/contact" 
                  targetDomain="main" 
                  className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}
                >
                  Contact
                </CrossDomainLink>
              </>
            ) : (
              <>
                <div className="relative group">
                  <button className={`font-medium text-sm flex items-center gap-1 transition-colors duration-300 py-2 ${textColor} ${hoverColor}`}>
                    Services <ChevronDown size={14} />
                  </button>
                  
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[600px] bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top p-6 grid grid-cols-2 gap-4">
                     <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-t border-l border-slate-100"></div>
                     
                     {SERVICES.map((service) => (
                       <Link 
                        key={service.id} 
                        to={`/services/${service.id}`}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors relative z-10"
                       >
                         <service.icon className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
                         <div>
                           <h4 className="text-sm font-semibold text-slate-900">{service.title}</h4>
                           <p className="text-xs text-slate-500 line-clamp-1">{service.shortDescription}</p>
                         </div>
                       </Link>
                     ))}
                  </div>
                </div>

                <Link to="/careers" className={`font-medium text-sm transition-colors duration-300 ${textColor} ${hoverColor}`}>Careers</Link>
              </>
            )}

            {/* Right Action Button */}
            {isAcademy ? (
              <CrossDomainLink 
                to="/" 
                targetDomain="main" 
                className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Main Website</span>
                <ExternalLink size={12} />
              </CrossDomainLink>
            ) : (
              <Link to="/contact" className="px-5 py-2.5 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-all shadow-lg shadow-brand-900/20 transform hover:-translate-y-0.5">
                Contact Us
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none p-2 transition-colors duration-300 ${textColor} ${hoverColor}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 h-screen overflow-y-auto pb-32 animate-fade-in">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {isAcademy ? (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md">
                  Training Hub
                </Link>

                {/* Programs Dropdown on Academy */}
                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'trainings' ? null : 'trainings')}
                    className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                  >
                    Programs <ChevronDown size={16} className={`transform transition-transform ${activeDropdown === 'trainings' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'trainings' && (
                    <div className="pl-4 space-y-1 border-l-2 border-brand-100 ml-3">
                      <button
                        onClick={() => setMobileNestedCourses(!mobileNestedCourses)}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                      >
                        Courses
                        <ChevronDown size={14} className={`transform transition-transform ${mobileNestedCourses ? 'rotate-180' : ''}`} />
                      </button>

                      {mobileNestedCourses && (
                         <div className="pl-6 space-y-1 border-l-2 border-brand-50 ml-3">
                            <CrossDomainLink to="/courses/aws-solution-architect" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">AWS Solution Architect Career Program</CrossDomainLink>
                            <CrossDomainLink to="/courses/diploma-enterprise-network-security" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Diploma in Enterprise Network Engineering & Security</CrossDomainLink>
                            <CrossDomainLink to="/courses/elite-offensive-security" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Elite Offensive Security & Ethical Hacking Program</CrossDomainLink>
                            <CrossDomainLink to="/courses/ms-office-365" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Master in Microsoft Office 365 Suite</CrossDomainLink>
                            <CrossDomainLink to="/courses/professional-devops-engineering" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Professional DevOps Engineering Program</CrossDomainLink>
                            <CrossDomainLink to="/courses/professional-server-management" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Professional Server Management Program</CrossDomainLink>
                            <CrossDomainLink to="/courses/soc-monitoring-incident-response" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">SOC Monitoring & Incident Response Specialist</CrossDomainLink>
                         </div>
                      )}

                      <button
                        onClick={() => setMobileNestedCareerCourses(!mobileNestedCareerCourses)}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                      >
                        Career Courses
                        <ChevronDown size={14} className={`transform transition-transform ${mobileNestedCareerCourses ? 'rotate-180' : ''}`} />
                      </button>

                      {mobileNestedCareerCourses && (
                         <div className="pl-6 space-y-1 border-l-2 border-brand-50 ml-3">
                            <CrossDomainLink to="/courses/network-engineering-diploma" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Enterprise Network Engineering</CrossDomainLink>
                            <CrossDomainLink to="/courses/devops-master-program" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Enterprise Cloud & DevOps Master</CrossDomainLink>
                            <CrossDomainLink to="/courses/enterprise-cyber-defense-architect" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Enterprise Cyber Defense Architect</CrossDomainLink>
                            <CrossDomainLink to="/courses/ai-powered-cyber-security" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">AI-Powered Cyber Security Master</CrossDomainLink>
                            <CrossDomainLink to="/courses/nextgen-ai-soc-elite" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">NextGen AI SOC Elite Program</CrossDomainLink>
                         </div>
                      )}

                      <CrossDomainLink
                        to="/trainings/internship"
                        targetDomain="academy"
                        onClick={() => setIsOpen(false)}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                      >
                        <span>Internship</span>
                        <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600 rounded border border-brand-100">Apply</span>
                      </CrossDomainLink>

                      <CrossDomainLink
                        to="/"
                        targetDomain="academy"
                        onClick={() => setIsOpen(false)}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-brand-600 hover:bg-brand-50 rounded-md mt-1 border-t border-slate-100"
                      >
                        <span>View All Programs</span>
                        <ChevronRight size={14} />
                      </CrossDomainLink>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Corporate TechDefends
                  </div>
                  <CrossDomainLink 
                    to="/" 
                    targetDomain="main" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                  >
                    <span>Main Corporate Website</span>
                    <ExternalLink size={14} className="text-slate-400" />
                  </CrossDomainLink>
                  <CrossDomainLink 
                    to="/services/vapt" 
                    targetDomain="main" 
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                  >
                    Security & Cloud Services
                  </CrossDomainLink>
                  <CrossDomainLink 
                    to="/contact" 
                    targetDomain="main" 
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                  >
                    Contact Us
                  </CrossDomainLink>
                </div>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md">Home</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md">About Us</Link>
                
                <div className="space-y-1">
                  
                  {/* Industries Mobile */}
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'industries' ? null : 'industries')}
                    className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                  >
                    Industries <ChevronDown size={16} className={`transform transition-transform ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'industries' && (
                    <div className="pl-4 space-y-1 border-l-2 border-brand-100 ml-3">
                      <Link to="/industries/financial-services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md">Financial Services</Link>
                      <Link to="/industries/ca-accounting-firms" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md">CA & Accounting Firms</Link>
                      <Link to="/industries/it-companies" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md">IT Companies & MSPs</Link>
                      <Link to="/industries/smes-startups" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md">SMEs & Startups</Link>
                      <Link to="/industries/healthcare" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md">Healthcare</Link>
                    </div>
                  )}

                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'trainings' ? null : 'trainings')}
                    className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                  >
                    Trainings <ChevronDown size={16} className={`transform transition-transform ${activeDropdown === 'trainings' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'trainings' && (
                    <div className="pl-4 space-y-1 border-l-2 border-brand-100 ml-3">
                      <button
                        onClick={() => setMobileNestedCourses(!mobileNestedCourses)}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                      >
                        Courses
                        <ChevronDown size={14} className={`transform transition-transform ${mobileNestedCourses ? 'rotate-180' : ''}`} />
                      </button>

                      {mobileNestedCourses && (
                         <div className="pl-6 space-y-1 border-l-2 border-brand-50 ml-3">
                            <CrossDomainLink to="/courses/aws-solution-architect" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">AWS Solution Architect Career Program</CrossDomainLink>
                            <CrossDomainLink to="/courses/diploma-enterprise-network-security" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Diploma in Enterprise Network Engineering & Security</CrossDomainLink>
                            <CrossDomainLink to="/courses/elite-offensive-security" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Elite Offensive Security & Ethical Hacking Program</CrossDomainLink>
                            <CrossDomainLink to="/courses/ms-office-365" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Master in Microsoft Office 365 Suite</CrossDomainLink>
                            <CrossDomainLink to="/courses/professional-devops-engineering" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Professional DevOps Engineering Program</CrossDomainLink>
                            <CrossDomainLink to="/courses/professional-server-management" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Professional Server Management Program</CrossDomainLink>
                            <CrossDomainLink to="/courses/soc-monitoring-incident-response" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">SOC Monitoring & Incident Response Specialist</CrossDomainLink>
                         </div>
                      )}

                      <button
                        onClick={() => setMobileNestedCareerCourses(!mobileNestedCareerCourses)}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                      >
                        Career Courses
                        <ChevronDown size={14} className={`transform transition-transform ${mobileNestedCareerCourses ? 'rotate-180' : ''}`} />
                      </button>

                      {mobileNestedCareerCourses && (
                         <div className="pl-6 space-y-1 border-l-2 border-brand-50 ml-3">
                            <CrossDomainLink to="/courses/network-engineering-diploma" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Enterprise Network Engineering</CrossDomainLink>
                            <CrossDomainLink to="/courses/devops-master-program" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Enterprise Cloud & DevOps Master</CrossDomainLink>
                            <CrossDomainLink to="/courses/enterprise-cyber-defense-architect" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">Enterprise Cyber Defense Architect</CrossDomainLink>
                            <CrossDomainLink to="/courses/ai-powered-cyber-security" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">AI-Powered Cyber Security Master</CrossDomainLink>
                            <CrossDomainLink to="/courses/nextgen-ai-soc-elite" targetDomain="academy" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-brand-600">NextGen AI SOC Elite Program</CrossDomainLink>
                         </div>
                      )}

                      <CrossDomainLink
                        to="/trainings/internship"
                        targetDomain="academy"
                        onClick={() => setIsOpen(false)}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                      >
                        <span>Internship</span>
                        <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-brand-50 text-brand-600 rounded border border-brand-100">Apply</span>
                      </CrossDomainLink>

                      <CrossDomainLink
                        to="/trainings"
                        targetDomain="academy"
                        onClick={() => setIsOpen(false)}
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-brand-600 hover:bg-brand-50 rounded-md mt-1 border-t border-slate-100"
                      >
                        <span>View All Programs</span>
                        <ChevronRight size={14} />
                      </CrossDomainLink>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                    className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                  >
                    Services <ChevronDown size={16} className={`transform transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'services' && (
                    <div className="pl-4 space-y-1 border-l-2 border-brand-100 ml-3">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-md"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/careers" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-900 hover:text-brand-600 hover:bg-slate-50 rounded-md">Careers</Link>

                <Link to="/contact" onClick={() => setIsOpen(false)} className="block mt-4 px-3 py-3 text-center text-base font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-md shadow-md">
                  Get Free Consultation
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;