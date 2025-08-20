// Knowledge Extraction Utility for N-Total Cybersecurity Website
// This utility helps extract and structure content for the RAG pipeline

export interface ExtractedContent {
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
    location?: string; // Where in the website this content was found
  };
}

// Website content extraction mapping
export const websiteContentMap = {
  // Hero Section
  hero: {
    title: "N-Total Cybersecurity Hero Section",
    content: "N-Total Cybersecurity LLC is committed to securing tomorrow's digital landscape through innovative cybersecurity solutions that protect organizations while enabling their growth and success.",
    category: "Company",
    tags: ["Mission", "Vision", "Innovation", "Growth", "Success"],
    metadata: {
      type: "company",
      location: "Hero Section"
    }
  },

  // Services Section
  services: {
    aiGrc: {
      title: "AI-Enabled Governance, Risk & Compliance",
      content: "Advanced AI-enabled GRC solutions that transform compliance operations with intelligent automation and predictive analytics. Features include automated compliance monitoring across 50+ frameworks, AI-powered risk prediction with 95% accuracy, real-time threat intelligence integration, and automated reporting and dashboard generation.",
      category: "Services",
      tags: ["AI", "GRC", "Compliance", "Risk Management", "Automation", "Machine Learning"],
      metadata: {
        type: "service",
        technologies: ["AI/ML", "Machine Learning", "Predictive Analytics", "Automation"],
        compliance: ["ISO 27001", "SOC 2", "NIST", "HIPAA", "PCI DSS"],
        location: "Services Section - AI GRC Tab"
      }
    },
    training: {
      title: "Comprehensive Cybersecurity Training",
      content: "Building a security-first culture with industry-leading education and certifications. Programs include customized training for all skill levels, hands-on labs and real-world scenarios, industry-recognized certifications, and continuous learning and updates.",
      category: "Services",
      tags: ["Training", "Education", "Certification", "Security Awareness", "Skills Development"],
      metadata: {
        type: "service",
        technologies: ["Hands-on Labs", "Real-world Scenarios", "Certification Programs"],
        location: "Services Section - Training Tab"
      }
    },
    advisory: {
      title: "Strategic Cybersecurity Advisory",
      content: "Aligning your security strategy with business objectives through expert consulting and strategic planning. Services include security program development and optimization, risk management strategy development, technology roadmap and architecture planning, and executive-level security consulting.",
      category: "Services",
      tags: ["Advisory", "Strategy", "Consulting", "Risk Management", "Program Development"],
      metadata: {
        type: "service",
        technologies: ["Strategic Planning", "Risk Assessment", "Program Optimization"],
        location: "Services Section - Advisory Tab"
      }
    },
    otSecurity: {
      title: "Operational Technology Security",
      content: "Specialized OT cybersecurity solutions that protect critical infrastructure with security designed for industrial environments. Features include industrial control systems (ICS) security, network segmentation and isolation, asset discovery and continuous monitoring, and incident response planning and execution.",
      category: "Services",
      tags: ["OT Security", "ICS", "Industrial Security", "Network Segmentation", "Asset Management"],
      metadata: {
        type: "service",
        technologies: ["ICS Security", "Network Segmentation", "Asset Discovery", "Threat Detection"],
        compliance: ["NIST Cybersecurity Framework", "ISA/IEC 62443"],
        location: "Services Section - OT Security Tab"
      }
    }
  },

  // Solutions Section
  solutions: {
    healthcare: {
      title: "Healthcare Cybersecurity Solutions",
      content: "Specialized healthcare cybersecurity solutions that protect patient data and ensure HIPAA compliance. Features include HIPAA compliance and audit support, medical device security, patient data protection, and incident response for healthcare.",
      category: "Solutions",
      tags: ["Healthcare", "HIPAA", "Medical Devices", "Patient Data", "PHI Protection"],
      metadata: {
        type: "solution",
        industry: "Healthcare",
        compliance: ["HIPAA", "HITECH", "FDA Guidelines"],
        technologies: ["Medical Device Security", "PHI Protection", "Incident Response"],
        location: "Solutions Section - Healthcare Tab"
      }
    },
    finance: {
      title: "Financial Services Security Solutions",
      content: "Comprehensive banking and fintech security solutions that secure financial transactions and protect customer assets. Features include PCI DSS compliance and validation, fraud detection and prevention, transaction security, and regulatory compliance (SOX, GLBA).",
      category: "Solutions",
      tags: ["Finance", "Banking", "PCI DSS", "Fraud Detection", "Transaction Security"],
      metadata: {
        type: "solution",
        industry: "Financial Services",
        compliance: ["PCI DSS", "SOX", "GLBA", "FFIEC Guidelines"],
        technologies: ["Fraud Detection", "Transaction Security", "Compliance Monitoring"],
        location: "Solutions Section - Finance Tab"
      }
    },
    manufacturing: {
      title: "Manufacturing & Industrial Security Solutions",
      content: "Specialized manufacturing cybersecurity solutions that protect production systems and intellectual property. Features include industrial control systems (ICS) security, supply chain security, intellectual property protection, and operational technology security.",
      category: "Solutions",
      tags: ["Manufacturing", "Industrial", "ICS", "Supply Chain", "IP Protection"],
      metadata: {
        type: "solution",
        industry: "Manufacturing",
        compliance: ["NIST Cybersecurity Framework", "ISA/IEC 62443"],
        technologies: ["ICS Security", "Supply Chain Security", "IP Protection"],
        location: "Solutions Section - Manufacturing Tab"
      }
    },
    government: {
      title: "Government & Defense Security Solutions",
      content: "Specialized government cybersecurity solutions that secure critical government systems and protect national security. Features include FedRAMP compliance and certification, classified information protection, critical infrastructure security, and defense contractor security.",
      category: "Solutions",
      tags: ["Government", "Defense", "FedRAMP", "Classified Data", "Critical Infrastructure"],
      metadata: {
        type: "solution",
        industry: "Government & Defense",
        compliance: ["FedRAMP", "FISMA", "NIST", "DoD Guidelines"],
        technologies: ["Classified Data Protection", "Critical Infrastructure Security"],
        location: "Solutions Section - Government Tab"
      }
    }
  },

  // Case Studies Section
  caseStudies: {
    healthcare: {
      title: "Regional Hospital Network Cybersecurity Transformation",
      content: "A 500-bed hospital network achieved complete HIPAA compliance and dramatically improved security posture. The hospital faced increasing cybersecurity threats, HIPAA compliance challenges, and growing medical device vulnerabilities. We implemented our AI-enabled GRC platform, medical device security framework, and comprehensive staff training program, deploying 24/7 monitoring and incident response capabilities.",
      category: "Case Studies",
      tags: ["Healthcare", "HIPAA", "Medical Devices", "Incident Response", "Compliance"],
      metadata: {
        type: "case-study",
        industry: "Healthcare",
        compliance: ["HIPAA"],
        results: ["85% reduction in security incidents", "100% HIPAA compliance", "60% faster response time", "$2.3M costs avoided"],
        location: "Case Studies Section - Healthcare Case Study"
      }
    },
    manufacturing: {
      title: "Global Manufacturing Corp OT Security Success",
      content: "A Fortune 500 manufacturer secured their operational technology and prevented catastrophic cyber attacks. The company's industrial control systems were vulnerable to cyber attacks that could halt production across 15 global facilities, potentially causing millions in losses. We implemented comprehensive OT cybersecurity framework including network segmentation, asset discovery, continuous monitoring, and incident response planning.",
      category: "Case Studies",
      tags: ["Manufacturing", "OT Security", "ICS", "Network Segmentation", "Supply Chain"],
      metadata: {
        type: "case-study",
        industry: "Manufacturing",
        technologies: ["OT Security", "Network Segmentation", "Asset Discovery"],
        results: ["95% reduction in downtime", "99.9% threat detection", "$15M losses prevented"],
        location: "Case Studies Section - Manufacturing Case Study"
      }
    },
    fintech: {
      title: "FinTech Startup Security Transformation",
      content: "A rapidly growing fintech company achieved SOC 2 compliance and secured major funding through enhanced security posture. The startup needed to achieve SOC 2 compliance quickly to secure Series B funding and build customer trust in their financial platform. We implemented our strategic advisory services, compliance framework, and security program development to achieve SOC 2 Type II compliance in record time.",
      category: "Case Studies",
      tags: ["FinTech", "SOC 2", "Compliance", "Funding", "Customer Trust"],
      metadata: {
        type: "case-study",
        industry: "Financial Services",
        compliance: ["SOC 2 Type II"],
        results: ["SOC 2 in 90 days", "$50M funding secured", "300% increase in trust scores"],
        location: "Case Studies Section - FinTech Case Study"
      }
    }
  },

  // Company Information
  company: {
    mission: {
      title: "N-Total Cybersecurity Mission & Vision",
      content: "N-Total Cybersecurity LLC is committed to securing tomorrow's digital landscape through innovative cybersecurity solutions that protect organizations while enabling their growth and success. Our mission is to protect organizations from evolving cyber threats. Our vision is to lead the future of cybersecurity innovation. Our values are Excellence, Innovation, Trust, and Partnership.",
      category: "Company",
      tags: ["Mission", "Vision", "Values", "Excellence", "Innovation", "Trust"],
      metadata: {
        type: "company",
        results: ["500+ organizations protected", "24/7 monitoring", "99.9% threat detection"],
        location: "About Section - Company Tab"
      }
    },
    team: {
      title: "Expert Team & Capabilities",
      content: "Our team consists of 50+ cybersecurity professionals with decades of combined experience across industries and technologies. We have industry-recognized certifications, experience with Fortune 500 companies, and a global threat intelligence network. Team expertise includes network security, cloud security, data protection, and AI & ML security.",
      category: "Company",
      tags: ["Team", "Expertise", "Certifications", "Fortune 500", "Global Network"],
      metadata: {
        type: "company",
        technologies: ["Network Security", "Cloud Security", "Data Protection", "AI/ML Security"],
        location: "About Section - Team Tab"
      }
    },
    certifications: {
      title: "Industry Certifications & Compliance",
      content: "We maintain the highest standards of security and compliance through rigorous certifications and continuous validation. Our certifications include ISO 27001:2013 Information Security Management, SOC 2 Type II Compliance, NIST Cybersecurity Framework Alignment, and FedRAMP Ready Designation. We also maintain compliance with HIPAA, PCI DSS, SOX, and GLBA standards.",
      category: "Company",
      tags: ["Certifications", "ISO 27001", "SOC 2", "NIST", "FedRAMP", "Compliance"],
      metadata: {
        type: "company",
        compliance: ["ISO 27001", "SOC 2 Type II", "NIST", "FedRAMP", "HIPAA", "PCI DSS", "SOX", "GLBA"],
        location: "About Section - Certifications Tab"
      }
    }
  },

  // Resources Section
  resources: {
    whitepapers: {
      title: "Technical White Papers & Research",
      content: "Our comprehensive technical white papers and research reports provide deep insights into cybersecurity topics. Available papers include AI in Cybersecurity: Trends & Applications, Zero Trust Architecture Implementation Guide, Industrial IoT Security Best Practices, and Cloud Security Compliance Framework.",
      category: "Resources",
      tags: ["White Papers", "Research", "AI Security", "Zero Trust", "IoT Security", "Cloud Security"],
      metadata: {
        type: "resource",
        technologies: ["AI Security", "Zero Trust", "IoT Security", "Cloud Security"],
        location: "Resources Section - White Papers Tab"
      }
    },
    tools: {
      title: "Interactive Tools & Assessments",
      content: "Our interactive assessment tools and calculators help evaluate cybersecurity posture. Available tools include security maturity assessment, ROI calculator for security investments, compliance checklist generator, and threat risk assessment tool.",
      category: "Resources",
      tags: ["Tools", "Assessments", "ROI Calculator", "Compliance", "Risk Assessment"],
      metadata: {
        type: "resource",
        technologies: ["Assessment Tools", "ROI Calculator", "Compliance Tools", "Risk Assessment"],
        location: "Resources Section - Tools Tab"
      }
    },
    insights: {
      title: "Latest Insights & Industry Analysis",
      content: "Stay informed with our latest cybersecurity insights, threat intelligence, and industry analysis. We provide weekly threat intelligence reports, industry trend analysis, emerging threat alerts, and expert interviews and insights.",
      category: "Resources",
      tags: ["Insights", "Blog", "Threat Intelligence", "Trend Analysis", "Expert Interviews"],
      metadata: {
        type: "resource",
        technologies: ["Threat Intelligence", "Trend Analysis", "Expert Insights"],
        location: "Resources Section - Insights Tab"
      }
    }
  },

  // Testimonials Section
  testimonials: {
    healthcare: {
      title: "Healthcare Network CISO Testimonial",
      content: "N-total Cybersecurity transformed our security posture completely. Their AI-enabled GRC platform helped us achieve 100% HIPAA compliance while reducing our incident response time by 60%. The team's expertise in healthcare security is unmatched.",
      category: "Testimonials",
      tags: ["Healthcare", "HIPAA", "AI GRC", "Incident Response", "Compliance"],
      metadata: {
        type: "testimonial",
        industry: "Healthcare",
        results: ["100% HIPAA compliance", "60% faster response time", "85% reduction in incidents"],
        location: "Testimonials Section - Healthcare Testimonial"
      }
    },
    manufacturing: {
      title: "Manufacturing VP Operations Testimonial",
      content: "The OT cybersecurity solutions from N-total have been game-changing for our manufacturing operations. We've prevented potential losses of $15M and achieved 99.9% threat detection across all our facilities. Their expertise in industrial security is exceptional.",
      category: "Testimonials",
      tags: ["Manufacturing", "OT Security", "Threat Detection", "Downtime Reduction"],
      metadata: {
        type: "testimonial",
        industry: "Manufacturing",
        results: ["95% reduction in downtime", "99.9% threat detection", "$15M losses prevented"],
        location: "Testimonials Section - Manufacturing Testimonial"
      }
    },
    fintech: {
      title: "FinTech CEO Testimonial",
      content: "N-total's strategic advisory services helped us achieve SOC 2 compliance in just 90 days, which was crucial for securing our $50M Series B funding. Their team's strategic approach and deep expertise made all the difference.",
      category: "Testimonials",
      tags: ["FinTech", "SOC 2", "Compliance", "Funding", "Customer Trust"],
      metadata: {
        type: "testimonial",
        industry: "Financial Services",
        results: ["SOC 2 in 90 days", "$50M funding secured", "300% increase in trust scores"],
        location: "Testimonials Section - FinTech Testimonial"
      }
    }
  }
};

