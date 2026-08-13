import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RESOURCES } from '../data/content';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { Reveal } from '../components/Reveal';

const ResourceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const resource = RESOURCES.find(r => r.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!resource) {
    return <Navigate to="/resources" replace />;
  }

  // Schema generation
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": resource.title,
    "description": resource.metaDescription,
    "author": {
      "@type": "Person",
      "name": resource.author
    },
    "datePublished": resource.date,
    "publisher": {
      "@type": "Organization",
      "name": "TechDefends"
    }
  };

  return (
    <div className="bg-slate-50 w-full flex-grow flex flex-col">
      <Helmet>
        <title>{resource.title} | TechDefends</title>
        <meta name="description" content={resource.metaDescription} />
        <link rel="canonical" href={`https://techdefends.com/resources/${resource.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900 text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold uppercase tracking-wider mb-6">
              <Link to="/resources" className="hover:text-white transition-colors">Resources</Link> / {resource.category}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              {resource.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-brand-500" /> {resource.date}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} className="text-brand-500" /> {resource.author}
              </span>
              <span className="flex items-center gap-2">
                <Tag size={16} className="text-brand-500" /> {resource.category}
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 mb-12">
          {/* Prose content styling wrapper */}
          <div 
            className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-600 hover:prose-a:text-brand-500"
            dangerouslySetInnerHTML={{ __html: resource.content }}
          />
        </div>

        {/* CTA */}
        <div className="bg-brand-50 rounded-2xl p-8 text-center shadow-sm border border-brand-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to take the next step?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            {resource.category === 'Training & Career' 
              ? 'Join our specialized training programs to build real-world cybersecurity skills.'
              : 'Our experts are ready to assess your environment and implement enterprise-grade security.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to={`/services/${resource.relatedServiceId}`}
              className="px-6 py-3 bg-white text-brand-700 font-bold rounded-xl border border-brand-200 hover:bg-brand-50 transition-colors"
            >
              Learn More
            </Link>
            <Link 
              to={resource.category === 'Training & Career' ? "/trainings" : "/contact"}
              onClick={() => trackEvent('resource_cta_click', { resource: resource.title })}
              className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
            >
              {resource.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
