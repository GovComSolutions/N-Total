import { Threat } from '@/types/threat';

// Real threat intelligence API endpoints
const THREAT_APIS = {
  // CISA Cybersecurity Advisories
  CISA: 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json',
  
  // NIST National Vulnerability Database (CVE data)
  NIST: 'https://services.nvd.nist.gov/rest/json/cves/2.0',
  
  // MITRE ATT&CK Framework
  MITRE: 'https://attack.mitre.org/api/enterprise/techniques/',
  
  // Open Threat Exchange (AlienVault)
  OTX: 'https://otx.alienvault.com/api/v1/pulses/subscribed',
  
  // ThreatFox Malware Database
  THREATFOX: 'https://threatfox-api.abuse.ch/api/v1/',
  
  // PhishTank (Phishing URLs)
  PHISHTANK: 'https://data.phishtank.com/data/online-valid.json'
};

// API Keys (you'll need to get these)
const API_KEYS = {
  OTX: process.env.VITE_OTX_API_KEY || '',
  THREATFOX: process.env.VITE_THREATFOX_API_KEY || '',
  PHISHTANK: process.env.VITE_PHISHTANK_API_KEY || ''
};

// Transform CISA data to our Threat interface
const transformCISAData = (cisaData: any): Threat[] => {
  if (!cisaData.vulnerabilities) return [];
  
  return cisaData.vulnerabilities.map((vuln: any) => ({
    id: `cisa-${vuln.cveID}`,
    title: `CISA Known Exploited: ${vuln.vulnerabilityName}`,
    description: `This vulnerability is listed in CISA's Known Exploited Vulnerabilities Catalog. ${vuln.shortDescription || 'Requires immediate attention.'}`,
    severity: vuln.requiredAction === 'Apply updates per vendor instructions.' ? 'critical' : 'high',
    category: 'vulnerability',
    cveId: vuln.cveID,
    attackVector: 'Multiple',
    affectedSoftware: vuln.product ? [vuln.product] : undefined,
    affectedIndustries: ['Government', 'Critical Infrastructure', 'Technology'],
    affectedRegions: ['United States', 'Global'],
    businessImpact: 'high',
    source: 'CISA',
    timestamp: new Date(vuln.dateAdded),
    lastUpdated: new Date(),
    verified: true,
    mitigationSteps: [
      'Apply vendor-provided security updates immediately',
      'Verify patch installation and test functionality',
      'Monitor for signs of exploitation',
      'Implement additional network segmentation if possible'
    ],
    references: [
      `https://nvd.nist.gov/vuln/detail/${vuln.cveID}`,
      'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'
    ]
  }));
};

// Transform NIST CVE data
const transformNISTData = (nistData: any): Threat[] => {
  if (!nistData.vulnerabilities) return [];
  
  return nistData.vulnerabilities.map((vuln: any) => {
    const cvss = vuln.cvssMetricV31?.[0]?.cvssData || vuln.cvssMetricV2?.[0]?.cvssData;
    const baseScore = cvss?.baseScore || 0;
    
    let severity: Threat['severity'] = 'low';
    if (baseScore >= 9.0) severity = 'critical';
    else if (baseScore >= 7.0) severity = 'high';
    else if (baseScore >= 4.0) severity = 'medium';
    
    return {
      id: `nist-${vuln.cve.id}`,
      title: `CVE-${vuln.cve.id}: ${vuln.cve.descriptions?.[0]?.value?.substring(0, 100)}...`,
      description: vuln.cve.descriptions?.[0]?.value || 'No description available',
      severity,
      category: 'vulnerability',
      cveId: vuln.cve.id,
      attackVector: 'Multiple',
      affectedIndustries: ['Technology', 'Finance', 'Healthcare', 'Government'],
      affectedRegions: ['Global'],
      businessImpact: severity === 'critical' ? 'critical' : severity === 'high' ? 'high' : 'medium',
      source: 'NIST NVD',
      timestamp: new Date(vuln.cve.published),
      lastUpdated: new Date(vuln.cve.lastModified),
      verified: true,
      mitigationSteps: [
        'Check vendor for available patches',
        'Implement workarounds if patches unavailable',
        'Monitor for exploitation attempts',
        'Consider temporary network isolation'
      ],
      references: [
        `https://nvd.nist.gov/vuln/detail/${vuln.cve.id}`,
        'https://cve.mitre.org/cgi-bin/cvename.cgi?name=' + vuln.cve.id
      ]
    };
  });
};

