export interface Threat {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 
    | 'malware' 
    | 'phishing' 
    | 'ransomware' 
    | 'vulnerability' 
    | 'breach' 
    | 'apt' 
    | 'ddos' 
    | 'insider';
  
  // Technical Details
  cveId?: string;                    // Common Vulnerabilities and Exposures
  attackVector: string;              // How the attack is carried out
  ioc?: string[];                    // Indicators of Compromise
  affectedSoftware?: string[];       // Software versions affected
  
  // Business Impact
  affectedIndustries: string[];      // Industries at risk
  affectedRegions: string[];         // Geographic areas affected
  businessImpact: 'low' | 'medium' | 'high' | 'critical';
  
  // Metadata
  source: string;                    // Where the threat was discovered
  timestamp: Date;                   // When discovered
  lastUpdated: Date;                 // Last update time
  verified: boolean;                 // Whether threat is confirmed
  
  // Mitigation
  mitigationSteps?: string[];        // How to protect against
  patches?: string[];                // Available patches/fixes
  references?: string[];             // Additional resources
}

export interface ThreatFilters {
  severities: Threat['severity'][];
  categories: Threat['category'][];
  industries: string[];
  regions: string[];
  timeRange: '1h' | '6h' | '24h' | '7d' | '30d' | 'custom';
  customStartDate?: Date;
  customEndDate?: Date;
  verifiedOnly: boolean;
}

export interface ThreatMetrics {
  totalThreats: number;
  criticalThreats: number;
  highThreats: number;
  mediumThreats: number;
  lowThreats: number;
  threatsByCategory: Record<string, number>;
  threatsByIndustry: Record<string, number>;
  threatsByRegion: Record<string, number>;
  lastUpdate: Date;
}

