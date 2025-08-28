import { useState, useEffect, useCallback } from 'react';
import { Threat, ThreatFilters, ThreatMetrics } from '@/types/threat';
import { fetchRealThreatIntelligence, getFallbackThreats } from '@/services/threatIntelligenceService';

// Mock threat data generator for development
const generateMockThreats = (): Threat[] => {
  const threatTypes: Threat['category'][] = ['malware', 'phishing', 'ransomware', 'vulnerability', 'breach', 'apt', 'ddos', 'insider'];
  const severities: Threat['severity'][] = ['low', 'medium', 'high', 'critical'];
  const industries = ['Healthcare', 'Finance', 'Manufacturing', 'Government', 'Technology', 'Retail', 'Education', 'Energy'];
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa'];
  const attackVectors = ['Email', 'Web Application', 'Network', 'Social Engineering', 'Supply Chain', 'Insider', 'Physical'];
  const sources = ['CISA', 'FBI', 'NSA', 'MITRE', 'NIST', 'US-CERT', 'Recorded Future', 'ThreatFox'];

  const threatTitles = [
    'New Ransomware Campaign Targeting Healthcare Systems',
    'Critical Zero-Day Vulnerability in Popular Web Framework',
    'APT Group Using Novel Social Engineering Techniques',
    'Supply Chain Attack Compromises Software Updates',
    'Phishing Campaign Impersonating Government Agencies',
    'Insider Threat Steals Sensitive Customer Data',
    'DDoS Attack Disrupts Financial Services',
    'Malware Variant Evades Traditional Detection',
    'Critical Infrastructure Targeted by State Actors',
    'New Attack Vector Exploits IoT Devices'
  ];

  try {
    return Array.from({ length: 25 }, (_, i) => {
      const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)] || 'malware';
      const severity = severities[Math.floor(Math.random() * severities.length)] || 'medium';
      const timestamp = new Date(Date.now() - Math.random() * 86400000 * 7); // Last 7 days
      
      return {
        id: `threat-${Date.now()}-${i}`,
        title: threatTitles[Math.floor(Math.random() * threatTitles.length)] || 'Unknown Threat',
        description: `This is a sample ${threatType} threat with ${severity} severity level. It affects multiple industries and requires immediate attention from security teams.`,
        severity,
        category: threatType,
        cveId: Math.random() > 0.7 ? `CVE-2024-${Math.floor(Math.random() * 9999)}` : undefined,
        attackVector: attackVectors[Math.floor(Math.random() * attackVectors.length)] || 'Unknown',
        ioc: Math.random() > 0.5 ? [`192.168.1.${Math.floor(Math.random() * 255)}`, `malware-${Math.random().toString(36).substr(2, 8)}.exe`] : undefined,
        affectedSoftware: Math.random() > 0.6 ? ['Windows 10/11', 'Office 365', 'Chrome Browser'] : undefined,
        affectedIndustries: industries.slice(0, Math.max(1, Math.floor(Math.random() * 4) + 1)),
        affectedRegions: regions.slice(0, Math.max(1, Math.floor(Math.random() * 3) + 1)),
        businessImpact: (severity === 'critical' ? 'critical' : severity === 'high' ? 'high' : severity === 'medium' ? 'medium' : 'low') as Threat['businessImpact'],
        source: sources[Math.floor(Math.random() * sources.length)] || 'Unknown Source',
        timestamp,
        lastUpdated: new Date(timestamp.getTime() + Math.random() * 3600000),
        verified: Math.random() > 0.3,
        mitigationSteps: [
          'Update all affected software to latest versions',
          'Implement additional network segmentation',
          'Enable multi-factor authentication',
          'Conduct security awareness training',
          'Monitor network traffic for suspicious activity'
        ],
        patches: Math.random() > 0.5 ? ['Security Update KB123456', 'Patch Tuesday Release'] : undefined,
        references: [
          'https://cisa.gov/cybersecurity-advisories',
          'https://nvd.nist.gov/vuln/detail',
          'https://attack.mitre.org/techniques/'
        ]
      };
    });
  } catch (error) {
    console.error('Error generating mock threats:', error);
    return [];
  }
};