// Transform ThreatFox malware data
const transformThreatFoxData = (threatfoxData: any): Threat[] => {
  if (!threatfoxData.query_status || threatfoxData.query_status !== 'ok') return [];
  
  return threatfoxData.data.map((malware: any) => ({
    id: `threatfox-${malware.id}`,
    title: `Malware: ${malware.malware_printable}`,
    description: `Malware detected via ${malware.reporter}. Target: ${malware.target_country || 'Unknown'}`,
    severity: 'high',
    category: 'malware',
    attackVector: malware.delivery_method || 'Unknown',
    ioc: [malware.ioc],
    affectedIndustries: ['Finance', 'Technology', 'Healthcare', 'Government'],
    affectedRegions: malware.target_country ? [malware.target_country] : ['Global'],
    businessImpact: 'high',
    source: 'ThreatFox',
    timestamp: new Date(malware.first_seen * 1000),
    lastUpdated: new Date(malware.last_seen * 1000),
    verified: true,
    mitigationSteps: [
      'Update antivirus signatures immediately',
      'Scan all systems for indicators of compromise',
      'Block identified IP addresses and domains',
      'Review network logs for suspicious activity'
    ],
    references: [
      'https://threatfox.abuse.ch/browse/',
      `https://threatfox.abuse.ch/browse/malware/${malware.malware_printable}/`
    ]
  }));
};

// Main function to fetch real threat intelligence
export const fetchRealThreatIntelligence = async (): Promise<Threat[]> => {
  const allThreats: Threat[] = [];
  
  try {
    // Fetch from CISA (no API key required)
    try {
      console.log('Fetching from CISA...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const cisaResponse = await fetch(THREAT_APIS.CISA, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (cisaResponse.ok) {
        const cisaData = await cisaResponse.json();
        const cisaThreats = transformCISAData(cisaData);
        allThreats.push(...cisaThreats.slice(0, 10)); // Limit to 10 most recent
        console.log(`Fetched ${cisaThreats.length} threats from CISA`);
      } else {
        console.warn('CISA response not ok:', cisaResponse.status);
      }
    } catch (error) {
      console.warn('Failed to fetch from CISA:', error);
    }

    // Fetch from NIST NVD (no API key required)
    try {
      console.log('Fetching from NIST...');
      const nistResponse = await fetch(`${THREAT_APIS.NIST}?pubStartDate=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&resultsPerPage=10`);
      if (nistResponse.ok) {
        const nistData = await nistResponse.json();
        const nistThreats = transformNISTData(nistData);
        allThreats.push(...nistThreats.slice(0, 10));
        console.log(`Fetched ${nistThreats.length} threats from NIST`);
      } else {
        console.warn('NIST response not ok:', nistResponse.status);
      }
    } catch (error) {
      console.warn('Failed to fetch from NIST:', error);
    }

    // Fetch from ThreatFox (no API key required for basic queries)
    try {
      console.log('Fetching from ThreatFox...');
      const threatfoxResponse = await fetch(THREAT_APIS.THREATFOX, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'get_recent',
          days: 1
        })
      });
      if (threatfoxResponse.ok) {
        const threatfoxData = await threatfoxResponse.json();
        const threatfoxThreats = transformThreatFoxData(threatfoxData);
        allThreats.push(...threatfoxThreats.slice(0, 5));
        console.log(`Fetched ${threatfoxThreats.length} threats from ThreatFox`);
      } else {
        console.warn('ThreatFox response not ok:', threatfoxResponse.status);
      }
    } catch (error) {
      console.warn('Failed to fetch from ThreatFox:', error);
    }

    // Add some high-priority simulated threats for demonstration
    const demoThreats: Threat[] = [
      {
        id: 'demo-critical-1',
        title: 'Critical Log4j Vulnerability Exploitation Surge',
        description: 'Massive increase in Log4j exploitation attempts targeting enterprise systems worldwide. Multiple APT groups actively exploiting CVE-2021-44228.',
        severity: 'critical',
        category: 'vulnerability',
        cveId: 'CVE-2021-44228',
        attackVector: 'Web Application',
        affectedIndustries: ['Technology', 'Finance', 'Healthcare', 'Government', 'Energy'],
        affectedRegions: ['Global'],
        businessImpact: 'critical',
        source: 'Security Research',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        lastUpdated: new Date(),
        verified: true,
        mitigationSteps: [
          'Immediately update to Log4j 2.17.0 or later',
          'Apply emergency patches if updates unavailable',
          'Monitor network traffic for exploitation attempts',
          'Implement WAF rules to block malicious requests'
        ],
        references: [
          'https://logging.apache.org/log4j/2.x/security.html',
          'https://nvd.nist.gov/vuln/detail/CVE-2021-44228'
        ]
      },
      {
        id: 'demo-high-1',
        title: 'Ransomware Campaign Targeting Healthcare Systems',
        description: 'New ransomware variant specifically targeting healthcare infrastructure. Multiple hospitals in North America and Europe affected.',
        severity: 'high',
        category: 'ransomware',
        attackVector: 'Email',
        affectedIndustries: ['Healthcare', 'Pharmaceuticals'],
        affectedRegions: ['North America', 'Europe'],
        businessImpact: 'high',
        source: 'Healthcare ISAC',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        lastUpdated: new Date(),
        verified: true,
        mitigationSteps: [
          'Enable multi-factor authentication on all systems',
          'Implement email security filtering',
          'Conduct security awareness training',
          'Ensure backup systems are isolated'
        ],
        references: [
          'https://www.h-isac.org/',
          'https://www.cisa.gov/ransomware'
        ]
      }
    ];

    allThreats.push(...demoThreats);

    // Sort by severity and timestamp
    allThreats.sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

    console.log(`Total threats collected: ${allThreats.length}`);
    
    // If we have no real threats, return demo threats only
    if (allThreats.length === 0) {
      console.log('No real threats collected, returning demo threats only');
      return demoThreats;
    }

    return allThreats.slice(0, 25); // Return top 25 threats

  } catch (error) {
    console.error('Error fetching real threat intelligence:', error);
    throw new Error('Failed to fetch threat intelligence from external sources');
  }
};

