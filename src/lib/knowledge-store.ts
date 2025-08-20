// N-Total Cybersecurity Knowledge Store
// This file contains all the extracted content from the website for RAG pipeline

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  metadata: {
    type: 'service' | 'solution' | 'case-study' | 'company' | 'resource' | 'testimonial';
    industry?: string;
    compliance?: string[];
    technologies?: string[];
    results?: string[];
  };
}

export const knowledgeStore: KnowledgeItem[] = [
  // Services Category
  {
    id: 'ai-grc-service',
    title: 'AI-Enabled Governance, Risk & Compliance',
    content: `N-Total Cybersecurity delivers advanced AI-enabled GRC solutions that transform compliance operations with intelligent automation and predictive analytics. Our platform provides automated compliance monitoring across 50+ frameworks, AI-powered risk prediction with 95% accuracy, real-time threat intelligence integration, and automated reporting and dashboard generation. Key capabilities include machine learning risk models, predictive analytics, continuous monitoring, and automated compliance management.`,
    category: 'Services',
    tags: ['AI', 'GRC', 'Compliance', 'Risk Management', 'Automation', 'Machine Learning'],
    metadata: {
      type: 'service',
      technologies: ['AI/ML', 'Machine Learning', 'Predictive Analytics', 'Automation'],
      compliance: ['ISO 27001', 'SOC 2', 'NIST', 'HIPAA', 'PCI DSS']
    }
  },
  {
    id: 'training-service',
    title: 'Comprehensive Cybersecurity Training',
    content: `Our comprehensive cybersecurity training programs build a security-first culture with industry-leading education and certifications. We offer customized training for all skill levels, hands-on labs and real-world scenarios, industry-recognized certifications, and continuous learning and updates. Training programs include security awareness training, technical skills development, certification preparation, and executive security training.`,
    category: 'Services',
    tags: ['Training', 'Education', 'Certification', 'Security Awareness', 'Skills Development'],
    metadata: {
      type: 'service',
      technologies: ['Hands-on Labs', 'Real-world Scenarios', 'Certification Programs']
    }
  },
  {
    id: 'advisory-service',
    title: 'Strategic Cybersecurity Advisory',
    content: `Our strategic advisory services align your security strategy with business objectives through expert consulting and strategic planning. We provide security program development and optimization, risk management strategy development, technology roadmap and architecture planning, and executive-level security consulting. Advisory services include security strategy development, risk assessment & management, program optimization, and executive coaching.`,
    category: 'Services',
    tags: ['Advisory', 'Strategy', 'Consulting', 'Risk Management', 'Program Development'],
    metadata: {
      type: 'service',
      technologies: ['Strategic Planning', 'Risk Assessment', 'Program Optimization']
    }
  },
  {
    id: 'ot-security-service',
    title: 'Operational Technology Security',
    content: `Our specialized OT cybersecurity solutions protect critical infrastructure with security designed for industrial environments. We provide industrial control systems (ICS) security, network segmentation and isolation, asset discovery and continuous monitoring, and incident response planning and execution. OT security features include ICS security hardening, network segmentation, asset management, and threat detection.`,
    category: 'Services',
    tags: ['OT Security', 'ICS', 'Industrial Security', 'Network Segmentation', 'Asset Management'],
    metadata: {
      type: 'service',
      technologies: ['ICS Security', 'Network Segmentation', 'Asset Discovery', 'Threat Detection'],
      compliance: ['NIST Cybersecurity Framework', 'ISA/IEC 62443']
    }
  },

  // Solutions Category
  {
    id: 'healthcare-solution',
    title: 'Healthcare Cybersecurity Solutions',
    content: `Our specialized healthcare cybersecurity solutions protect patient data and ensure HIPAA compliance. We provide HIPAA compliance and audit support, medical device security, patient data protection, and incident response for healthcare. Healthcare features include HIPAA compliance, medical device security, PHI protection, and healthcare incident response.`,
    category: 'Solutions',
    tags: ['Healthcare', 'HIPAA', 'Medical Devices', 'Patient Data', 'PHI Protection'],
    metadata: {
      type: 'solution',
      industry: 'Healthcare',
      compliance: ['HIPAA', 'HITECH', 'FDA Guidelines'],
      technologies: ['Medical Device Security', 'PHI Protection', 'Incident Response']
    }
  },
  {
    id: 'finance-solution',
    title: 'Financial Services Security Solutions',
    content: `Our comprehensive banking and fintech security solutions secure financial transactions and protect customer assets. We provide PCI DSS compliance and validation, fraud detection and prevention, transaction security, and regulatory compliance (SOX, GLBA). Financial features include PCI DSS compliance, fraud detection, transaction security, and regulatory compliance.`,
    category: 'Solutions',
    tags: ['Finance', 'Banking', 'PCI DSS', 'Fraud Detection', 'Transaction Security'],
    metadata: {
      type: 'solution',
      industry: 'Financial Services',
      compliance: ['PCI DSS', 'SOX', 'GLBA', 'FFIEC Guidelines'],
      technologies: ['Fraud Detection', 'Transaction Security', 'Compliance Monitoring']
    }
  },
  {
    id: 'manufacturing-solution',
    title: 'Manufacturing & Industrial Security Solutions',
    content: `Our specialized manufacturing cybersecurity solutions protect production systems and intellectual property. We provide industrial control systems (ICS) security, supply chain security, intellectual property protection, and operational technology security. Manufacturing features include ICS security, supply chain security, IP protection, and OT security.`,
    category: 'Solutions',
    tags: ['Manufacturing', 'Industrial', 'ICS', 'Supply Chain', 'IP Protection'],
    metadata: {
      type: 'solution',
      industry: 'Manufacturing',
      compliance: ['NIST Cybersecurity Framework', 'ISA/IEC 62443'],
      technologies: ['ICS Security', 'Supply Chain Security', 'IP Protection']
    }
  },
  {
    id: 'government-solution',
    title: 'Government & Defense Security Solutions',
    content: `Our specialized government cybersecurity solutions secure critical government systems and protect national security. We provide FedRAMP compliance and certification, classified information protection, critical infrastructure security, and defense contractor security. Government features include FedRAMP compliance, classified data protection, critical infrastructure, and defense contractors.`,
    category: 'Solutions',
    tags: ['Government', 'Defense', 'FedRAMP', 'Classified Data', 'Critical Infrastructure'],
    metadata: {
      type: 'solution',
      industry: 'Government & Defense',
      compliance: ['FedRAMP', 'FISMA', 'NIST', 'DoD Guidelines'],
      technologies: ['Classified Data Protection', 'Critical Infrastructure Security']
    }
  },

  // Case Studies
  {
    id: 'healthcare-case-study',
    title: 'Regional Hospital Network Cybersecurity Transformation',
    content: `A 500-bed hospital network achieved complete HIPAA compliance and dramatically improved security posture. The hospital faced increasing cybersecurity threats, HIPAA compliance challenges, and growing medical device vulnerabilities. We implemented our AI-enabled GRC platform, medical device security framework, and comprehensive staff training program, deploying 24/7 monitoring and incident response capabilities. Results: 85% reduction in security incidents, 100% HIPAA compliance achievement, 60% faster incident response time, $2.3M in potential breach costs avoided, and enhanced patient trust and satisfaction.`,
    category: 'Case Studies',
    tags: ['Healthcare', 'HIPAA', 'Medical Devices', 'Incident Response', 'Compliance'],
    metadata: {
      type: 'case-study',
      industry: 'Healthcare',
      compliance: ['HIPAA'],
      results: ['85% reduction in security incidents', '100% HIPAA compliance', '60% faster response time', '$2.3M costs avoided']
    }
  },
  {
    id: 'manufacturing-case-study',
    title: 'Global Manufacturing Corp OT Security Success',
    content: `A Fortune 500 manufacturer secured their operational technology and prevented catastrophic cyber attacks. The company's industrial control systems were vulnerable to cyber attacks that could halt production across 15 global facilities, potentially causing millions in losses. We implemented comprehensive OT cybersecurity framework including network segmentation, asset discovery, continuous monitoring, and incident response planning. Results: 95% reduction in production downtime, 99.9% threat detection rate, $15M in potential losses prevented, enhanced supply chain security, and improved regulatory compliance.`,
    category: 'Case Studies',
    tags: ['Manufacturing', 'OT Security', 'ICS', 'Network Segmentation', 'Supply Chain'],
    metadata: {
      type: 'case-study',
      industry: 'Manufacturing',
      technologies: ['OT Security', 'Network Segmentation', 'Asset Discovery'],
      results: ['95% reduction in downtime', '99.9% threat detection', '$15M losses prevented']
    }
  },
  {
    id: 'fintech-case-study',
    title: 'FinTech Startup Security Transformation',
    content: `A rapidly growing fintech company achieved SOC 2 compliance and secured major funding through enhanced security posture. The startup needed to achieve SOC 2 compliance quickly to secure Series B funding and build customer trust in their financial platform. We implemented our strategic advisory services, compliance framework, and security program development to achieve SOC 2 Type II compliance in record time. Results: SOC 2 compliance achieved in 90 days, $50M Series B funding secured, 300% increase in customer trust scores, enhanced investor confidence, and scalable security foundation established.`,
    category: 'Case Studies',
    tags: ['FinTech', 'SOC 2', 'Compliance', 'Funding', 'Customer Trust'],
    metadata: {
      type: 'case-study',
      industry: 'Financial Services',
      compliance: ['SOC 2 Type II'],
      results: ['SOC 2 in 90 days', '$50M funding secured', '300% increase in trust scores']
    }
  },

  // Company Information
  {
    id: 'company-mission',
    title: 'N-Total Cybersecurity Mission & Vision',
    content: `N-Total Cybersecurity LLC is committed to securing tomorrow's digital landscape through innovative cybersecurity solutions that protect organizations while enabling their growth and success. Our mission is to protect organizations from evolving cyber threats. Our vision is to lead the future of cybersecurity innovation. Our values are Excellence, Innovation, Trust, and Partnership. We've protected 500+ organizations, provide 24/7 security monitoring, and achieve 99.9% threat detection rate.`,
    category: 'Company',
    tags: ['Mission', 'Vision', 'Values', 'Excellence', 'Innovation', 'Trust'],
    metadata: {
      type: 'company',
      results: ['500+ organizations protected', '24/7 monitoring', '99.9% threat detection']
    }
  },
  {
    id: 'team-expertise',
    title: 'Expert Team & Capabilities',
    content: `Our team consists of 50+ cybersecurity professionals with decades of combined experience across industries and technologies. We have industry-recognized certifications, experience with Fortune 500 companies, and a global threat intelligence network. Team expertise includes network security, cloud security, data protection, and AI & ML security.`,
    category: 'Company',
    tags: ['Team', 'Expertise', 'Certifications', 'Fortune 500', 'Global Network'],
    metadata: {
      type: 'company',
      technologies: ['Network Security', 'Cloud Security', 'Data Protection', 'AI/ML Security']
    }
  },
  {
    id: 'certifications',
    title: 'Industry Certifications & Compliance',
    content: `We maintain the highest standards of security and compliance through rigorous certifications and continuous validation. Our certifications include ISO 27001:2013 Information Security Management, SOC 2 Type II Compliance, NIST Cybersecurity Framework Alignment, and FedRAMP Ready Designation. We also maintain compliance with HIPAA, PCI DSS, SOX, and GLBA standards.`,
    category: 'Company',
    tags: ['Certifications', 'ISO 27001', 'SOC 2', 'NIST', 'FedRAMP', 'Compliance'],
    metadata: {
      type: 'company',
      compliance: ['ISO 27001', 'SOC 2 Type II', 'NIST', 'FedRAMP', 'HIPAA', 'PCI DSS', 'SOX', 'GLBA']
    }
  },

  // Resources
  {
    id: 'whitepapers',
    title: 'Technical White Papers & Research',
    content: `Our comprehensive technical white papers and research reports provide deep insights into cybersecurity topics. Available papers include AI in Cybersecurity: Trends & Applications, Zero Trust Architecture Implementation Guide, Industrial IoT Security Best Practices, and Cloud Security Compliance Framework. Papers are categorized by most downloaded, trending topics, latest research, and industry focus.`,
    category: 'Resources',
    tags: ['White Papers', 'Research', 'AI Security', 'Zero Trust', 'IoT Security', 'Cloud Security'],
    metadata: {
      type: 'resource',
      technologies: ['AI Security', 'Zero Trust', 'IoT Security', 'Cloud Security']
    }
  },
  {
    id: 'tools-assessments',
    title: 'Interactive Tools & Assessments',
    content: `Our interactive assessment tools and calculators help evaluate cybersecurity posture. Available tools include security maturity assessment, ROI calculator for security investments, compliance checklist generator, and threat risk assessment tool. Tool categories include assessment tools, calculators, checklists, and analytics.`,
    category: 'Resources',
    tags: ['Tools', 'Assessments', 'ROI Calculator', 'Compliance', 'Risk Assessment'],
    metadata: {
      type: 'resource',
      technologies: ['Assessment Tools', 'ROI Calculator', 'Compliance Tools', 'Risk Assessment']
    }
  },
  {
    id: 'insights-blog',
    title: 'Latest Insights & Industry Analysis',
    content: `Stay informed with our latest cybersecurity insights, threat intelligence, and industry analysis. We provide weekly threat intelligence reports, industry trend analysis, emerging threat alerts, and expert interviews and insights. Content types include blog posts, reports, interviews, and alerts.`,
    category: 'Resources',
    tags: ['Insights', 'Blog', 'Threat Intelligence', 'Trend Analysis', 'Expert Interviews'],
    metadata: {
      type: 'resource',
      technologies: ['Threat Intelligence', 'Trend Analysis', 'Expert Insights']
    }
  },

  // Testimonials
  {
    id: 'healthcare-testimonial',
    title: 'Healthcare Network CISO Testimonial',
    content: `"N-total Cybersecurity transformed our security posture completely. Their AI-enabled GRC platform helped us achieve 100% HIPAA compliance while reducing our incident response time by 60%. The team's expertise in healthcare security is unmatched." - Sarah Johnson, CISO, Fortune 500 Healthcare Network. Results: 100% HIPAA compliance, 60% faster incident response, 85% reduction in security incidents.`,
    category: 'Testimonials',
    tags: ['Healthcare', 'HIPAA', 'AI GRC', 'Incident Response', 'Compliance'],
    metadata: {
      type: 'testimonial',
      industry: 'Healthcare',
      results: ['100% HIPAA compliance', '60% faster response time', '85% reduction in incidents']
    }
  },
  {
    id: 'manufacturing-testimonial',
    title: 'Manufacturing VP Operations Testimonial',
    content: `"The OT cybersecurity solutions from N-total have been game-changing for our manufacturing operations. We've prevented potential losses of $15M and achieved 99.9% threat detection across all our facilities. Their expertise in industrial security is exceptional." - Michael Chen, VP of Operations, Global Manufacturing Corporation. Results: 95% reduction in downtime, 99.9% threat detection, $15M in losses prevented.`,
    category: 'Testimonials',
    tags: ['Manufacturing', 'OT Security', 'Threat Detection', 'Downtime Reduction'],
    metadata: {
      type: 'testimonial',
      industry: 'Manufacturing',
      results: ['95% reduction in downtime', '99.9% threat detection', '$15M losses prevented']
    }
  },
  {
    id: 'fintech-testimonial',
    title: 'FinTech CEO Testimonial',
    content: `"N-total's strategic advisory services helped us achieve SOC 2 compliance in just 90 days, which was crucial for securing our $50M Series B funding. Their team's strategic approach and deep expertise made all the difference." - David Rodriguez, CEO, FinTech Innovation Startup. Results: SOC 2 compliance in 90 days, $50M funding secured, 300% increase in customer trust.`,
    category: 'Testimonials',
    tags: ['FinTech', 'SOC 2', 'Compliance', 'Funding', 'Customer Trust'],
    metadata: {
      type: 'testimonial',
      industry: 'Financial Services',
      results: ['SOC 2 in 90 days', '$50M funding secured', '300% increase in trust']
    }
  }
];

// Search and retrieval functions for RAG pipeline
export const searchKnowledge = (query: string, limit: number = 5): KnowledgeItem[] => {
  const searchTerms = query.toLowerCase().split(' ');
  
  return knowledgeStore
    .map(item => {
      const content = item.content.toLowerCase();
      const title = item.title.toLowerCase();
      const tags = item.tags.map(tag => tag.toLowerCase());
      
      let score = 0;
      
      // Title matches get highest score
      searchTerms.forEach(term => {
        if (title.includes(term)) score += 10;
        if (content.includes(term)) score += 5;
        if (tags.some(tag => tag.includes(term))) score += 3;
      });
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const getKnowledgeByCategory = (category: string): KnowledgeItem[] => {
  return knowledgeStore.filter(item => item.category === category);
};

export const getKnowledgeByType = (type: string): KnowledgeItem[] => {
  return knowledgeStore.filter(item => item.metadata.type === type);
};

export const getKnowledgeByIndustry = (industry: string): KnowledgeItem[] => {
  return knowledgeStore.filter(item => item.metadata.industry === industry);
};