export const useThreatFeed = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [filteredThreats, setFilteredThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [filters, setFilters] = useState<ThreatFilters>({
    severities: [],
    categories: [],
    industries: [],
    regions: [],
    timeRange: '24h',
    verifiedOnly: false
  });

  // Fetch threats function
  const fetchThreats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch real threat intelligence from multiple sources with timeout
      console.log('Attempting to fetch real threat intelligence...');
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 15000) // 15 second timeout
      );
      
      const realThreats = await Promise.race([
        fetchRealThreatIntelligence(),
        timeoutPromise
      ]);
      
      setThreats(realThreats);
      setLastUpdate(new Date());
      console.log('Successfully fetched real threats:', realThreats.length);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch threat data';
      setError(errorMessage);
      console.error('Error fetching threats:', err);
      
      // Fallback to immediate fallback data
      console.log('Falling back to fallback threats...');
      const fallbackThreats = getFallbackThreats();
      setThreats(fallbackThreats);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters to threats
  const applyFilters = useCallback((threatList: Threat[], currentFilters: ThreatFilters) => {
    let filtered = [...threatList];

    // Filter by severity
    if (currentFilters.severities.length > 0) {
      filtered = filtered.filter(threat => currentFilters.severities.includes(threat.severity));
    }

    // Filter by category
    if (currentFilters.categories.length > 0) {
      filtered = filtered.filter(threat => currentFilters.categories.includes(threat.category));
    }

    // Filter by industry
    if (currentFilters.industries.length > 0) {
      filtered = filtered.filter(threat => 
        threat.affectedIndustries.some(industry => currentFilters.industries.includes(industry))
      );
    }

    // Filter by region
    if (currentFilters.regions.length > 0) {
      filtered = filtered.filter(threat => 
        threat.affectedRegions.some(region => currentFilters.regions.includes(region))
      );
    }

    // Filter by verification status
    if (currentFilters.verifiedOnly) {
      filtered = filtered.filter(threat => threat.verified);
    }

    // Filter by time range
    const now = new Date();
    const timeRanges = {
      '1h': 60 * 60 * 1000,
      '6h': 6 * 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };

    if (currentFilters.timeRange !== 'custom' && currentFilters.timeRange in timeRanges) {
      const cutoffTime = now.getTime() - timeRanges[currentFilters.timeRange as keyof typeof timeRanges];
      filtered = filtered.filter(threat => threat.timestamp.getTime() > cutoffTime);
    } else if (currentFilters.timeRange === 'custom' && currentFilters.customStartDate && currentFilters.customEndDate) {
      filtered = filtered.filter(threat => 
        threat.timestamp >= currentFilters.customStartDate! && 
        threat.timestamp <= currentFilters.customEndDate!
      );
    }

    return filtered;
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ThreatFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Apply new filters immediately
    const filtered = applyFilters(threats, updatedFilters);
    setFilteredThreats(filtered);
  }, [filters, threats, applyFilters]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    const defaultFilters: ThreatFilters = {
      severities: [],
      categories: [],
      industries: [],
      regions: [],
      timeRange: '24h',
      verifiedOnly: false
    };
    setFilters(defaultFilters);
    setFilteredThreats(threats);
  }, [threats]);

  // Get threat metrics
  const getMetrics = useCallback((): ThreatMetrics => {
    const totalThreats = threats.length;
    const criticalThreats = threats.filter(t => t.severity === 'critical').length;
    const highThreats = threats.filter(t => t.severity === 'high').length;
    const mediumThreats = threats.filter(t => t.severity === 'medium').length;
    const lowThreats = threats.filter(t => t.severity === 'low').length;

    const threatsByCategory = threats.reduce((acc, threat) => {
      acc[threat.category] = (acc[threat.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const threatsByIndustry = threats.reduce((acc, threat) => {
      threat.affectedIndustries.forEach(industry => {
        acc[industry] = (acc[industry] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const threatsByRegion = threats.reduce((acc, threat) => {
      threat.affectedRegions.forEach(region => {
        acc[region] = (acc[region] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return {
      totalThreats,
      criticalThreats,
      highThreats,
      mediumThreats,
      lowThreats,
      threatsByCategory,
      threatsByIndustry,
      threatsByRegion,
      lastUpdate
    };
  }, [threats, lastUpdate]);

  // Initial data fetch
  useEffect(() => {
    fetchThreats();
  }, [fetchThreats]);

  // Apply filters when threats change
  useEffect(() => {
    const filtered = applyFilters(threats, filters);
    setFilteredThreats(filtered);
  }, [threats, filters, applyFilters]);

  // Set up real-time updates (every 15 minutes for real threat intelligence)
  useEffect(() => {
    const interval = setInterval(() => {
      // Refresh threat data from real sources
      fetchThreats();
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearInterval(interval);
  }, [fetchThreats]);

  return {
    // Data
    threats: filteredThreats,
    allThreats: threats,
    loading,
    error,
    lastUpdate,
    
    // Filters
    filters,
    updateFilters,
    clearFilters,
    
    // Actions
    fetchThreats,
    refresh: fetchThreats,
    
    // Analytics
    metrics: getMetrics(),
    
    // Utilities
    totalCount: threats.length,
    filteredCount: filteredThreats.length
  };
};