// Function to extract all content from the website
export const extractAllContent = (): ExtractedContent[] => {
  const extracted: ExtractedContent[] = [];
  let idCounter = 1;

  // Extract hero content
  extracted.push({
    id: `hero-${idCounter++}`,
    ...websiteContentMap.hero
  });

  // Extract services
  Object.values(websiteContentMap.services).forEach(service => {
    extracted.push({
      id: `service-${idCounter++}`,
      ...service
    });
  });

  // Extract solutions
  Object.values(websiteContentMap.solutions).forEach(solution => {
    extracted.push({
      id: `solution-${idCounter++}`,
      ...solution
    });
  });

  // Extract case studies
  Object.values(websiteContentMap.caseStudies).forEach(caseStudy => {
    extracted.push({
      id: `case-study-${idCounter++}`,
      ...caseStudy
    });
  });

  // Extract company information
  Object.values(websiteContentMap.company).forEach(company => {
    extracted.push({
      id: `company-${idCounter++}`,
      ...company
    });
  });

  // Extract resources
  Object.values(websiteContentMap.resources).forEach(resource => {
    extracted.push({
      id: `resource-${idCounter++}`,
      ...resource
    });
  });

  // Extract testimonials
  Object.values(websiteContentMap.testimonials).forEach(testimonial => {
    extracted.push({
      id: `testimonial-${idCounter++}`,
      ...testimonial
    });
  });

  return extracted;
};

