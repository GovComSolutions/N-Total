// Enhanced NIST National Vulnerability Database (NVD) Integration
// Provides detailed CVE information with CVSS scores, impact analysis, and recommendations
// This service fetches real vulnerability data from NIST's public API

export interface NISTVulnerability {
  id: string;
  cveId: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvssScore: number;
  cvssVector: string;
  impactMetrics: {
    confidentiality: 'high' | 'medium' | 'low' | 'none';
    integrity: 'high' | 'medium' | 'low' | 'none';
    availability: 'high' | 'medium' | 'low' | 'none';
  };
  affectedProducts: string[];
  publishedDate: string;
  lastModifiedDate: string;
  references: Array<{
    url: string;
    name: string;
    type: 'vendor' | 'patch' | 'advisory' | 'other';
  }>;
  recommendations: string[];
  source: 'NIST';
  category: 'vulnerability';
}

// NIST's public CVE API endpoint
const NIST_API_ENDPOINT = 'https://services.nvd.nist.gov/rest/json/cves/2.0';

// Enhanced fallback data with NIST-style information
const ENHANCED_FALLBACK_DATA: NISTVulnerability[] = [
  {
    id: 'nist-fallback-1',
    cveId: 'CVE-2021-44228',
    title: 'Apache Log4j Remote Code Execution Vulnerability',
    description: 'Critical vulnerability in Apache Log4j allowing remote code execution via crafted log messages.',
    severity: 'critical',
    cvssScore: 10.0,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
    impactMetrics: {
      confidentiality: 'high',
      integrity: 'high',
      availability: 'high'
    },
    affectedProducts: ['Apache Log4j 2.0-beta9 through 2.14.1'],
    publishedDate: '2021-12-10T00:00:00.000Z',
    lastModifiedDate: '2021-12-10T00:00:00.000Z',
    references: [
      {
        url: 'https://logging.apache.org/log4j/2.x/security.html',
        name: 'Apache Security Advisory',
        type: 'advisory'
      },
      {
        url: 'https://github.com/apache/logging-log4j2/pull/608',
        name: 'Security Patch',
        type: 'patch'
      }
    ],
    recommendations: [
      'Update to Log4j 2.17.0 or later',
      'Apply security patches immediately',
      'Monitor for exploitation attempts',
      'Review logging configurations'
    ],
    source: 'NIST',
    category: 'vulnerability'
  },
  {
    id: 'nist-fallback-2',
    cveId: 'CVE-2021-34527',
    title: 'Windows Print Spooler Remote Code Execution Vulnerability',
    description: 'High-severity vulnerability in Windows Print Spooler allowing remote code execution.',
    severity: 'high',
    cvssScore: 8.8,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
    impactMetrics: {
      confidentiality: 'high',
      integrity: 'high',
      availability: 'high'
    },
    affectedProducts: ['Windows 10', 'Windows 11', 'Windows Server 2019', 'Windows Server 2022'],
    publishedDate: '2021-07-13T00:00:00.000Z',
    lastModifiedDate: '2021-07-13T00:00:00.000Z',
    references: [
      {
        url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-34527',
        name: 'Microsoft Security Advisory',
        type: 'advisory'
      }
    ],
    recommendations: [
      'Apply Microsoft security updates',
      'Disable Print Spooler service if not needed',
      'Restrict network access to print servers',
      'Monitor for suspicious print spooler activity'
    ],
    source: 'NIST',
    category: 'vulnerability'
  },
  {
    id: 'nist-fallback-3',
    cveId: 'CVE-2021-26084',
    title: 'Confluence Server OGNL Injection Vulnerability',
    description: 'Medium-severity vulnerability in Confluence Server allowing remote code execution.',
    severity: 'medium',
    cvssScore: 6.1,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
    impactMetrics: {
      confidentiality: 'low',
      integrity: 'low',
      availability: 'none'
    },
    affectedProducts: ['Confluence Server 6.13.23', 'Confluence Server 7.4.11', 'Confluence Server 7.11.6'],
    publishedDate: '2021-08-25T00:00:00.000Z',
    lastModifiedDate: '2021-08-25T00:00:00.000Z',
    references: [
      {
        url: 'https://confluence.atlassian.com/doc/confluence-security-advisory-2021-08-25-1077906215.html',
        name: 'Atlassian Security Advisory',
        type: 'advisory'
      }
    ],
    recommendations: [
      'Update to latest Confluence Server version',
      'Apply security patches',
      'Review access controls',
      'Monitor for suspicious activity'
    ],
    source: 'NIST',
    category: 'vulnerability'
  }
];

