import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../data/content';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const CaseStudies: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>Cybersecurity Case Studies & Success Stories | TechDefends</title>
        <meta name="description" content="Read our cybersecurity case studies. Discover how TechDefends helps businesses in Ahmedabad and across India secure their infrastructure with VAPT and Managed IT." />
        <link rel="canonical" href="https://techdefends.com/case-studies" />
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Client <span className="text-brand-500">Case Studies</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Real-world examples of how we secure businesses against modern cyber threats.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study, idx) => (
            <Reveal key={study.id} delay={idx * 0.1}>
              <Link 
                to={`/case-studies/${study.slug}`}
                className="block bg-white rounded-2xl p-8 border border-slate-200 hover:border-brand-500 hover:shadow-xl transition-all h-full flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {study.industry}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{study.title}</h2>
                <p className="text-slate-600 mb-6 flex-grow">{study.businessProblem.substring(0, 150)}...</p>
                <div className="flex items-center text-brand-600 font-semibold group mt-auto">
                  Read Case Study 
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