// Function to search content by specific criteria
export const searchContentByCriteria = (
  criteria: {
    category?: string;
    type?: string;
    industry?: string;
    tags?: string[];
    location?: string;
  }
): ExtractedContent[] => {
  const allContent = extractAllContent();
  
  return allContent.filter(content => {
    if (criteria.category && content.category !== criteria.category) return false;
    if (criteria.type && content.metadata.type !== criteria.type) return false;
    if (criteria.industry && content.metadata.industry !== criteria.industry) return false;
    if (criteria.location && !content.metadata.location?.includes(criteria.location)) return false;
    if (criteria.tags && !criteria.tags.some(tag => content.tags.includes(tag))) return false;
    
    return true;
  });
};

// Function to generate content summary for RAG pipeline
export const generateContentSummary = (): string => {
  const allContent = extractAllContent();
  
  const summary = {
    totalItems: allContent.length,
    categories: {} as Record<string, number>,
    types: {} as Record<string, number>,
    industries: {} as Record<string, number>,
    totalTags: new Set<string>()
  };

  allContent.forEach(content => {
    // Count categories
    summary.categories[content.category] = (summary.categories[content.category] || 0) + 1;
    
    // Count types
    summary.types[content.metadata.type] = (summary.types[content.metadata.type] || 0) + 1;
    
    // Count industries
    if (content.metadata.industry) {
      summary.industries[content.metadata.industry] = (summary.industries[content.metadata.industry] || 0) + 1;
    }
    
    // Collect all tags
    content.tags.forEach(tag => summary.totalTags.add(tag));
  });

  return `Knowledge Base Summary:
- Total Content Items: ${summary.totalItems}
- Categories: ${Object.entries(summary.categories).map(([cat, count]) => `${cat}: ${count}`).join(', ')}
- Content Types: ${Object.entries(summary.types).map(([type, count]) => `${type}: ${count}`).join(', ')}
- Industries: ${Object.entries(summary.industries).map(([ind, count]) => `${ind}: ${count}`).join(', ')}
- Unique Tags: ${summary.totalTags.size}`;
};