// Transform NIST API response to our format
const transformNISTData = (nistData: any): NISTVulnerability[] => {
  try {
    if (!nistData || !nistData.vulnerabilities || !Array.isArray(nistData.vulnerabilities)) {
      console.warn('NIST data format unexpected, using enhanced fallback');
      return ENHANCED_FALLBACK_DATA;
    }

    return nistData.vulnerabilities.slice(0, 15).map((vuln: any) => {
      const cve = vuln.cve;
      const metrics = cve.metrics?.cvssMetricV31?.[0] || cve.metrics?.cvssMetricV30?.[0] || {};
      const cvssData = metrics.cvssData || {};
      
      return {
        id: `nist-${cve.id}`,
        cveId: cve.id,
        title: cve.descriptions?.[0]?.value || 'Vulnerability Details Unavailable',
        description: cve.descriptions?.[0]?.value || 'Detailed description not available.',
        severity: determineNISTSeverity(cvssData.baseScore),
        cvssScore: cvssData.baseScore || 0,
        cvssVector: cvssData.vectorString || 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:N',
        impactMetrics: {
          confidentiality: cvssData.confidentialityImpact || 'none',
          integrity: cvssData.integrityImpact || 'none',
          availability: cvssData.availabilityImpact || 'none'
        },
        affectedProducts: extractAffectedProducts(cve),
        publishedDate: cve.published || new Date().toISOString(),
        lastModifiedDate: cve.lastModified || new Date().toISOString(),
        references: extractReferences(cve),
        recommendations: generateRecommendations(cvssData.baseScore, cvssData.vectorString),
        source: 'NIST',
        category: 'vulnerability'
      };
    });
  } catch (error) {
    console.warn('Error transforming NIST data:', error);
    return ENHANCED_FALLBACK_DATA;
  }
};

// Determine severity based on CVSS score
const determineNISTSeverity = (cvssScore: number): 'critical' | 'high' | 'medium' | 'low' => {
  if (cvssScore >= 9.0) return 'critical';
  if (cvssScore >= 7.0) return 'high';
  if (cvssScore >= 4.0) return 'medium';
  return 'low';
};

// Extract affected products from NIST data
const extractAffectedProducts = (cve: any): string[] => {
  try {
    const products: string[] = [];
    if (cve.configurations) {
      cve.configurations.forEach((config: any) => {
        config.nodes?.forEach((node: any) => {
          node.cpeMatch?.forEach((match: any) => {
            if (match.cpe23Uri) {
              const cpeParts = match.cpe23Uri.split(':');
              if (cpeParts.length >= 5) {
                const vendor = cpeParts[3];
                const product = cpeParts[4];
                if (vendor && product && vendor !== '*' && product !== '*') {
                  products.push(`${vendor} ${product}`);
                }
              }
            }
          });
        });
      });
    }
    return products.length > 0 ? [...new Set(products)] : ['Product information unavailable'];
  } catch {
    return ['Product information unavailable'];
  }
};

// Extract references from NIST data
const extractReferences = (cve: any): Array<{url: string; name: string; type: 'vendor' | 'patch' | 'advisory' | 'other'}> => {
  try {
    return (cve.references || []).map((ref: any) => ({
      url: ref.url || '#',
      name: ref.name || 'Reference',
      type: determineReferenceType(ref.url || '')
    }));
  } catch {
    return [];
  }
};

