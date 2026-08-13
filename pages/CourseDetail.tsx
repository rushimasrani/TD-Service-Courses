import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import { ArrowRight, CheckCircle, Clock, ShieldCheck, Terminal, Target, HeartHandshake, Briefcase, IndianRupee, MessageSquare, Star, Quote, ChevronDown, Download, X, GitCompare, Loader2, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const TESTIMONIALS = [
  {
    name: "Aman Sharma",
    role: "SOC Analyst at TCS",
    content: "The training was phenomenal. The hands-on labs and 100% Placement Guarantee really helped me secure my dream job.",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "Security Engineer",
    content: "I loved the real-world scenarios. The instructors are industry experts who know what it takes to succeed.",
    rating: 5
  },
  {
    name: "Rahul Verma",
    role: "Cloud Architect",
    content: "This program transformed my career. The comprehensive curriculum and interview prep were exactly what I needed.",
    rating: 5
  }
];

const FAQS = [
  {
    question: "What are the prerequisites for this course?",
    answer: "A basic understanding of IT concepts is helpful, but we start from the fundamentals. No prior coding experience is strictly required."
  },
  {
    question: "Is there a 100% Placement Guarantee?",
    answer: "Yes, for our Career Courses, we offer 100% Placement Guarantee, including mock interviews, resume building, and direct referrals."
  },
  {
    question: "Do you provide hands-on labs?",
    answer: "Absolutely! We focus heavily on practical application with real-world scenarios and dedicated lab environments."
  },
  {
    question: "What does the certification process look like?",
    answer: "Upon successful completion of the modules and final assessment, you will receive an industry-recognized certificate from TechDefends."
  }
];

export const COURSES_DATA: Record<string, any> = {
  'devops-master-program': {
    title: 'Enterprise Cloud & DevOps Master Program',
    overview: 'A career-focused training program designed for students, freshers, and IT professionals to build a successful career in Cloud Computing and DevOps Engineering. It covers AWS cloud infrastructure, DevOps automation, cloud architecture, CI/CD pipelines, containerization, monitoring, and enterprise cloud deployment.',
    duration: '6 Months',
    fees: '₹44,999/-',
    format: 'Real-Time Labs',
    highlights: [
      'Complete AWS Cloud Training',
      'AWS Solution Architecture Concepts',
      'AWS Cloud Security & IAM',
      'VPC & Cloud Networking',
      'EC2, S3 & Storage Services',
      'Database & Monitoring Services',
      'CI/CD Pipeline Implementation',
      'Docker & Kubernetes',
      'Jenkins Automation',
      'Infrastructure as Code (IaC)',
      'Linux Administration',
      'Real-Time Cloud & DevOps Projects',
      'Hands-on Practical Labs',
      '5 Interview Preparation Sessions'
    ],
    modules: [
      { title: 'AWS Cloud Fundamentals', desc: 'Core cloud computing concepts, AWS Global Infrastructure, and pricing models.' },
      { title: 'AWS Identity & Security', desc: 'IAM, resource policies, security groups, KMS, and cloud security best practices.' },
      { title: 'AWS Networking', desc: 'VPC design, subnets, route tables, internet gateways, NAT, and peering.' },
      { title: 'AWS Compute Services', desc: 'EC2 instances, load balancing (ELB), auto-scaling, and compute optimization.' },
      { title: 'AWS Storage Services', desc: 'S3, EBS, EFS, storage classes, and lifecycle management.' },
      { title: 'AWS Database Services', desc: 'RDS, DynamoDB, ElastiCache, and database migration.' },
      { title: 'Monitoring & Logging', desc: 'CloudWatch, CloudTrail, AWS Config, and operational monitoring.' },
      { title: 'DevOps Fundamentals', desc: 'DevOps lifecycle, culture, agile methodologies, and automation principles.' },
      { title: 'Version Control', desc: 'Git, GitHub workflows, branching strategies, and collaboration.' },
      { title: 'CI/CD Pipeline', desc: 'Continuous integration and delivery concepts, Jenkins setup, and pipelines.' },
      { title: 'Containerization & Orchestration', desc: 'Docker fundamentals, container management, and Kubernetes basics.' },
      { title: 'Infrastructure Automation', desc: 'Infrastructure as Code (IaC) principles and tools.' },
      { title: 'Serverless Architecture', desc: 'AWS Lambda, API Gateway, and event-driven computing.' },
      { title: 'Edge Services & Security', desc: 'CloudFront, Route53, WAF, and edge network optimization.' }
    ],
    tools: ['AWS Cloud Platform', 'Jenkins', 'Docker', 'Kubernetes', 'Git & GitHub', 'Linux', 'CloudWatch', 'CI/CD Tools'],
    roles: [
      'AWS Cloud Engineer', 'DevOps Engineer', 'Cloud Infrastructure Engineer', 
      'Site Reliability Engineer (SRE)', 'Cloud Operations Engineer', 'Automation Engineer', 
      'Build & Release Engineer', 'AWS Solution Architect Associate', 'Cloud Support Engineer'
    ],
    whyChooseUs: [
      'Complete AWS cloud training',
      'Advanced industry-oriented curriculum',
      'Hands-on cloud & DevOps training',
      'Real-time cloud deployment labs',
      'Live automation projects',
      'Expert trainers',
      'CI/CD & containerization practical exposure',
      'Interview preparation support',
      'Career-oriented professional training'
    ]
  },
  'network-engineering-diploma': {
    title: 'Advanced Diploma in Enterprise Network Engineering & Security',
    overview: 'A career-oriented program designed for students, freshers, and IT professionals to build expertise in enterprise networking, network security, server administration, Linux fundamentals, SDWAN technologies, and network monitoring.',
    duration: '6 to 7 Months',
    fees: '₹49,999',
    format: 'Real-Time Labs',
    highlights: [
      'Advanced Enterprise Networking',
      'CCNA & Network Security Concepts',
      'Enterprise Routing & Switching',
      'Linux Fundamentals for Networking',
      'Server Understanding & Administration',
      'SDWAN Concepts & Architecture',
      'Network Monitoring (Zabbix & Grafana)',
      'Infrastructure Troubleshooting',
      'Real-Time Practical Labs',
      'Hands-on Enterprise Projects',
      'Industry-Oriented Training',
      '5 Interview Preparation Sessions'
    ],
    modules: [
      { title: 'Networking Fundamentals', desc: 'Core concepts of networking, topologies, and basic communication models.' },
      { title: 'IP Addressing', desc: 'IPv4 & IPv6 addressing schemes, subnetting, and VLSM.' },
      { title: 'Routing & Switching', desc: 'Advanced configuration of enterprise routers and switches, VLANs, and routing protocols.' },
      { title: 'Network Security', desc: 'Securing network infrastructure, firewall concepts, and mitigating threats.' },
      { title: 'Linux Fundamentals', desc: 'Command-line administration, file permissions, and essential Linux networking.' },
      { title: 'Server Understanding', desc: 'Setup and administration of key enterprise servers (DNS, DHCP, Web).' },
      { title: 'SDWAN Concepts', desc: 'Software-Defined Wide Area Networking architecture and modern enterprise WANs.' },
      { title: 'Network Monitoring & Management', desc: 'Proactive infrastructure monitoring setups and alerting systems.' },
      { title: 'Troubleshooting & Maintenance', desc: 'Isolating network faults, log analysis, and routine maintenance.' }
    ],
    tools: ['Cisco Packet Tracer', 'Wireshark', 'Zabbix', 'Grafana', 'Linux Admin Tools', 'Network Monitoring Tools'],
    roles: [
      'Network Engineer', 'Network Security Engineer', 'Infrastructure Engineer', 
      'NOC Engineer', 'System/Server Administrator', 'Network Monitoring Engineer', 'IT Infrastructure Specialist'
    ],
    whyChooseUs: [
      'Advanced industry-oriented curriculum',
      'Practical hands-on training',
      'Real-time enterprise labs',
      'Infrastructure monitoring projects',
      'Expert trainers with industry experience',
      'Live troubleshooting scenarios',
      'Dedicated interview preparation support',
      'Career-oriented professional training'
    ]
  },
  'enterprise-cyber-defense-architect': {
    title: 'Enterprise Cyber Defense Architect',
    overview: 'A comprehensive career-oriented cyber security and cloud defense program focused on AWS Cloud, Cloud Security, SOC Operations, Incident Response, Security Event Analysis, Server Integration, Threat Monitoring, and Enterprise Cyber Defense strategies. Includes hands-on training with AWS services, cloud security controls, security monitoring, log analysis, incident response, and enterprise security operations.',
    duration: '6 to 7 Months',
    fees: '₹49,999',
    format: 'Real-Time Labs',
    highlights: [
      'Complete AWS Cloud Training',
      'AWS Infrastructure Deployment',
      'Cloud Security & IAM',
      'SOC-101 Security Operations',
      'Security Monitoring & Incident Response',
      'Server Integration Concepts',
      'SIEM & Log Analysis Basics',
      'Linux & Server Fundamentals',
      'Security Event Monitoring',
      'Threat Detection & Investigation',
      'Real-Time Cloud & Security Labs',
      'Enterprise Cyber Defense Scenarios',
      '5 Interview Preparation Sessions'
    ],
    modules: [
      { title: 'AWS Cloud Computing', desc: 'Cloud architecture and infrastructure basics on AWS.' },
      { title: 'Cloud Security', desc: 'Securing cloud resources and environments.' },
      { title: 'SOC Fundamentals', desc: 'Introduction to Security Operations Centers.' },
      { title: 'Security Operations Fundamentals', desc: 'Day-to-day work in a SOC environment.' },
      { title: 'Phishing Analysis', desc: 'Detecting and analyzing phishing attempts.' },
      { title: 'Network Security', desc: 'Network layer protection and analysis.' },
      { title: 'Endpoint Security', desc: 'Protecting and analyzing individual devices.' },
      { title: 'SIEM (Security Information and Event Management)', desc: 'Log collection and event correlation.' },
      { title: 'Threat Intelligence', desc: 'Gathering and utilizing data on potential threats.' },
      { title: 'Digital Forensics', desc: 'Investigating and analyzing digital evidence.' },
      { title: 'Server Integration', desc: 'Integrating servers securely.' },
      { title: 'Linux Fundamentals', desc: 'Core Linux skills for security professionals.' },
      { title: 'Monitoring & Security Management', desc: 'Proactive threat hunting and management.' }
    ],
    tools: ['AWS Cloud Platform', 'SIEM Tools', 'Wireshark', 'Windows Server', 'Linux', 'Monitoring Tools', 'Security Analysis Tools'],
    roles: [
      'SOC Analyst', 'Cloud Security Engineer', 'Cyber Security Analyst', 'Security Operations Analyst',
      'Cloud Infrastructure Security Associate', 'Incident Response Analyst', 'Server Security Administrator', 'Cyber Defense Associate'
    ],
    whyChooseUs: [
      'Advanced Industry-Oriented Curriculum',
      'Complete AWS Cloud Training',
      'Hands-on Cloud & Security Training',
      'Real-Time SOC Monitoring Labs',
      'Live Cyber Defense Scenarios',
      'Cloud Infrastructure Practical Exposure',
      'Expert Cyber Security Trainers',
      'Interview Preparation Support',
      'Career-Oriented Professional Training'
    ]
  },
  'ai-powered-cyber-security': {
    title: 'Master Program in AI-Powered Cyber Security',
    overview: 'A comprehensive career-oriented cyber security training program focused on cyber defense, cloud security, offensive security, and infrastructure management. Gain hands-on experience in enterprise networking, AWS cloud deployment, cloud security controls, server management, penetration testing, security event monitoring, and threat analysis.',
    duration: '12 Months',
    fees: '₹69,999/-',
    format: 'Real-Time Labs',
    highlights: [
      'Enterprise Networking & Security',
      'Complete AWS Cloud Training',
      'Linux & Server Administration',
      'SOC Monitoring & Incident Response',
      'Ethical Hacking & VAPT',
      'Blue Team vs Red Team Operations',
      'AI-Powered Cyber Security Concepts',
      'Cloud Security & IAM',
      'Threat Detection & Investigation',
      'Real-Time Cyber Security Labs',
      'Hands-on Enterprise Projects',
      '5 Interview Preparation Sessions'
    ],
    modules: [
      { title: 'Enterprise Networking', desc: 'Core networking concepts and topologies.' },
      { title: 'Network Security', desc: 'Protecting network infrastructure.' },
      { title: 'AWS Cloud Computing', desc: 'Deploying and managing cloud resources on AWS.' },
      { title: 'Linux Fundamentals', desc: 'Linux command line and administration.' },
      { title: 'Server Administration & Integration', desc: 'Setting up and integrating server environments.' },
      { title: 'SOC Basics', desc: 'Introduction to Security Operations Center.' },
      { title: 'Lab Setup', desc: 'Setting up testing and analysis environments.' },
      { title: 'Security Operations Fundamentals', desc: 'Core operations within a SOC.' },
      { title: 'Phishing Analysis', desc: 'Analyzing and mitigating phishing attacks.' },
      { title: 'Endpoint Security', desc: 'Securing individual devices on the network.' },
      { title: 'SIEM', desc: 'Security Information and Event Management tools and processes.' },
      { title: 'Threat Intelligence', desc: 'Utilizing threat intelligence for defense.' },
      { title: 'Ethical Hacking & VAPT', desc: 'Vulnerability Assessment and Penetration Testing.' },
      { title: 'Blue Team vs Red Team Operations', desc: 'Defensive vs offensive security exercises.' },
      { title: 'AI-Powered Cyber Security', desc: 'Leveraging AI for advanced threat detection and defense.' }
    ],
    tools: ['AWS Cloud Platform', 'Cisco Networking Tools', 'Wireshark', 'Burp Suite', 'Nmap', 'Metasploit', 'OWASP ZAP', 'SIEM Tools', 'Zabbix', 'Grafana', 'Linux Security Tools'],
    roles: [
      'Cyber Security Analyst', 'SOC Analyst', 'Ethical Hacker', 'VAPT Analyst', 'Cloud Security Engineer', 
      'Network Security Engineer', 'Penetration Tester', 'Security Operations Analyst', 
      'Infrastructure Security Engineer', 'Cyber Defense Associate'
    ],
    whyChooseUs: [
      'Complete career-oriented cyber security program',
      'Advanced industry-oriented curriculum',
      'Hands-on practical training',
      'Real-time cloud & security labs',
      'Live ethical hacking & SOC scenarios',
      'Enterprise networking & security practical',
      'Expert trainers',
      'Interview preparation support',
      'Career-oriented professional training'
    ]
  },
  'nextgen-ai-soc-elite': {
    title: 'NextGen AI SOC Elite Program',
    overview: 'A comprehensive career-oriented cyber security training program focused on advanced SOC operations, cloud security expertise, security monitoring, threat detection, incident response, server administration, Linux fundamentals, and AI-powered cyber security. Students should gain hands-on experience in monitoring enterprise infrastructures, analyzing security logs, detecting threats, investigating incidents, implementing cloud security controls, managing servers, and responding to cyber threats using industry-standard tools and methodologies.',
    duration: '10 Months',
    fees: '₹69,999/-',
    format: 'Real-Time Labs',
    highlights: [
      'Advanced SOC Operations Training',
      'SOC-101 & SOC-201 Coverage',
      'AI-Powered Security Monitoring',
      'AWS Cloud Security Training',
      'Threat Detection & Incident Response',
      'SIEM & Log Analysis',
      'Blue Team Security Operations',
      'Linux & Server Administration',
      'Server Integration Concepts',
      'Real-Time SOC Monitoring Labs',
      'Threat Hunting & Security Investigation',
      'Hands-on Enterprise Security Projects',
      '5 Interview Preparation Sessions'
    ],
    modules: [
      { title: 'Network Fundamentals', desc: 'Core networking technologies and protocols.' },
      { title: 'AWS Cloud Computing', desc: 'AWS cloud infrastructure and management.' },
      { title: 'SOC-101 Fundamentals', desc: 'Foundations of Security Operations Center.' },
      { title: 'SOC-201 Advanced Security Operations', desc: 'Advanced techniques in security monitoring and analysis.' },
      { title: 'Linux Fundamentals', desc: 'Essential Linux commands and administration.' },
      { title: 'Server Administration & Integration', desc: 'Managing and integrating enterprise servers.' },
      { title: 'AI-Powered Cyber Security', desc: 'Applying artificial intelligence in cyber defense.' },
      { title: 'Threat Monitoring & Incident Response', desc: 'Detecting threats and responding to security incidents.' }
    ],
    tools: ['SIEM Tools', 'AWS Cloud Platform', 'Wireshark', 'Splunk Basics', 'ELK Stack Basics', 'Zabbix', 'Grafana', 'Windows Server', 'Linux Security Tools'],
    roles: [
      'SOC Analyst', 'Security Operations Analyst', 'Cyber Security Analyst', 'Threat Monitoring Analyst', 
      'Incident Response Analyst', 'Cloud Security Associate', 'Blue Team Security Analyst', 
      'Threat Hunting Associate', 'Security Monitoring Engineer'
    ],
    whyChooseUs: [
      'Advanced career-oriented SOC training',
      'Complete SOC-101 & SOC-201 coverage',
      'Hands-on security monitoring training',
      'Real-time SOC labs and incident simulations',
      'AWS cloud security practical exposure',
      'AI-powered cyber security concepts',
      'Expert trainers',
      'Interview preparation support',
      'Industry-oriented professional training'
    ]
  },
  'aws-solution-architect': {
    title: 'AWS Solution Architect Career Program',
    overview: 'Build a strong foundation in AWS Cloud Computing and learn how modern cloud infrastructures are designed, deployed, secured, and managed in enterprise environments. This program is designed for students, freshers, and IT professionals who want to start their journey in Cloud Computing and AWS Solutions Architecture.',
    duration: '2 to 3 Months',
    fees: '₹20,999/-',
    format: 'Remote & Hybrid',
    highlights: [
      'AWS Cloud Computing Training',
      'AWS Solution Architecture Concepts',
      'Hands-on AWS Practical Labs',
      'IAM & Cloud Security',
      'EC2 & Cloud Infrastructure Deployment',
      'VPC & Cloud Networking',
      'AWS Storage Services',
      'Database & Monitoring Services',
      'Serverless Architecture',
      'Cloud Automation & Containers',
      'Backup & Disaster Recovery',
      'Real-Time Cloud Projects'
    ],
    modules: [
      { title: 'AWS Fundamentals', desc: 'Core cloud concepts and global infrastructure.' },
      { title: 'Account Security & IAM', desc: 'Managing users, roles, and security policies.' },
      { title: 'AWS Networking', desc: 'Amazon VPC, subnets, routing, and connections.' },
      { title: 'Compute Services', desc: 'EC2 instance types, Auto Scaling, and load balancers.' },
      { title: 'Storage Services', desc: 'S3 storage classes, EBS volumes, and EFS.' },
      { title: 'Database Services', desc: 'Relational (RDS) and NoSQL (DynamoDB) databases.' },
      { title: 'Monitoring & Scaling', desc: 'CloudWatch metrics, alarms, and scaling rules.' },
      { title: 'Automation & Containers', desc: 'CloudFormation, ECS, and container management.' },
      { title: 'Serverless Architecture', desc: 'AWS Lambda and API Gateway deployment.' },
      { title: 'Edge Services & Security', desc: 'CloudFront, WAF, and edge optimizations.' },
      { title: 'Backup & Recovery', desc: 'AWS Backup and Disaster Recovery Planning.' }
    ],
    tools: ['Amazon VPC', 'EC2', 'S3', 'IAM', 'RDS', 'DynamoDB', 'CloudWatch', 'CloudTrail', 'CloudFormation'],
    roles: [
      'AWS Cloud Engineer', 'Cloud Support Engineer', 'AWS Solution Architect Associate', 
      'Cloud Administrator', 'Cloud Infrastructure Engineer', 'DevOps Cloud Associate', 
      'Cloud Operations Engineer'
    ],
    whyChooseUs: [
      'Industry-Oriented Cloud Curriculum',
      'Practical AWS Hands-on Labs',
      'Real-Time Cloud Deployment',
      'Live Infrastructure Projects',
      'Expert Cloud Trainers',
      'Interview Preparation Support',
      'Career-Oriented Training',
      'Real-World Cloud Scenarios'
    ]
  },
  'diploma-enterprise-network-security': {
    title: 'Diploma in Enterprise Network Engineering & Security',
    overview: 'Build a strong foundation in enterprise networking, routing, switching, and network security through industry-oriented practical training. This program is designed for students, freshers, and IT beginners who want to start a career in Networking, Infrastructure Management, and Cyber Security. The course covers Cisco networking technologies, routing & switching, IP addressing, subnetting, VLANs, routing protocols, network security concepts, firewall technologies, ACLs, switch security, and enterprise security policies. Students will gain hands-on experience through practical labs and real-world troubleshooting scenarios.',
    duration: '4 Months',
    fees: '₹25,999/-',
    format: 'Real-Time Labs',
    highlights: [
      'CCNA 200-301 Training',
      'Enterprise Networking Concepts',
      'Routing & Switching Practical',
      'VLAN & Inter-VLAN Routing',
      'OSPF & Dynamic Routing Protocols',
      'Network Security Fundamentals',
      'Firewall & ACL Configuration',
      'IPv4 & IPv6 Networking',
      'Cisco Device Security',
      'Troubleshooting & Monitoring',
      'Network Automation Basics',
      'Hands-on Practical Labs'
    ],
    modules: [
      { title: 'Networking Fundamentals', desc: 'OSI Model & TCP/IP Model, Cisco IOS.' },
      { title: 'IP Addressing', desc: 'IPv4 & IPv6 Addressing, Subnetting, Static & DHCP Configuration.' },
      { title: 'Routing & Switching', desc: 'OSPF & Dynamic Routing Protocols, VLANs & Inter-VLAN Routing, STP & EtherChannel.' },
      { title: 'Network Security', desc: 'ACLs, NAT-PAT, DHCP Snooping, Port Security, Firewall Concepts, SD-WAN, SD-Access & DNA Center.' },
      { title: 'Troubleshooting & Monitoring', desc: 'QoS, Cisco Troubleshooting Methodologies.' }
    ],
    tools: ['Cisco Routers & Switches', 'Packet Tracer', 'GNS3', 'Wireshark', 'Putty', 'Cisco DNA Center'],
    roles: [
      'Network Engineer', 'NOC Engineer', 'Network Security Associate', 
      'Infrastructure Engineer', 'IT Support Engineer', 'System Support Engineer', 
      'Network Administrator'
    ],
    whyChooseUs: [
      'Industry-Oriented Curriculum',
      'Practical Hands-on Training',
      'Live Networking Labs',
      'Expert Trainers',
      'Interview Preparation',
      'Career Guidance',
      'Real-World Scenarios & Assignments'
    ]
  },
  'elite-offensive-security': {
    title: 'Elite Offensive Security & Ethical Hacking Program',
    overview: 'Build a strong foundation in Ethical Hacking, Vulnerability Assessment, and Penetration Testing (VAPT) with industry-oriented practical training. This program is designed for students, freshers, and cybersecurity enthusiasts who want to build a successful career in Offensive Security and Ethical Hacking. The course covers ethical hacking methodologies, vulnerability assessment, penetration testing, web security testing, network exploitation techniques, Linux administration, and Python automation. Students will gain hands-on experience in identifying vulnerabilities, conducting security assessments, analyzing source code, and performing penetration testing on real-world environments using industry-standard tools and techniques.',
    duration: 'Up to 7 Months',
    fees: '₹49,999/-',
    format: 'Real-Time Labs',
    highlights: [
      'Ethical Hacking Fundamentals',
      'Web Application Penetration Testing (WAPT)',
      'Network Penetration Testing (NAPT)',
      'Vulnerability Assessment & Penetration Testing (VAPT)',
      'Linux Fundamentals for Security',
      'Python Scripting for Automation',
      'Source Code Review Techniques',
      'Real-Time Hacking Labs',
      'Security Testing Methodologies',
      'Industry-Oriented Practical Training',
      'Hands-on Cybersecurity Projects',
      'Real-World Attack Simulations'
    ],
    modules: [
      { title: 'Ethical Hacking Fundamentals', desc: 'Footprinting, Information Gathering, Network Scanning & Enumeration.' },
      { title: 'Web Application Penetration Testing (WAPT)', desc: 'OWASP Top 10, SQL Injection, Cross-Site Scripting (XSS), Authentication & Session Attacks.' },
      { title: 'Network Penetration Testing (NAPT)', desc: 'Exploitation Techniques, Security Risk Analysis.' },
      { title: 'Vulnerability Assessment & Penetration Testing (VAPT)', desc: 'Vulnerability Analysis, Assessment strategies.' },
      { title: 'Linux Fundamentals', desc: 'Linux Security Administration, fundamental to advanced concepts.' },
      { title: 'Python Scripting', desc: 'Python Security Automation and creating security tools.' },
      { title: 'Source Code Review', desc: 'Secure Coding Principles and Application Security Basics.' }
    ],
    tools: ['Burp Suite', 'Nmap', 'Wireshark', 'Metasploit', 'Nikto', 'OWASP ZAP', 'Hydra', 'SQLMap', 'Linux Security Tools'],
    roles: [
      'Ethical Hacker', 'Penetration Tester', 'VAPT Analyst', 
      'Cyber Security Analyst', 'Security Consultant', 'Application Security Analyst', 
      'Network Security Engineer', 'Bug Bounty Researcher'
    ],
    whyChooseUs: [
      'Industry-Oriented Cyber Security Curriculum',
      'Real-Time Practical Labs',
      'Hands-on Ethical Hacking Training',
      'Live Attack Simulations',
      'Expert Cyber Security Trainers',
      'Real-World Security Scenarios',
      'Interview Preparation Support',
      'Career-Oriented Cyber Security Training'
    ]
  },
  'ms-office-365': {
    title: 'Master in Microsoft Office 365 Suite',
    overview: 'Build strong practical skills in Microsoft Office 365 administration and cloud productivity solutions with industry-oriented training. This program is designed for students, freshers, IT support professionals, and system administrators who want to build a career in Microsoft 365 Administration. The course focuses on Microsoft 365 administration, user management, cloud services, collaboration tools, and enterprise productivity solutions.',
    duration: '1 Month',
    fees: '₹14,999/-',
    format: 'Real-Time Labs',
    highlights: [
      'Microsoft 365 Administration',
      'Microsoft 365 Admin Center',
      'User & License Management',
      'Exchange Online Administration',
      'Microsoft Teams Administration',
      'Cloud-Based Productivity Solutions',
      'Security & Compliance Basics',
      'Hands-on Practical Labs',
      'Enterprise User Management',
      'Real-Time Administration Scenarios'
    ],
    modules: [
      { title: 'Microsoft 365 Fundamentals', desc: 'Introduction to Microsoft 365, Cloud Productivity Concepts, Microsoft 365 Services Overview, Microsoft 365 Subscription Plans.' },
      { title: 'Microsoft 365 Admin Center', desc: 'Admin Center Overview, User Management, Group Management, License Assignment, Role-Based Access, User & Password Recovery.' },
      { title: 'Exchange Online', desc: 'Mailbox Management, Email Administration, Mail Flow Basics, Exchange Security Features.' },
      { title: 'Microsoft Teams Administration', desc: 'Teams Setup & Configuration, Teams Policies, User Collaboration Management, Communication Features.' },
      { title: 'Security & Compliance', desc: 'Security Policies, Multi-Factor Authentication (MFA), Compliance Basics.' }
    ],
    tools: ['Microsoft 365 Admin Center', 'Exchange Online', 'Microsoft Teams', 'Outlook', 'SharePoint', 'OneDrive', 'Azure AD Basics'],
    roles: [
      'Microsoft 365 Administrator', 'IT Support Engineer', 'Office 365 Support Associate', 
      'System Administrator', 'Cloud Support Engineer', 'Technical Support Engineer'
    ],
    whyChooseUs: [
      'Industry-Oriented Microsoft 365 Curriculum',
      'Hands-on Practical Training',
      'Real-Time Administration Labs',
      'Expert Trainers',
      'Career-Oriented Learning',
      'Interview Preparation Support',
      'Enterprise Administration Exposure'
    ]
  },
  'professional-devops-engineering': {
    title: 'Professional DevOps Engineering Program',
    overview: 'Build a strong foundation in DevOps Engineering, automation, and cloud infrastructure management with industry-oriented practical training. This program is designed for students, freshers, and IT professionals who want to build a successful career in DevOps and Cloud Operations. The course focuses on developing practical DevOps skills required in modern IT infrastructures and cloud environments. Students will gain hands-on experience in Linux administration, automation, CI/CD pipelines, containerization, cloud deployment, infrastructure management, monitoring solutions, and continuous integration and delivery using industry-standard DevOps practices.',
    duration: '3 to 4 Months',
    fees: '₹25,999/-',
    format: 'Real-Time Labs',
    highlights: [
      'DevOps Fundamentals',
      'Linux Administration',
      'Git & Version Control',
      'CI/CD Pipeline Implementation',
      'Docker & Containerization',
      'Kubernetes Basics',
      'Jenkins Automation',
      'Infrastructure as Code (IaC)',
      'Cloud Deployment Concepts',
      'Monitoring & Logging',
      'Hands-on Practical Labs',
      'Real-Time DevOps Projects'
    ],
    modules: [
      { title: 'DevOps Fundamentals', desc: 'Introduction to DevOps, DevOps Lifecycle, Agile & SDLC Basics, Continuous Integration & Continuous Delivery.' },
      { title: 'Linux Administration', desc: 'Linux Fundamentals, Commands, User & Permission Management, Process & Service Management, Networking in Linux.' },
      { title: 'Version Control', desc: 'Git Fundamentals, GitHub & Repository Management, Branching & Merging, Version Control Best Practices.' },
      { title: 'CI/CD Pipeline', desc: 'Jenkins Installation & Configuration, Pipeline Automation, Build & Deployment Automation, CI/CD Workflow Management.' },
      { title: 'Containerization', desc: 'Docker Fundamentals, Docker Images & Containers, Docker Networking, Container Deployment.' },
      { title: 'Kubernetes', desc: 'Kubernetes Basics, Services & Scaling, Container Orchestration.' },
      { title: 'Infrastructure Automation', desc: 'Infrastructure as Code (IaC), Automation Concepts, Configuration Management, Deployment Strategies.' },
      { title: 'Monitoring & Logging', desc: 'Monitoring Concepts, System Monitoring, Application Logging, Performance Monitoring.' },
      { title: 'Cloud & Deployment', desc: 'Cloud Deployment Basics, AWS Cloud Fundamentals, Deployment Strategies, Production Environment Concepts.' }
    ],
    tools: ['Git', 'GitHub', 'Jenkins', 'Docker', 'Kubernetes', 'Linux', 'AWS', 'CI/CD Tools', 'Monitoring Tools'],
    roles: [
      'DevOps Engineer', 'Cloud DevOps Associate', 'Build & Release Engineer', 
      'Site Reliability Engineer (SRE)', 'Infrastructure Automation Engineer', 
      'Cloud Operations Engineer', 'System Administrator'
    ],
    whyChooseUs: [
      'Industry-Oriented DevOps Curriculum',
      'Hands-on Practical Training',
      'Live DevOps Projects',
      'Real-Time Automation Labs',
      'Expert Trainers',
      'Interview Preparation Support',
      'Career-Oriented Learning',
      'Real-World Infrastructure Scenarios'
    ]
  },
  'professional-server-management': {
    title: 'Professional Server Management Program',
    overview: 'Build a strong foundation in server administration, infrastructure management, and enterprise server technologies with industry-oriented practical training. This program is designed for students, freshers, and IT professionals who want to build a career in Server Administration and Infrastructure Management. The course focuses on practical server management skills required in modern enterprise environments, covering Windows Server Administration, Linux Server Administration, Active Directory, DNS, DHCP, virtualization technologies, server security, server integration, and monitoring solutions. Students will gain hands-on experience in configuring enterprise servers, managing users and permissions, implementing network services, securing server environments, managing virtualization platforms, and monitoring server infrastructures.',
    duration: 'Up to 3 Months',
    fees: '₹24,999/-',
    format: 'Real-Time Labs',
    highlights: [
      'Windows & Linux Server Administration',
      'Active Directory Management',
      'DNS & DHCP Server Configuration',
      'Server Virtualization',
      'Server Security Concepts',
      'Server Integration Techniques',
      'Server Monitoring & Maintenance',
      'Hands-on Practical Labs',
      'Enterprise Infrastructure Management',
      'Real-Time Server Administration Scenarios'
    ],
    modules: [
      { title: 'Server Fundamentals', desc: 'Introduction to Server Infrastructure, Server Roles & Responsibilities, Enterprise Server Concepts, Infrastructure Management Basics.' },
      { title: 'Windows Server Administration', desc: 'Windows Server Installation & Configuration, User & Group Management, File & Permission Management, Windows Server Security.' },
      { title: 'Linux Server Administration', desc: 'Linux Fundamentals, Linux User Management, Linux Networking, Linux Security Administration.' },
      { title: 'Active Directory (AD)', desc: 'Active Directory Fundamentals, Domain Controller Configuration, User & Group Policies, Group Policy Management.' },
      { title: 'DNS & DHCP Services', desc: 'DNS Server Configuration, DNS Record Management, DHCP Configuration, IP Address Management.' },
      { title: 'Virtualization', desc: 'Virtualization Fundamentals, Virtual Machine Management, Resource Allocation, Infrastructure Virtualization Concepts.' },
      { title: 'Server Security', desc: 'Server Hardening, Security Policies, Access Control Management, Backup & Recovery Basics.' },
      { title: 'Server Integration & Monitoring', desc: 'Server Integration Concepts, Infrastructure Monitoring, Server Performance Monitoring, Troubleshooting & Maintenance.' }
    ],
    tools: ['Windows Server', 'Linux Server', 'Active Directory', 'DNS Server', 'DHCP Server', 'Virtualization Platforms', 'Server Monitoring Tools'],
    roles: [
      'System Administrator', 'Windows Server Administrator', 'Linux Administrator', 
      'Infrastructure Support Engineer', 'Server Support Engineer', 
      'IT Administrator', 'Technical Support Engineer'
    ],
    whyChooseUs: [
      'Industry-Oriented Server Administration Curriculum',
      'Hands-on Practical Training',
      'Real-Time Infrastructure Labs',
      'Expert Trainers',
      'Career-Oriented Learning',
      'Interview Preparation Support',
      'Enterprise Administration Exposure'
    ]
  },
  'soc-monitoring-incident-response': {
    title: 'SOC Monitoring & Incident Response Specialist',
    overview: 'Build a strong foundation in Security Operations Center (SOC) operations, cyber threat monitoring, and incident response with industry-oriented practical training. This program is designed for students, freshers, and cybersecurity enthusiasts who want to build a successful career in Blue Team Security and Cyber Defense Operations. The course focuses on practical SOC and cyber defense skills required in modern enterprise security environments, covering security monitoring, SIEM technologies, incident response, log analysis, threat detection, vulnerability management, and cyber security operations. Students will gain hands-on experience in monitoring security events, analyzing logs, detecting cyber threats, investigating incidents, and responding to security alerts using industry-standard SOC methodologies and tools.',
    duration: '4 Months',
    fees: '₹35,999/-',
    format: 'Real-Time Labs',
    highlights: [
      'SOC Fundamentals',
      'Security Monitoring Techniques',
      'SIEM Concepts & Log Analysis',
      'Incident Response Methodologies',
      'Threat Detection & Investigation',
      'Blue Team Security Operations',
      'Cyber Threat Intelligence Basics',
      'Vulnerability Management',
      'Real-Time SOC Monitoring Labs',
      'Security Event Analysis',
      'Hands-on Cybersecurity Training',
      'Industry-Oriented Practical Sessions'
    ],
    modules: [
      { title: 'Introduction', desc: 'Introduction to SOC, Security Operations Center Workflow, Cyber Security Basics, Threat Landscape, Blue Team Fundamentals.' },
      { title: 'Lab Setup', desc: 'Oracle VM VirtualBox Installation, Windows & Ubuntu Setup, Lab Network Configuration.' },
      { title: 'Security Operations Fundamentals', desc: 'SOC Roles & Responsibilities, Incident & Event Management, SOC Metrics & Tools, Common Threats and Attacks.' },
      { title: 'Phishing Analysis', desc: 'Email Security Fundamentals, Email Header Analysis, URL & Attachment Analysis, Sandboxing Techniques, Phishing Defense Strategies.' },
      { title: 'Network Security', desc: 'Packet Capture & Flow Analysis, Wireshark Traffic Analysis, IDS/IPS Fundamentals, Snort Configuration & Rules.' },
      { title: 'Endpoint Security', desc: 'Windows & Linux Security Analysis, Sysmon, Windows Event Logs, LimaCharlie Endpoint Monitoring.' },
      { title: 'Security Information & Event Management (SIEM)', desc: 'SIEM Architecture, Log Collection & Analysis, Attack Signature Analysis, Splunk Fundamentals, SPL, Dashboards, Reports & Alerts.' },
      { title: 'Threat Intelligence', desc: 'Threat Intelligence Fundamentals, YARA Rules, Threat Intelligence Feeds, MISP Event Management.' }
    ],
    tools: ['SIEM Platforms', 'Wireshark', 'Splunk', 'ELK Stack', 'Snort', 'FTK Imager', 'YARA', 'Windows Event Viewer', 'Linux Security Tools', 'LimaCharlie', 'Oracle VM VirtualBox'],
    roles: [
      'SOC Analyst', 'Cyber Security Analyst', 'Security Monitoring Analyst', 
      'Incident Response Analyst', 'Blue Team Security Analyst', 
      'Threat Monitoring Analyst', 'Cyber Defense Associate'
    ],
    whyChooseUs: [
      'Industry-Oriented SOC Curriculum',
      'Real-Time Security Monitoring Labs',
      'Hands-on Practical Training',
      'Live Incident Response Scenarios',
      'Expert Cyber Security Trainers',
      'Practical SOC Environment Exposure',
      'Interview Preparation Support',
      'Career-Oriented Cyber Security Training'
    ]
  }
};

const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? COURSES_DATA[slug] : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [course1Key, setCourse1Key] = useState<string>(slug || '');
  const [course2Key, setCourse2Key] = useState<string>('');

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  
  const generateSchema = () => {
    if (!course) return null;
    
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": course.title,
      "description": course.overview,
      "provider": {
        "@type": "Organization",
        "name": "TechDefends",
        "sameAs": "https://techdefends.com"
      }
    };
    
    // Some courses might not have FAQS, so we safely handle it
    const schemas = [courseSchema];
    
    if (FAQS && FAQS.length > 0) {
        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };
        schemas.push(faqSchema);
    }
    
    return JSON.stringify(schemas);

  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, course: course?.title })
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        trackEvent('generate_lead', {
          lead_type: 'training_enquiry',
          course_id: course?.title
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
        // Optionally close modal after delay
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus(null);
        }, 3000);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Network error or invalid response' }));
        setSubmitStatus('error');
        setErrorMessage(errorData.details || errorData.error || 'Something went wrong. Please try again later.');
      }
    } catch (err: any) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadSyllabus = () => {
    if (!course) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(course.title, 20, 20);
    doc.setFontSize(14);
    doc.text("Course Syllabus", 20, 30);
    
    let y = 45;
    course.modules.forEach((mod: any, idx: number) => {
      doc.setFontSize(12);
      doc.text(`${idx + 1}. ${mod.title}`, 20, y);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(mod.desc || '', 170);
      doc.text(lines, 25, y + 6);
      y += 10 + (lines.length * 5);
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`${slug}-syllabus.pdf`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Course not found</h2>
          <Link to="/trainings?tab=courses" className="text-brand-600 hover:text-brand-700 underline">
            Return to Trainings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16">

      <Helmet>
        <title>{course?.title || 'Training Program'} | TechDefends</title>
        <meta name="description" content={course?.overview?.substring(0, 160) || ''} />
        <link rel="canonical" href={`https://techdefends.com/courses/${slug}`} />
        <meta property="og:title" content={`${course?.title} `} />
        <meta property="og:description" content={course?.overview?.substring(0, 160) || ''} />
        <meta property="og:type" content="website" />
        {generateSchema() && <script type="application/ld+json">{generateSchema()}</script>}
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fade-in-up">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {course.title}
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            {course.overview}
          </p>
        </div>

        {/* Course Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="text-brand-500 mb-3 flex justify-center"><Clock size={28} /></div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Duration</h4>
            <p className="text-lg font-bold text-slate-900">{course.duration}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="text-brand-500 mb-3 flex justify-center"><IndianRupee size={28} /></div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Course Fees</h4>
            <p className="text-lg font-bold text-slate-900">{course.fees}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="text-brand-500 mb-3 flex justify-center"><Terminal size={28} /></div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Format</h4>
            <p className="text-lg font-bold text-slate-900">{course.format}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="text-brand-500 mb-3 flex justify-center"><Briefcase size={28} /></div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Modules</h4>
            <p className="text-lg font-bold text-slate-900">{(course.modules || []).length}</p>
          </div>
        </div>

        {/* Placement Guarantee Section */}
        {['devops-master-program', 'network-engineering-diploma', 'enterprise-cyber-defense-architect', 'ai-powered-cyber-security', 'nextgen-ai-soc-elite'].includes(slug || '') && (
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-200 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-60"></div>
            <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full border border-emerald-200 mb-6 uppercase tracking-wider shadow-sm">
                   🎯 100% Placement Guarantee
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Train. Certify. Get Placed.</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                   We provide complete career support, including resume building, mock interviews, interview preparation, career mentoring, and 100% Placement Guarantee to help students secure job opportunities after completing their Career Course.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                      <div className="text-3xl font-black text-brand-600 mb-1">500+</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hiring Partners</div>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                      <div className="text-3xl font-black text-brand-600 mb-1">98%</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Placement Rate</div>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                      <div className="text-3xl font-black text-brand-600 mb-1">12LPA</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Highest Package</div>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                      <div className="text-3xl font-black text-brand-600 mb-1">100%</div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Interview Prep</div>
                   </div>
                </div>
                
                <button onClick={() => { trackEvent('course_demo_cta', { course_id: course.id }); setIsModalOpen(true); }} className="inline-flex items-center justify-center gap-2 py-4 px-8 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1">
                   Book Free Counseling Session
                   <ArrowRight size={18} />
                </button>
              </div>
              
              <div className="shrink-0 hidden lg:block">
                 <div className="w-64 h-64 rounded-full flex items-center justify-center relative shadow-inner bg-slate-50 border border-slate-100 overflow-visible group">
                    <Target size={120} strokeWidth={1} className="text-brand-500 relative z-10" />
                    <div className="absolute top-4 right-4 bg-white p-3 rounded-2xl shadow-xl shadow-emerald-900/5 text-emerald-600 animate-bounce">
                       <ShieldCheck size={32} />
                    </div>
                    <div className="absolute bottom-8 left-0 -ml-6 bg-white p-3 rounded-2xl shadow-xl shadow-brand-900/5 text-brand-600">
                       <Briefcase size={32} />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Highlights */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Course Highlights</h3>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {(course.highlights || []).map((highlight: string, idx: number) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle size={20} className="text-brand-500 shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Detailed Modules & Topics</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {(course.modules || []).map((mod: any, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-200 transition-colors">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 font-bold mb-4">
                  {idx + 1}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{mod.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Outcomes */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Terminal size={120} /></div>
            <h3 className="text-2xl font-bold mb-6 relative z-10">Tools Covered</h3>
            <div className="flex flex-wrap gap-3 relative z-10">
              {(course.tools || []).map((tool: string, idx: number) => (
                <span key={idx} className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-medium border border-white/10 backdrop-blur-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-brand-600 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><Target size={120} /></div>
            <h3 className="text-2xl font-bold mb-6 relative z-10">Career Opportunities</h3>
            <ul className="space-y-3 relative z-10">
              {(course.roles || []).map((role: string, idx: number) => (
                <li key={idx} className="flex items-center gap-3">
                  <ArrowRight size={18} className="text-brand-200" />
                  <span className="font-medium text-white/90">{role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        {course.whyChooseUs && (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
              <div className="p-3 bg-brand-50 text-brand-600 rounded-xl">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">Why Choose Us?</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {(course.whyChooseUs || []).map((reason: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all">
                  <div className="mt-1">
                    <ShieldCheck className="text-brand-500" size={24} />
                  </div>
                  <p className="text-slate-800 font-medium leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Student Testimonials</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">Hear from our alumni who have successfully upgraded their careers with this program.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative">
                <Quote size={40} className="text-brand-100 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6 relative z-10">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">Common queries about prerequisites, schedules, and certification processes.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden hover:border-brand-200 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`shrink-0 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-brand-500' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 bg-white">
                    <p className="text-slate-600 leading-relaxed pt-3 border-t border-slate-100">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 pb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
           <button onClick={() => { trackEvent('course_demo_cta', { course_id: course?.title }); setIsModalOpen(true); }} className="inline-flex items-center justify-center gap-2 py-4 px-8 bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold rounded-2xl transition-all shadow-sm shadow-brand-900/20 hover:-translate-y-1 w-full sm:w-auto">
              Apply for Program Now
              <ArrowRight size={20} />
           </button>
           <button onClick={handleDownloadSyllabus} className="inline-flex items-center justify-center gap-2 py-4 px-8 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold rounded-2xl transition-all shadow-sm shadow-slate-900/20 hover:-translate-y-1 w-full sm:w-auto">
              Download Syllabus
              <Download size={20} />
           </button>
        </div>

      </div>

      {/* Compare Floating Button */}
      <button
        onClick={() => setIsCompareOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-transform hover:scale-105 group"
      >
        <GitCompare size={24} />
        <span className="font-semibold px-2 hidden sm:block">Compare Courses</span>
      </button>

      {/* Compare Modal */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative my-8">
            <button onClick={() => setIsCompareOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10">
              <X size={20} />
            </button>
            <div className="p-8 pb-4 border-b border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <GitCompare className="text-indigo-600" />
                Course Comparison
              </h3>
              <p className="text-slate-500 mt-2">Select two courses to compare their features, fees, and outcomes side-by-side.</p>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Selector 1 */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select First Course</label>
                  <select 
                    title="Select First Course"
                    value={course1Key} 
                    onChange={(e) => setCourse1Key(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                  >
                    <option value="">-- Choose a course --</option>
                    {Object.keys(COURSES_DATA).map(key => (
                      <option key={key} value={key} disabled={key === course2Key}>{COURSES_DATA[key].title}</option>
                    ))}
                  </select>
                </div>
                {/* Selector 2 */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Second Course</label>
                  <select 
                    title="Select Second Course"
                    value={course2Key} 
                    onChange={(e) => setCourse2Key(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
                  >
                    <option value="">-- Choose a course --</option>
                    {Object.keys(COURSES_DATA).map(key => (
                      <option key={key} value={key} disabled={key === course1Key}>{COURSES_DATA[key].title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {course1Key && course2Key ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {[course1Key, course2Key].map((key, idx) => {
                    const c = COURSES_DATA[key];
                    return (
                      <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col h-full relative">
                        {idx === 0 ? <div className="absolute top-1/2 -right-8 p-3 bg-white rounded-full shadow-md z-10 hidden md:block text-slate-400 font-bold border border-slate-100">VS</div> : null}
                        <h4 className="text-xl font-bold text-slate-900 mb-4 h-14">{c.title}</h4>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100">
                              <Clock size={18} className="text-brand-500" />
                              <span className="font-semibold text-slate-700">{c.duration}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100">
                              <IndianRupee size={18} className="text-brand-500" />
                              <span className="font-semibold text-slate-700">{c.fees}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-100">
                              <Target size={18} className="text-brand-500" />
                              <span className="font-semibold text-slate-700">{c.format}</span>
                            </div>
                        </div>
                        <div className="mb-6 flex-1">
                          <h5 className="font-bold text-slate-900 mb-3 border-b border-slate-200 pb-2">Key Outcomes</h5>
                          <ul className="space-y-2">
                             {(c?.roles || []).slice(0, 4).map((role: string, i: number) => (
                               <li key={i} className="flex gap-2 items-start text-sm text-slate-600">
                                 <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                 <span>{role}</span>
                               </li>
                             ))}
                             {(c?.roles || []).length > 4 && (
                               <li className="text-xs text-slate-400 italic">+{(c?.roles || []).length - 4} more roles</li>
                             )}
                          </ul>
                        </div>
                        <Link to={`/courses/${key}`} onClick={() => setIsCompareOpen(false)} className="w-full inline-flex justify-center items-center gap-2 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors">
                           View Full Details <ArrowRight size={16} />
                        </Link>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                  <GitCompare size={48} className="text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">Please select two courses to compare them side-by-side.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Quick Inquiry Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-transform hover:scale-105 group"
      >
        <MessageSquare size={24} />
        <span className="font-semibold pr-2 hidden md:block">Quick Inquiry</span>
      </button>

      {/* Enrollment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
              <X size={20} />
            </button>
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Book Free Counseling Session</h3>
                <p className="text-slate-600">Provide your contact details and our team will get back to you regarding <strong>{course.title}</strong>.</p>
              </div>
              <form className="space-y-4" onSubmit={handleInquirySubmit}>
                {submitStatus === 'success' && (
                  <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 mb-4 flex items-start gap-3">
                    <CheckCircle className="shrink-0 mt-0.5 text-emerald-600" size={20} />
                    <p className="font-medium text-sm">Thank you! Your inquiry has been submitted successfully. Our technical team will contact you shortly.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-rose-50 text-rose-800 p-4 rounded-xl border border-rose-200 mb-4 flex items-start gap-3">
                    <AlertCircle className="shrink-0 mt-0.5 text-rose-600" size={20} />
                    <p className="font-medium text-sm">{errorMessage}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-all outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-all outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-all outline-none" placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Message (Optional)</label>
                  <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-all outline-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-brand-900/20 mt-4 disabled:opacity-70 flex justify-center items-center gap-2">
                  {isSubmitting && <Loader2 size={20} className="animate-spin" />}
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
