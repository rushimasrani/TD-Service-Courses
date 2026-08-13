import React, { useState } from 'react';
import { Reveal } from './Reveal';

const techCategories = [
  {
    name: 'Cybersecurity',
    vendors: [
      { name: 'Sophos', alt: 'Sophos cybersecurity solutions', logo: '/vendors/sophos.svg' },
      { name: 'Fortinet', alt: 'Fortinet network security solutions', logo: '/vendors/fortinet.svg' },
      { name: 'Check Point', alt: 'Check Point cybersecurity solutions', logo: '/vendors/check-point.png' },
      { name: 'CrowdStrike', alt: 'CrowdStrike endpoint security solutions', logo: '/vendors/crowdstrike.svg' },
      { name: 'Palo Alto Networks', alt: 'Palo Alto Networks cybersecurity solutions', logo: '/vendors/palo-alto-networks.svg' },
      { name: 'Bitdefender', alt: 'Bitdefender cybersecurity solutions', logo: '/vendors/bitdefender.svg' },
      { name: 'Barracuda', alt: 'Barracuda email and network security solutions', logo: '/vendors/barracuda.svg' },
      { name: 'Safetica', alt: 'Safetica data loss prevention solutions', logo: '/vendors/safetica.png' },
    ]
  },
  {
    name: 'SIEM & Observability',
    vendors: [
      { name: 'Microsoft Sentinel', alt: 'Microsoft Sentinel SIEM solutions', logo: '/vendors/microsoft-sentinel.svg' },
      { name: 'Zabbix', alt: 'Zabbix monitoring solutions', logo: '/vendors/zabbix.svg' },
      { name: 'Grafana', alt: 'Grafana observability solutions', logo: '/vendors/grafana.svg' },
    ]
  },
  {
    name: 'Cloud & Productivity',
    vendors: [
      { name: 'Microsoft 365', alt: 'Microsoft 365 solutions', logo: '/vendors/microsoft-365.svg' },
      { name: 'Google Workspace', alt: 'Google Workspace productivity solutions', logo: '/vendors/google-workspace.svg' },
      { name: 'AWS', alt: 'AWS cloud solutions', logo: '/vendors/aws.svg' },
    ]
  },
  {
    name: 'Infrastructure & Virtualization',
    vendors: [
      { name: 'Cisco', alt: 'Cisco networking solutions', logo: '/vendors/cisco.svg' },
      { name: 'VMware', alt: 'VMware virtualization solutions', logo: '/vendors/vmware.svg' },
      { name: 'Proxmox', alt: 'Proxmox virtualization solutions', logo: '/vendors/proxmox.svg' },
    ]
  },
  {
    name: 'Business & Commerce',
    vendors: [
      { name: 'Shopify', alt: 'Shopify commerce solutions', logo: '/vendors/shopify.svg' },
    ]
  }
];

const VendorLogo: React.FC<{ vendor: any }> = ({ vendor }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full min-h-[140px] group"
    >
      <div className="h-12 w-full flex items-center justify-center mb-3">
        <img 
          src={vendor.logo} 
          alt={vendor.alt} 
          className="max-h-full max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          loading="lazy"
        />
      </div>
      <span className="font-semibold text-sm text-slate-700 text-center tracking-tight mt-auto">
        {vendor.name}
      </span>
    </div>
  );
};

const TechnologyEcosystem = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
              Security & Technology Solutions We Offer
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              TechDefends provides technology sourcing, licensing, deployment, implementation, configuration and ongoing support across leading cybersecurity, networking, cloud and IT platforms.
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          {/* Desktop/Tablet Tabs */}
          <Reveal delay={0.1}>
            <div className="hidden md:flex flex-wrap justify-center gap-2 mb-10">
              {techCategories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setActiveTab(index)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === index 
                      ? 'bg-brand-600 text-white shadow-md' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                  aria-pressed={activeTab === index}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown Alternative */}
            <div className="md:hidden mb-8">
              <select 
                value={activeTab}
                onChange={(e) => setActiveTab(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                aria-label="Select technology category"
              >
                {techCategories.map((category, index) => (
                  <option key={category.name} value={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {techCategories[activeTab].vendors.map((vendor, idx) => (
                <VendorLogo key={idx} vendor={vendor} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default TechnologyEcosystem;
