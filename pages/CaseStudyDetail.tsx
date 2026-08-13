import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CASE_STUDIES } from '../data/content';
import { ArrowLeft, CheckCircle2, Shield, Target, Activity } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { Reveal } from '../components/Reveal';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = CASE_STUDIES.find(cs => cs.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  // Schema generation
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": study.title,
    "description": study.metaDescription,
    "publisher": {
      "@type": "Organization",
      "name": "TechDefends"
    }
  };

  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>{study.title} | Case Study | TechDefends</title>
        <meta name="description" content={study.metaDescription} />
        <link rel="canonical" href={`https://techdefends.com/case-studies/${study.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link to="/case-studies" className="inline-flex items-center text-brand-400 hover:text-brand-300 mb-6 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back to Case Studies
            </Link>
            <div className="mb-4">
              <span className="bg-brand-600/20 text-brand-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-500/30">
                {study.industry}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              {study.title}
            </h1>
          </Reveal>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 space-y-12">
          
          <Reveal>
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="text-brand-600" size={24} /> Client Context
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">{study.clientContext}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Activity className="text-rose-500" size={24} /> The Challenge
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">{study.businessProblem}</p>
            </section>
          </Reveal>

          <Reveal>
            <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Discovery & Assessment</h2>
              <p className="text-slate-700 leading-relaxed mb-4">{study.discovery}</p>
              <h3 className="font-semibold text-slate-900 mb-2">Key Vulnerabilities Identified:</h3>
              <p className="text-slate-700 leading-relaxed">{study.vulnerabilities}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="text-emerald-500" size={24} /> Solution & Implementation
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg mb-4">{study.solution}</p>
              <p className="text-slate-700 leading-relaxed text-lg">{study.implementation}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 text-emerald-600">Business Outcome</h2>
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <p className="text-emerald-900 leading-relaxed font-medium text-lg">{study.outcome}</p>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h2>
              <ul className="space-y-3">
                {study.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-500 shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section className="border-t border-slate-200 pt-8 mt-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Technologies Leveraged</h3>
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-brand-900 rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Secure Your Infrastructure</h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
            Contact us to discuss how we can implement similar security measures for your organization.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to={`/services/${study.relatedServiceId}`}
              className="px-6 py-3 bg-white text-brand-900 font-bold rounded-xl hover:bg-slate-100 transition-colors"
            >
              View Related Service
            </Link>
            <Link 
              to="/contact?source=case-study"
              onClick={() => trackEvent('case_study_cta_click', { case_study: study.title })}
              className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500 transition-colors border border-brand-500"
            >
              Talk to a Security Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
