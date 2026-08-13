export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientContext: string;
  businessProblem: string;
  discovery: string;
  vulnerabilities: string;
  solution: string;
  implementation: string;
  outcome: string;
  technologies: string[];
  takeaways: string[];
  relatedServiceId: string;
  metaDescription: string;
  industry: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-financial-vapt',
    slug: 'financial-services-web-application-security-assessment',
    title: 'Financial Services Company — Web Application Security Assessment',
    industry: 'Financial Services',
    clientContext: 'A leading Non-Banking Financial Company (NBFC) in Ahmedabad offering digital lending and wealth management solutions.',
    businessProblem: 'The client was launching a new customer-facing wealth management portal and needed to ensure strict compliance with RBI cybersecurity guidelines before going live. A data breach would cause significant financial and reputational damage.',
    discovery: 'TechDefends conducted a comprehensive Vulnerability Assessment and Penetration Testing (VAPT) across the new portal\'s web interface and underlying APIs, utilizing both automated scanning and deep-dive manual testing techniques.',
    vulnerabilities: 'Our assessment uncovered several critical flaws, including Broken Object Level Authorization (BOLA) in the API which could allow cross-account data access, and a Stored Cross-Site Scripting (XSS) vulnerability in the user profile module.',
    solution: 'We provided a detailed remediation roadmap, prioritizing the patching of the API authorization flaws and implementing input sanitization to eliminate the XSS risks.',
    implementation: 'Working closely with the client\'s development team, we verified the deployed fixes through a re-testing phase. We also integrated automated security scanning into their CI/CD pipeline to prevent future regressions.',
    outcome: 'The client successfully launched the wealth management portal on time, aligned with RBI cybersecurity guidelines. Zero security breaches have been reported post-launch, securing sensitive financial data for over 50,000 active users.',
    technologies: ['Burp Suite Professional', 'OWASP ZAP', 'Nessus', 'Postman', 'GitLab CI'],
    takeaways: [
      'API security is just as critical as web interface security in modern applications.',
      'Integrating security testing into the CI/CD pipeline significantly reduces long-term remediation costs.',
      'Compliance should be viewed as a baseline, not the ultimate goal of security testing.'
    ],
    relatedServiceId: 'vapt',
    metaDescription: 'Read our case study on how TechDefends secured a financial services company\'s web application through comprehensive VAPT and API security testing.'
  },
  {
    id: 'cs-healthcare-network',
    slug: 'healthcare-provider-network-security-assessment',
    title: 'Healthcare Provider — Network Security & Ransomware Defense',
    industry: 'Healthcare',
    clientContext: 'A prominent multi-specialty hospital in Gujarat managing thousands of electronic health records (EHR) and connected medical devices.',
    businessProblem: 'Following a surge in ransomware attacks targeting the healthcare sector, the hospital board mandated a complete review of their network perimeter and internal security posture to prevent potential operational downtime and patient data exposure.',
    discovery: 'Our team performed a comprehensive network architecture review and internal penetration test. We identified flat network structures, legacy unpatched systems, and weak active directory configurations.',
    vulnerabilities: 'The primary risks included lack of network segmentation (allowing lateral movement), exposed RDP services, and several legacy medical devices vulnerable to known exploits like BlueKeep.',
    solution: 'TechDefends designed a zero-trust network architecture, implemented strict VLAN segmentation for medical devices, and deployed a Next-Generation Firewall (NGFW) to monitor and filter internal traffic.',
    implementation: 'The deployment was executed during low-traffic night shifts to ensure zero disruption to clinical operations. We also hardened their Active Directory and implemented multi-factor authentication (MFA) for all administrative access.',
    outcome: 'The hospital significantly reduced its attack surface. The network segmentation successfully isolated a minor malware incident on a guest workstation months later, preventing it from reaching the critical EHR servers.',
    technologies: ['Palo Alto Networks NGFW', 'Cisco Identity Services Engine (ISE)', 'Nmap', 'Metasploit', 'Microsoft Active Directory Security'],
    takeaways: [
      'Network segmentation is vital for isolating vulnerable legacy devices that cannot be patched.',
      'Ransomware defense requires a multi-layered approach, starting with a strong perimeter and internal zero-trust policies.',
      'Healthcare organizations must prioritize security without disrupting critical clinical workflows.'
    ],
    relatedServiceId: 'network-security',
    metaDescription: 'Discover how TechDefends protected a healthcare provider from ransomware attacks through advanced network security and segmentation.'
  }
];