// Determine reference type based on URL
const determineReferenceType = (url: string): 'vendor' | 'patch' | 'advisory' | 'other' => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('patch') || lowerUrl.includes('update')) return 'patch';
  if (lowerUrl.includes('advisory') || lowerUrl.includes('security')) return 'advisory';
  if (lowerUrl.includes('vendor') || lowerUrl.includes('microsoft') || lowerUrl.includes('oracle')) return 'vendor';
  return 'other';
};

// Generate recommendations based on CVSS score and vector
const generateRecommendations = (cvssScore: number, vector: string): string[] => {
  const recommendations: string[] = [];
  
  if (cvssScore >= 9.0) {
    recommendations.push('Immediate action required - Critical vulnerability');
    recommendations.push('Apply security patches within 24 hours');
    recommendations.push('Implement emergency security controls');
  } else if (cvssScore >= 7.0) {
    recommendations.push('High priority - Apply patches within 72 hours');
    recommendations.push('Review and update security controls');
    recommendations.push('Monitor for exploitation attempts');
  } else if (cvssScore >= 4.0) {
    recommendations.push('Medium priority - Apply patches within 1 week');
    recommendations.push('Assess business impact');
    recommendations.push('Update security documentation');
  } else {
    recommendations.push('Low priority - Apply patches during next maintenance window');
    recommendations.push('Review security posture');
  }
  
  // Add vector-specific recommendations
  if (vector.includes('AV:N')) {
    recommendations.push('Restrict network access if possible');
  }
  if (vector.includes('PR:N')) {
    recommendations.push('Implement authentication controls');
  }
  
  return recommendations;
};

// Safe NIST data fetching with comprehensive error handling
export const fetchEnhancedNISTData = async (): Promise<NISTVulnerability[]> => {
  try {
    console.log('🔄 Fetching enhanced NIST CVE intelligence...');
    
    // Create abort controller with 10-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    // Fetch recent CVEs from NIST
    const response = await fetch(`${NIST_API_ENDPOINT}?resultsPerPage=20&startIndex=0`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'N-Total-Cybersecurity-NIST-Integration/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`NIST API responded with status: ${response.status}`);
    }
    
    const nistData = await response.json();
    const transformedData = transformNISTData(nistData);
    
    console.log(`✅ Successfully fetched ${transformedData.length} enhanced NIST vulnerabilities`);
    return transformedData;
    
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('⏰ NIST API request timed out, using enhanced fallback data');
    } else {
      console.warn('⚠️ Failed to fetch NIST data:', error);
    }
    
    console.log('🔄 Using enhanced NIST fallback data to ensure website stability');
    return ENHANCED_FALLBACK_DATA;
  }
};

// Get enhanced vulnerability statistics
export const getEnhancedNISTStats = (vulnerabilities: NISTVulnerability[]) => {
  return {
    critical: vulnerabilities.filter(v => v.severity === 'critical').length,
    high: vulnerabilities.filter(v => v.severity === 'high').length,
    medium: vulnerabilities.filter(v => v.severity === 'medium').length,
    low: vulnerabilities.filter(v => v.severity === 'low').length,
    total: vulnerabilities.length,
    averageCVSS: vulnerabilities.reduce((sum, v) => sum + v.cvssScore, 0) / vulnerabilities.length,
    highImpactCount: vulnerabilities.filter(v => 
      v.impactMetrics.confidentiality === 'high' || 
      v.impactMetrics.integrity === 'high' || 
      v.impactMetrics.availability === 'high'
    ).length
  };
};

// Get vulnerabilities by CVSS score range
export const getVulnerabilitiesByCVSSRange = (vulnerabilities: NISTVulnerability[]) => {
  return {
    critical: vulnerabilities.filter(v => v.cvssScore >= 9.0),
    high: vulnerabilities.filter(v => v.cvssScore >= 7.0 && v.cvssScore < 9.0),
    medium: vulnerabilities.filter(v => v.cvssScore >= 4.0 && v.cvssScore < 7.0),
    low: vulnerabilities.filter(v => v.cvssScore < 4.0)
  };
};




