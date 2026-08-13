import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { RESOURCES } from '../data/content';
import { ArrowRight, BookOpen, Calendar, User } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const Resources: React.FC = () => {
  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>Cybersecurity Resources & Blog | TechDefends</title>
        <meta name="description" content="Expert insights on cybersecurity, VAPT, Microsoft 365, network security, and IT careers from the experts at TechDefends." />
        <link rel="canonical" href="https://techdefends.com/resources" />
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Security <span className="text-brand-500">Resources</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl">
              Expert insights, security checklists, and strategic guidance for businesses and cybersecurity professionals.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESOURCES.map((resource, idx) => (
            <Reveal key={resource.id} delay={idx * 0.1}>
              <Link 
                to={`/resources/${resource.slug}`}
                className="block bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-500 hover:shadow-xl transition-all h-full flex flex-col"
              >
                <div className="mb-4">
                  <span className="bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {resource.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{resource.title}</h2>
                <p className="text-slate-600 mb-6 flex-grow line-clamp-3">{resource.metaDescription}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                  <div className="flex flex-col gap-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {resource.date}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {resource.author}</span>
                  </div>
                  <div className="flex items-center text-brand-600 font-semibold group bg-brand-50 p-2 rounded-lg">
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