export interface Resource {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string; // HTML or Markdown content, simplified for this scope
  date: string;
  author: string;
  relatedServiceId: string;
  metaDescription: string;
  ctaText: string;
}

export const RESOURCES: Resource[] = [
  {
    id: 'res-what-is-vapt',
    slug: 'what-is-vapt-why-businesses-need-it',
    title: 'What is VAPT and Why Businesses Need It',
    category: 'VAPT',
    date: '2026-08-10',
    author: 'TechDefends Security Team',
    relatedServiceId: 'vapt',
    metaDescription: 'Learn what Vulnerability Assessment and Penetration Testing (VAPT) is, the difference between the two, and why businesses in Ahmedabad need it to secure their assets.',
    ctaText: 'Request a VAPT Quote',
    content: `
      <h3>Understanding VAPT</h3>
      <p>Vulnerability Assessment and Penetration Testing (VAPT) is a comprehensive approach to identifying and addressing security flaws in an organization's IT infrastructure and software applications. While often grouped together, Vulnerability Assessment (VA) and Penetration Testing (PT) are distinct but complementary processes.</p>
      
      <h3>Vulnerability Assessment vs. Penetration Testing</h3>
      <p><strong>Vulnerability Assessment</strong> is the automated process of scanning systems to identify known vulnerabilities. It provides a broad overview of potential weaknesses, such as unpatched software or misconfigurations. Think of it as checking if all the doors and windows in a house are locked.</p>
      <p><strong>Penetration Testing</strong>, on the other hand, is a manual, targeted effort by ethical hackers to exploit the vulnerabilities identified during the assessment phase. It simulates a real-world cyberattack to determine the actual impact of a flaw. To continue the analogy, it involves trying to pick the locks or find alternative ways into the house.</p>
      
      <h3>Why Businesses Need VAPT</h3>
      <ul>
        <li><strong>Proactive Risk Management:</strong> Identify and fix security gaps before malicious actors can exploit them.</li>
        <li><strong>Regulatory Compliance:</strong> Many industry standards (such as PCI DSS, HIPAA, and RBI guidelines) mandate regular VAPT to ensure data protection.</li>
        <li><strong>Protect Customer Trust:</strong> A data breach can cause irreparable damage to a company's reputation. Demonstrating a commitment to security builds trust with clients and partners.</li>
        <li><strong>Cost Savings:</strong> The cost of remediating vulnerabilities proactively is significantly lower than the financial impact of a data breach, including fines, legal fees, and lost business.</li>
      </ul>
      
      <h3>How Often Should a Business Perform VAPT?</h3>
      <p>The frequency of VAPT depends on several factors, including the organization's size, industry, and the rate of change in their IT environment. However, as a general best practice, businesses should conduct comprehensive VAPT at least annually, and after any significant changes to their infrastructure or applications.</p>
    `
  },
  {
    id: 'res-m365-security',
    slug: 'how-to-improve-microsoft-365-security',
    title: 'How to Improve Microsoft 365 Security',
    category: 'Microsoft 365',
    date: '2026-07-25',
    author: 'TechDefends Cloud Security Team',
    relatedServiceId: 'microsoft-365',
    metaDescription: 'Discover actionable steps to enhance your Microsoft 365 security, mitigate email threats like phishing, and protect corporate data.',
    ctaText: 'Secure Your M365 Environment',
    content: `
      <h3>The Importance of Microsoft 365 Security</h3>
      <p>Microsoft 365 is the backbone of modern corporate communication and collaboration. However, its widespread adoption makes it a primary target for cybercriminals. Business Email Compromise (BEC), phishing, and ransomware are common threats that exploit weak M365 configurations.</p>
      
      <h3>Common Microsoft 365 Security Risks</h3>
      <ul>
        <li><strong>Phishing Attacks:</strong> Deceptive emails designed to steal user credentials or distribute malware.</li>
        <li><strong>Account Takeover:</strong> Attackers gaining unauthorized access to employee accounts, often due to weak passwords or lack of MFA.</li>
        <li><strong>Data Leakage:</strong> Accidental or intentional sharing of sensitive corporate information outside the organization.</li>
      </ul>
      
      <h3>Checklist for Improving M365 Security</h3>
      <ol>
        <li><strong>Enable Multi-Factor Authentication (MFA):</strong> This is the single most effective step to prevent account takeovers. Enforce MFA for all users, especially administrators.</li>
        <li><strong>Configure Anti-Phishing and Anti-Spam Policies:</strong> Utilize Microsoft Defender for Office 365 to set up robust email filtering rules. Ensure Safe Links and Safe Attachments are enabled.</li>
        <li><strong>Implement Conditional Access Policies:</strong> Restrict access to M365 resources based on user location, device compliance, and risk level. For example, block access from countries where you don't conduct business.</li>
        <li><strong>Disable Legacy Authentication:</strong> Legacy authentication protocols (like POP3, IMAP, and SMTP) do not support MFA and are frequently targeted by automated brute-force attacks.</li>
        <li><strong>Monitor Audit Logs:</strong> Regularly review M365 audit logs for suspicious activities, such as unusual login locations, mass file downloads, or unauthorized mailbox forwarding rules.</li>
      </ol>
      
      <p>Implementing these foundational security controls will drastically reduce your organization's susceptibility to email-borne threats and unauthorized access.</p>
    `
  },
  {
    id: 'res-start-cyber-career',
    slug: 'how-to-start-a-career-in-cybersecurity',
    title: 'How to Start a Career in Cybersecurity',
    category: 'Training & Career',
    date: '2026-08-01',
    author: 'TechDefends Training Division',
    relatedServiceId: 'trainings',
    metaDescription: 'A comprehensive guide on starting a career in cybersecurity, covering essential skills, certifications, and SOC Analyst roles.',
    ctaText: 'Explore Training Programs',
    content: `
      <h3>The Growing Demand for Cybersecurity Professionals</h3>
      <p>The cybersecurity industry is experiencing unprecedented growth, driven by the increasing frequency and sophistication of cyber threats. Organizations across all sectors are actively seeking skilled professionals to defend their networks and data, creating immense opportunities for those entering the field.</p>
      
      <h3>Essential Skills for Beginners</h3>
      <p>Before diving into advanced security concepts, it's crucial to build a strong foundation in core IT principles:</p>
      <ul>
        <li><strong>Networking Fundamentals:</strong> Understand how data travels across networks (TCP/IP, OSI model, routing, switching, DNS, HTTP).</li>
        <li><strong>Operating Systems:</strong> Gain proficiency in both Windows and Linux environments, including command-line administration.</li>
        <li><strong>Basic Scripting:</strong> Learn languages like Python or Bash to automate tasks and understand basic programming logic.</li>
      </ul>
      
      <h3>Exploring Career Paths: SOC Analyst vs. VAPT</h3>
      <p>Two of the most common entry points into cybersecurity are the Security Operations Center (SOC) Analyst and the Vulnerability Assessment and Penetration Testing (VAPT) professional.</p>
      <p><strong>SOC Analyst (Blue Team):</strong> Focuses on defensive security. SOC Analysts monitor network traffic, analyze security alerts, and respond to incidents using tools like SIEM (Security Information and Event Management).</p>
      <p><strong>VAPT (Red Team):</strong> Focuses on offensive security. Penetration testers simulate attacks to identify vulnerabilities in applications and infrastructure before malicious hackers can exploit them.</p>
      
      <h3>Certifications to Consider</h3>
      <p>While practical skills are paramount, certifications can help validate your knowledge and get your foot in the door:</p>
      <ul>
        <li><strong>CompTIA Security+:</strong> An excellent entry-level certification covering foundational security concepts.</li>
        <li><strong>Certified Ethical Hacker (CEH):</strong> A popular certification for those interested in offensive security and penetration testing.</li>
        <li><strong>Cisco Certified CyberOps Associate:</strong> A strong credential for aspiring SOC Analysts, focusing on security operations and incident response.</li>
      </ul>
      <p>Combining foundational knowledge, hands-on practice, and relevant certifications is the proven path to launching a successful career in cybersecurity.</p>
    `
  }
];