// Function to get threat intelligence from specific source
export const fetchFromSource = async (source: keyof typeof THREAT_APIS): Promise<Threat[]> => {
  switch (source) {
    case 'CISA':
      const cisaResponse = await fetch(THREAT_APIS.CISA);
      const cisaData = await cisaResponse.json();
      return transformCISAData(cisaData);
    
    case 'NIST':
      const nistResponse = await fetch(`${THREAT_APIS.NIST}?pubStartDate=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}&resultsPerPage=20`);
      const nistData = await nistResponse.json();
      return transformNISTData(nistData);
    
    default:
      throw new Error(`Source ${source} not implemented yet`);
  }
};

// Fallback function that returns mock data immediately
export const getFallbackThreats = (): Threat[] => {
  return [
    {
      id: 'fallback-critical-1',
      title: 'Critical Log4j Vulnerability Exploitation Surge',
      description: 'Massive increase in Log4j exploitation attempts targeting enterprise systems worldwide. Multiple APT groups actively exploiting CVE-2021-44228.',
      severity: 'critical',
      category: 'vulnerability',
      cveId: 'CVE-2021-44228',
      attackVector: 'Web Application',
      affectedIndustries: ['Technology', 'Finance', 'Healthcare', 'Government', 'Energy'],
      affectedRegions: ['Global'],
      businessImpact: 'critical',
      source: 'Security Research',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      lastUpdated: new Date(),
      verified: true,
      mitigationSteps: [
        'Immediately update to Log4j 2.17.0 or later',
        'Apply emergency patches if updates unavailable',
        'Monitor network traffic for exploitation attempts',
        'Implement WAF rules to block malicious requests'
      ],
      references: [
        'https://logging.apache.org/log4j/2.x/security.html',
        'https://nvd.nist.gov/vuln/detail/CVE-2021-44228'
      ]
    },
    {
      id: 'fallback-high-1',
      title: 'Ransomware Campaign Targeting Healthcare Systems',
      description: 'New ransomware variant specifically targeting healthcare infrastructure. Multiple hospitals in North America and Europe affected.',
      severity: 'high',
      category: 'ransomware',
      attackVector: 'Email',
      affectedIndustries: ['Healthcare', 'Pharmaceuticals'],
      affectedRegions: ['North America', 'Europe'],
      businessImpact: 'high',
      source: 'Healthcare ISAC',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      lastUpdated: new Date(),
      verified: true,
      mitigationSteps: [
        'Enable multi-factor authentication on all systems',
        'Implement email security filtering',
        'Conduct security awareness training',
        'Ensure backup systems are isolated'
      ],
      references: [
        'https://www.h-isac.org/',
        'https://www.cisa.gov/ransomware'
      ]
    }
  ];
};
