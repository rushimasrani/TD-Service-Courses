import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, ArrowRight, CheckCircle, ShieldCheck, Briefcase } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const COURSES = [
  {
    id: 'aws-solution-architect',
    title: 'AWS Solution Architect Career Program',
    level: 'Intermediate',
    duration: '2 to 3 Months',
    features: ['AWS Cloud Computing Training', 'IAM & Cloud Security', 'Serverless Architecture', 'Real-Time Cloud Projects'],
  },
  {
    id: 'diploma-enterprise-network-security',
    title: 'Diploma in Enterprise Network Engineering & Security',
    level: 'Beginner to Intermediate',
    duration: '4 Months',
    features: ['CCNA 200-301 Training', 'Routing & Switching Practical', 'VLAN & Inter-VLAN Routing', 'Network Security Fundamentals'],
  },
  {
    id: 'elite-offensive-security',
    title: 'Elite Offensive Security & Ethical Hacking Program',
    level: 'Beginner to Advanced',
    duration: 'Up to 7 Months',
    features: ['Ethical Hacking Fundamentals', 'Web Application Penetration Testing', 'Vulnerability Assessment', 'Real-Time Hacking Labs'],
  },
  {
    id: 'ms-office-365',
    title: 'Master in Microsoft Office 365 Suite',
    level: 'Beginner to Intermediate',
    duration: '1 Month',
    features: ['Microsoft 365 Administration', 'User & License Management', 'Exchange Online Administration', 'Hands-on Practical Labs'],
  },
  {
    id: 'professional-devops-engineering',
    title: 'Professional DevOps Engineering Program',
    level: 'Beginner to Intermediate',
    duration: '3 to 4 Months',
    features: ['DevOps Fundamentals', 'Linux Administration', 'CI/CD Pipeline Implementation', 'Docker & Containerization'],
  },
  {
    id: 'professional-server-management',
    title: 'Professional Server Management Program',
    level: 'Beginner to Intermediate',
    duration: 'Up to 3 Months',
    features: ['Windows & Linux Server Administration', 'Active Directory Management', 'Server Virtualization', 'Hands-on Practical Labs'],
  },
  {
    id: 'soc-monitoring-incident-response',
    title: 'SOC Monitoring & Incident Response Specialist',
    level: 'Beginner to Intermediate',
    duration: '4 Months',
    features: ['SOC Fundamentals', 'Security Monitoring Techniques', 'SIEM Concepts & Log Analysis', 'Incident Response Methodologies'],
  }
];

const CAREER_COURSES = [
  {
    id: 'network-engineering-diploma',
    title: 'Advanced Diploma in Enterprise Network Engineering & Security',
    level: 'Professional',
    duration: '6 to 7 Months',
    features: ['Advanced Enterprise Networking', 'SDWAN Concepts & Architecture', 'Network Monitoring (Zabbix & Grafana)', 'Real-Time Practical Labs'],
  },
  {
    id: 'devops-master-program',
    title: 'Enterprise Cloud & DevOps Master Program',
    level: 'Professional',
    duration: '6 Months',
    features: ['Complete AWS Cloud Training', 'CI/CD Pipeline Implementation', 'Docker & Kubernetes', 'Infrastructure as Code (IaC)'],
  },
  {
    id: 'enterprise-cyber-defense-architect',
    title: 'Enterprise Cyber Defense Architect',
    level: 'Professional',
    duration: '6 to 7 Months',
    features: ['AWS Infrastructure Deployment', 'SOC-101 Security Operations', 'Security Event Monitoring', 'Real-Time Cloud & Security Labs'],
  },
  {
    id: 'ai-powered-cyber-security',
    title: 'Master Program in AI-Powered Cyber Security',
    level: 'Master',
    duration: '12 Months',
    features: ['Complete AWS Cloud Training', 'SOC Monitoring & Incident Response', 'Ethical Hacking & VAPT', 'AI-Powered Cyber Security Concepts'],
  },
  {
    id: 'nextgen-ai-soc-elite',
    title: 'NextGen AI SOC Elite Program',
    level: 'Elite',
    duration: '10 Months',
    features: ['Advanced SOC Operations Training', 'AI-Powered Security Monitoring', 'Threat Detection & Incident Response', 'SIEM & Log Analysis'],
  }
];

const Trainings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'careers'>('courses');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('tab') === 'careers') {
      setActiveTab('careers');
    } else if (searchParams.get('tab') === 'courses') {
      setActiveTab('courses');
    }
  }, [location.search]);

  const handleTabClick = (tab: 'courses' | 'careers') => {
    setActiveTab(tab);
    navigate(`/trainings?tab=${tab}`, { replace: true });
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Cybersecurity <span className="text-brand-600">Trainings</span>
          </h1>
          <p className="text-lg text-slate-600">
            Elevate your skills or launch a new career in cybersecurity with our industry-leading training programs led by active practitioners.
          </p>
        </div>

        {/* Placement Support Banner */}
        <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up delay-100">
          <div className="bg-gradient-to-br from-brand-600 to-indigo-800 rounded-3xl p-8 sm:p-10 shadow-lg text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-500/30">
            <div className="absolute -top-10 -right-10 opacity-10 transform rotate-12">
              <Briefcase size={250} />
            </div>
            
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/10">
                  <ShieldCheck size={20} className="text-white" />
                </div>
                <span className="font-bold tracking-wider text-brand-100 uppercase text-sm">Career Assurance</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">100% Placement Support <br className="hidden md:block"/>for Career Courses</h2>
              <p className="text-brand-50 text-base md:text-lg max-w-xl opacity-90 leading-relaxed">
                We provide placement guaranty, dedicated interview preparation, resume building, and comprehensive career support to help you land your dream tech role.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <button 
                onClick={() => handleTabClick('careers')} 
                className="w-full md:w-auto bg-white text-brand-700 hover:bg-brand-50 font-bold py-4 px-8 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                View Career Courses
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
            <button
              onClick={() => handleTabClick('courses')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'courses' 
                ? 'bg-brand-50 text-brand-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen size={18} />
              Courses
            </button>
            <button
              onClick={() => handleTabClick('careers')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'careers' 
                ? 'bg-brand-50 text-brand-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GraduationCap size={18} />
              Career Courses
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
          
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-8">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Specialized Courses</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Focused, short-term courses designed to upskill professionals in specific cybersecurity domains.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {COURSES.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                          {course.level}
                        </span>
                        <span className="text-sm font-medium text-slate-500">{course.duration}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">
                        {course.title}
                      </h3>
                      <ul className="space-y-3 mb-8">
                        {course.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle size={16} className="text-brand-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to={`/courses/${course.id}`} className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-50 hover:bg-brand-50 text-slate-900 hover:text-brand-700 font-semibold rounded-xl transition-colors border border-slate-200 hover:border-brand-200">
                        View Details
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Courses Tab */}
          {activeTab === 'careers' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Career Advancement Programs</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Comprehensive, multi-month bootcamps designed to land you a new role in cybersecurity and network engineering.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {CAREER_COURSES.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                    <div className="p-8 pl-10">
                       <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold rounded-full border border-brand-100">
                          {course.level}
                        </span>
                        <span className="text-sm font-medium text-slate-500">{course.duration}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-600 transition-colors">
                        {course.title}
                      </h3>
                      <ul className="space-y-3 mb-8">
                        {course.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle size={16} className="text-brand-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to={`/courses/${course.id}`} className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-brand-900/20">
                        View Program Details
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Trainings;
