import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Search, 
  Lock, 
  Globe, 
  Clock, 
  FileText, 
  Server, 
  Terminal, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  ArrowRight, 
  ExternalLink, 
  Sparkles,
  HelpCircle,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { SecurityCheckReport, SecurityFinding } from '../server/securityScanner';
import { isScannerDomain, getMainSiteUrl } from '../utils/domain';

const SCAN_STEPS = [
  'Validating target URL & enforcing SSRF boundaries...',
  'Resolving public DNS & locking destination IP against rebinding...',
  'Probing HTTP response & evaluating redirect behaviors...',
  'Inspecting TLS certificate validity & encryption protocols...',
  'Analyzing security response headers (HSTS, CSP, XFO, XCTO)...',
  'Evaluating technology fingerprints & PHP2Shell advisory heuristics...'
];

export const SecurityCheck: React.FC = () => {
  const isScanner = isScannerDomain();
  const [urlInput, setUrlInput] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<SecurityCheckReport | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFindings, setExpandedFindings] = useState<Record<string, boolean>>({});

  const toggleFinding = (id: string) => {
    setExpandedFindings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setError('Please enter a website URL to inspect.');
      return;
    }
    if (!authorized) {
      setError('You must confirm that you own this website or have explicit authorization to assess it.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setScanStepIndex(0);

    // Animate scan stages for transparency
    const stepInterval = setInterval(() => {
      setScanStepIndex(prev => (prev < SCAN_STEPS.length - 1 ? prev + 1 : prev));
    }, 900);

    try {
      const response = await fetch('/api/security-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: urlInput.trim(),
          authorized: true
        })
      });

      clearInterval(stepInterval);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Security check failed. Please check the URL and try again.');
      }

      setReport(data.report);
      // Auto expand first 2 findings
      const initialExpanded: Record<string, boolean> = {};
      data.report.findings.slice(0, 3).forEach((f: SecurityFinding) => {
        initialExpanded[f.id] = true;
      });
      setExpandedFindings(initialExpanded);
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err.message || 'An unexpected error occurred while inspecting the target.');
      setReport(null);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFindings = report?.findings.filter(f => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Advisories & Attention') return f.status === 'Advisory' || f.status === 'Attention';
    if (selectedCategory === 'Security Headers') return f.category === 'Security Headers';
    if (selectedCategory === 'PHP & Advisories') return f.category === 'PHP & Advisory Heuristics';
    if (selectedCategory === 'TLS & Encryption') return f.category === 'TLS & Encryption';
    return true;
  }) || [];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 sm:pt-36 pb-20 selection:bg-brand-600 selection:text-white">
      <Helmet>
        <title>{isScanner ? 'PHP2Shell Security Check | Public Website Posture Scanner | TechDefends' : 'TechDefends Security Check | Evidence-Based Website Posture Scanner'}</title>
        <meta 
          name="description" 
          content="Free evidence-based website security posture scanner by TechDefends. Passively inspects public security headers, SSL/TLS certificates, technology disclosure, and PHP / PHP2Shell (CVE-2026-109618 / CVE-2026-109619) heuristics." 
        />
        <link rel="canonical" href={isScanner ? "https://php2shell.techdefends.com/" : "https://techdefends.com/security-check"} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Return Link */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 pb-4 border-b border-slate-200">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <a 
              href={getMainSiteUrl('/')} 
              className="text-slate-600 hover:text-brand-600 font-medium flex items-center gap-1 transition-colors"
            >
              <span>TechDefends Corporate</span>
              <ExternalLink size={12} className="text-slate-400" />
            </a>
            <span>/</span>
            <span className="text-slate-900 font-semibold">
              {isScanner ? 'PHP2Shell Security Check' : 'Security Check'}
            </span>
          </nav>

          <a
            href={getMainSiteUrl('/')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-brand-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label="Return to TechDefends main corporate website"
          >
            <span>&larr; Return to TechDefends.com</span>
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
            <ShieldCheck size={16} className="text-brand-600" />
            <span>TechDefends Defensive Assessment Tools</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            TechDefends <span className="text-brand-600">Security Check</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Evidence-based passive website posture inspector. Evaluate security headers, encryption strength, technology disclosures, and PHP2Shell (CVE-2026-109618 / CVE-2026-109619) version exposure indicators with zero intrusive payloads.
          </p>
        </div>

        {/* Scanner Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-10 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="target-url" className="block text-sm font-bold text-slate-900 mb-2">
                Target Website URL <span className="text-brand-600">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Globe size={18} />
                </div>
                <input
                  id="target-url"
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="e.g. https://yourcompany.com or yourcompany.com"
                  disabled={isLoading}
                  className="block w-full pl-11 pr-32 py-3.5 sm:text-base border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all"
                />
                <div className="absolute inset-y-0 right-1.5 flex items-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-lg transition-all shadow-md shadow-brand-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Inspecting...</span>
                      </>
                    ) : (
                      <>
                        <Search size={16} />
                        <span>Check Website</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Standard web ports (80, 443) only. Internal IPs, link-local addresses, and cloud metadata endpoints are strictly blocked by SSRF guards.
              </p>
            </div>

            {/* Mandatory Authorization Checkbox */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
                  disabled={isLoading}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-slate-700 leading-normal">
                  <strong className="text-slate-900">Mandatory Authorization:</strong> I confirm that I own this website or have explicit, authorized permission to assess its public security posture. I acknowledge that TechDefends performs bounded, passive HTTP observations only.
                </span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3 animate-fade-in">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-red-800">
                  <p className="font-semibold mb-0.5">Scan Precondition Not Met</p>
                  <p>{error}</p>
                </div>
              </div>
            )}
          </form>

          {/* Active Scan Progress Animation */}
          {isLoading && (
            <div className="mt-8 pt-8 border-t border-slate-200 animate-fade-in">
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw size={20} className="text-brand-600 animate-spin" />
                <h4 className="text-sm font-bold text-slate-900">Passive Security Assessment in Progress</h4>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-600 bg-slate-900 text-slate-100 p-3 rounded-lg flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{SCAN_STEPS[scanStepIndex]}</span>
              </p>
            </div>
          )}
        </div>

        {/* Scan Results View */}
        {report && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Report Header Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-brand-600 mb-1">
                    <CheckCircle size={14} />
                    <span>Passive Inspection Completed</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 break-all">{report.targetUrl}</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Resolved IP: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">{report.resolvedIp}</code> • Latency: {report.responseTimeMs}ms • HTTP Status: {report.httpStatus}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-sm"
                  >
                    <Printer size={14} />
                    <span>Print Report</span>
                  </button>
                  <button
                    onClick={() => { setReport(null); setUrlInput(''); }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    <RefreshCw size={14} />
                    <span>New Scan</span>
                  </button>
                </div>
              </div>

              {/* Summary Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                  <div className="text-3xl font-black text-emerald-600 mb-1">{report.summary.passes}</div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">Passed Controls</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                  <div className="text-3xl font-black text-amber-600 mb-1">{report.summary.attentions}</div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">Attention Needed</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                  <div className="text-3xl font-black text-brand-600 mb-1">{report.summary.advisories}</div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">Advisory Signals</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
                  <div className="text-3xl font-black text-slate-700 mb-1">{report.summary.informational}</div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">Informational</div>
                </div>
              </div>
            </div>

            {/* PHP2Shell Spotlight Panel */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-700 gap-2">
                <div className="flex items-center gap-2">
                  <Cpu className="text-brand-500" size={22} />
                  <h3 className="text-lg font-bold">PHP & PHP2Shell Exposure Assessment</h3>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Advisory Dataset: {new Date(report.advisoryDatasetTimestamp).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-brand-900/60 text-brand-400 border border-brand-700/60">
                      Verdict
                    </span>
                    <span className="text-sm font-bold text-white">
                      {report.phpAssessment.verdictLabel}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                    {report.phpAssessment.explanation}
                  </p>

                  <div className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-lg border border-slate-700 font-mono space-y-1">
                    <div className="font-semibold text-slate-300">Observed Signals:</div>
                    {report.phpAssessment.evidence.map((ev, i) => (
                      <div key={i}>• {ev}</div>
                    ))}
                  </div>
                </div>

                {/* Fixed Version Thresholds */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/80">
                    <div className="text-slate-400 font-semibold mb-0.5">PHP 8.2 Fixed In</div>
                    <div className="font-mono text-emerald-400 font-bold">8.2.35+</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/80">
                    <div className="text-slate-400 font-semibold mb-0.5">PHP 8.3 Fixed In</div>
                    <div className="font-mono text-emerald-400 font-bold">8.3.36+</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/80">
                    <div className="text-slate-400 font-semibold mb-0.5">PHP 8.4 Fixed In</div>
                    <div className="font-mono text-emerald-400 font-bold">8.4.27+</div>
                  </div>
                  <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/80">
                    <div className="text-slate-400 font-semibold mb-0.5">PHP 8.5 Fixed In</div>
                    <div className="font-mono text-emerald-400 font-bold">8.5.12+</div>
                  </div>
                </div>

                {/* Important Vendor Backport Note */}
                <div className="bg-amber-950/40 border-l-4 border-amber-500 p-3 rounded-r-lg text-xs text-amber-200">
                  <strong>Important Caveat for Linux Distributions:</strong> Ubuntu, Debian, and RHEL package maintainers frequently backport security patches into release builds (e.g. <code>8.3.6-0ubuntu0.24.04.1</code>) without changing the upstream version string. Public headers alone cannot verify internal package changelogs.
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
              {['All', 'Advisories & Attention', 'Security Headers', 'PHP & Advisories', 'TLS & Encryption'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Findings Accordion List */}
            <div className="space-y-4">
              {filteredFindings.map((finding) => {
                const isExpanded = expandedFindings[finding.id] || false;
                const isPass = finding.status === 'Pass';
                const isAttention = finding.status === 'Attention';
                const isAdvisory = finding.status === 'Advisory';

                return (
                  <div 
                    key={finding.id}
                    className={`bg-white rounded-xl shadow-sm border transition-all ${
                      isAdvisory ? 'border-brand-300 ring-1 ring-brand-100' : (isAttention ? 'border-amber-300' : 'border-slate-200')
                    }`}
                  >
                    <div 
                      onClick={() => toggleFinding(finding.id)}
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/60 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {isPass && <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />}
                        {isAttention && <AlertTriangle size={20} className="text-amber-500 flex-shrink-0" />}
                        {isAdvisory && <ShieldAlert size={20} className="text-brand-600 flex-shrink-0" />}
                        {finding.status === 'Informational' && <Info size={20} className="text-slate-400 flex-shrink-0" />}

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{finding.name}</h4>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {finding.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{finding.evidence}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isPass ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          isAdvisory ? 'bg-red-50 text-red-700 border border-red-200' :
                          isAttention ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {finding.status}
                        </span>
                        {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-3.5 text-xs sm:text-sm animate-fade-in">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Observed Evidence</div>
                          <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-lg overflow-x-auto">
                            {finding.evidence}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Assessment & Explanation</div>
                          <p className="text-slate-700 leading-relaxed">{finding.explanation}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                              <Sparkles size={14} className="text-brand-600" />
                              <span>Remediation Advice</span>
                            </div>
                            <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{finding.remediation}</p>
                          </div>

                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                              <HelpCircle size={14} className="text-slate-500" />
                              <span>Known Limitations & Verification Level</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed mb-1.5">{finding.limitations}</p>
                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                              Confidence: {finding.confidence}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Disclaimer & Transparency Banner */}
            <div className="bg-slate-100 border border-slate-300/80 rounded-2xl p-6 text-xs text-slate-600 space-y-2">
              <h5 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Info size={16} className="text-slate-600" />
                <span>Passive Inspection Principles & Scope Limitations</span>
              </h5>
              <p className="leading-relaxed">
                {report.disclaimer}
              </p>
              <p className="leading-relaxed text-slate-500">
                TechDefends Security Check is designed for baseline visibility and hygiene assessment. For comprehensive penetration testing, vulnerability assessment, and source code auditing, explore our <a href="/services/vapt" className="text-brand-600 font-semibold underline">Vulnerability Assessment & Penetration Testing (VAPT) services</a>.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default SecurityCheck;
