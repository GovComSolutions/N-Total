import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, TrendingUp, Globe, Clock, RefreshCw, ExternalLink, BarChart3, Target, Zap, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchSafeCISAData, getCISAThreatStats, CISAThreat } from '@/services/safeCisaService';
import { fetchEnhancedNISTData, getEnhancedNISTStats, NISTVulnerability, getVulnerabilitiesByCVSSRange } from '@/services/enhancedNistService';

// Enhanced threat intelligence data combining CISA and NIST
interface EnhancedThreatData {
  cisaThreats: CISAThreat[];
  nistVulnerabilities: NISTVulnerability[];
  combinedStats: {
    totalThreats: number;
    criticalThreats: number;
    highThreats: number;
    mediumThreats: number;
    lowThreats: number;
    averageCVSS: number;
    highImpactCount: number;
    lastUpdate: string;
  };
  isLoading: boolean;
  isRealData: boolean;
}

// Enhanced threat dashboard component
export const EnhancedThreatDashboard: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [threatData, setThreatData] = useState<EnhancedThreatData>({
    cisaThreats: [],
    nistVulnerabilities: [],
    combinedStats: {
      totalThreats: 0,
      criticalThreats: 0,
      highThreats: 0,
      mediumThreats: 0,
      lowThreats: 0,
      averageCVSS: 0,
      highImpactCount: 0,
      lastUpdate: 'Loading...'
    },
    isLoading: true,
    isRealData: false
  });

  // Load both CISA and NIST data
  useEffect(() => {
    const loadEnhancedData = async () => {
      try {
        setThreatData(prev => ({ ...prev, isLoading: true }));
        
        // Fetch data from both sources concurrently
        const [cisaThreats, nistVulnerabilities] = await Promise.all([
          fetchSafeCISAData(),
          fetchEnhancedNISTData()
        ]);
        
        // Calculate combined statistics
        const cisaStats = getCISAThreatStats(cisaThreats);
        const nistStats = getEnhancedNISTStats(nistVulnerabilities);
        
        const combinedStats = {
          totalThreats: cisaStats.total + nistStats.total,
          criticalThreats: cisaStats.critical + nistStats.critical,
          highThreats: cisaStats.high + nistStats.high,
          mediumThreats: cisaStats.medium + nistStats.medium,
          lowThreats: cisaStats.low + nistStats.low,
          averageCVSS: nistStats.averageCVSS,
          highImpactCount: nistStats.highImpactCount,
          lastUpdate: new Date().toLocaleString()
        };
        
        setThreatData({
          cisaThreats,
          nistVulnerabilities,
          combinedStats,
          isLoading: false,
          isRealData: true
        });
        
      } catch (error) {
        console.warn('Failed to load enhanced data, using fallbacks');
        setThreatData(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadEnhancedData();
  }, []);

  // Refresh data function
  const refreshData = async () => {
    await loadEnhancedData();
  };

  const loadEnhancedData = async () => {
    try {
      setThreatData(prev => ({ ...prev, isLoading: true }));
      
      const [cisaThreats, nistVulnerabilities] = await Promise.all([
        fetchSafeCISAData(),
        fetchEnhancedNISTData()
      ]);
      
      const cisaStats = getCISAThreatStats(cisaThreats);
      const nistStats = getEnhancedNISTStats(nistVulnerabilities);
      
      const combinedStats = {
        totalThreats: cisaStats.total + nistStats.total,
        criticalThreats: cisaStats.critical + nistStats.critical,
        highThreats: cisaStats.high + nistStats.high,
        mediumThreats: cisaStats.medium + nistStats.medium,
        lowThreats: cisaStats.low + nistStats.low,
        averageCVSS: nistStats.averageCVSS,
        highImpactCount: nistStats.highImpactCount,
        lastUpdate: new Date().toLocaleString()
      };
      
      setThreatData({
        cisaThreats,
        nistVulnerabilities,
        combinedStats,
        isLoading: false,
        isRealData: true
      });
      
    } catch (error) {
      console.warn('Failed to refresh enhanced data');
      setThreatData(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Get CVSS color based on score
  const getCVSSColor = (score: number) => {
    if (score >= 9.0) return 'text-red-600';
    if (score >= 7.0) return 'text-orange-600';
    if (score >= 4.0) return 'text-yellow-600';
    return 'text-blue-600';
  };

  // Get CVSS severity label
  const getCVSSSeverity = (score: number) => {
    if (score >= 9.0) return 'Critical';
    if (score >= 7.0) return 'High';
    if (score >= 4.0) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-cyber-blue mb-2">
          Enhanced Threat Intelligence Dashboard
        </h3>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Comprehensive cybersecurity threat monitoring combining CISA alerts and NIST CVE intelligence
        </p>
        {threatData.isRealData && (
          <div className="mt-4 flex justify-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              ✅ LIVE CISA DATA
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              🔍 LIVE NIST CVE DATA
            </Badge>
          </div>
        )}
      </div>

      {/* Enhanced Threat Metrics */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-600">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {threatData.isLoading ? '...' : threatData.combinedStats.criticalThreats}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-600">High</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {threatData.isLoading ? '...' : threatData.combinedStats.highThreats}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-600">Medium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {threatData.isLoading ? '...' : threatData.combinedStats.mediumThreats}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-600">Low</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {threatData.isLoading ? '...' : threatData.combinedStats.lowThreats}
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-600">Avg CVSS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getCVSSColor(threatData.combinedStats.averageCVSS)}`}>
              {threatData.isLoading ? '...' : threatData.combinedStats.averageCVSS.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center mb-6">
        <Button 
          onClick={refreshData} 
          disabled={threatData.isLoading}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${threatData.isLoading ? 'animate-spin' : ''}`} />
          <span>{threatData.isLoading ? 'Refreshing...' : 'Refresh Intelligence Data'}</span>
        </Button>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="cisa" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>CISA Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="nist" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>NIST CVEs</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* CISA Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-cyber-blue" />
                  <span>CISA Threat Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Alerts:</span>
                    <span className="font-semibold">{threatData.cisaThreats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Critical:</span>
                    <span className="font-semibold text-red-600">
                      {threatData.cisaThreats.filter(t => t.severity === 'critical').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>High:</span>
                    <span className="font-semibold text-orange-600">
                      {threatData.cisaThreats.filter(t => t.severity === 'high').length}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Government-issued cybersecurity alerts and advisories
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NIST Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>NIST CVE Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total CVEs:</span>
                    <span className="font-semibold">{threatData.nistVulnerabilities.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average CVSS:</span>
                    <span className={`font-semibold ${getCVSSColor(threatData.combinedStats.averageCVSS)}`}>
                      {threatData.combinedStats.averageCVSS.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>High Impact:</span>
                    <span className="font-semibold text-orange-600">
                      {threatData.combinedStats.highImpactCount}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    National vulnerability database with CVSS scoring
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* CISA Alerts Tab */}
        <TabsContent value="cisa" className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center">
            <Shield className="w-5 h-5 mr-2 text-cyber-blue" />
            CISA Cybersecurity Alerts
            <Badge variant="secondary" className="ml-2 text-xs">Government Intelligence</Badge>
          </h4>
          
          {threatData.isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin text-cyber-blue mx-auto mb-2" />
              <p className="text-muted-foreground">Loading CISA threat intelligence...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {threatData.cisaThreats.map((threat) => (
                <Card 
                  key={threat.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedThreat === threat.id ? 'ring-2 ring-cyber-blue' : ''
                  }`}
                  onClick={() => setSelectedThreat(selectedThreat === threat.id ? null : threat.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge 
                            variant={threat.severity === 'critical' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {threat.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {threat.category}
                          </Badge>
                          {threat.cveId && (
                            <Badge variant="outline" className="text-xs font-mono">
                              {threat.cveId}
                            </Badge>
                          )}
                        </div>
                        <h5 className="font-medium mb-1">{threat.title}</h5>
                        <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                        
                        {/* Enhanced threat details */}
                        {selectedThreat === threat.id && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg space-y-2">
                            {threat.affectedProducts && (
                              <div className="text-xs">
                                <strong>Affected Products:</strong> {threat.affectedProducts.join(', ')}
                              </div>
                            )}
                            {threat.recommendations && (
                              <div className="text-xs">
                                <strong>Recommendations:</strong>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  {threat.recommendations.map((rec, idx) => (
                                    <li key={idx}>{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center">
                            <Globe className="w-3 h-3 mr-1" />
                            {threat.source}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {threat.timestamp}
                          </span>
                          {threat.cveId && (
                            <a 
                              href={`https://nvd.nist.gov/vuln/detail/${threat.cveId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center hover:text-cyber-blue transition-colors"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View CVE
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* NIST CVEs Tab */}
        <TabsContent value="nist" className="space-y-4">
          <h4 className="text-lg font-semibold flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            NIST CVE Database
            <Badge variant="secondary" className="ml-2 text-xs">CVSS Scoring</Badge>
          </h4>
          
          {threatData.isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-muted-foreground">Loading NIST vulnerability data...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {threatData.nistVulnerabilities.map((vuln) => (
                <Card 
                  key={vuln.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedThreat === vuln.id ? 'ring-2 ring-blue-600' : ''
                  }`}
                  onClick={() => setSelectedThreat(selectedThreat === vuln.id ? null : vuln.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge 
                            variant={vuln.severity === 'critical' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {vuln.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            CVSS {vuln.cvssScore.toFixed(1)}
                          </Badge>
                          <Badge variant="outline" className="text-xs font-mono">
                            {vuln.cveId}
                          </Badge>
                        </div>
                        <h5 className="font-medium mb-1">{vuln.title}</h5>
                        <p className="text-sm text-muted-foreground mb-2">{vuln.description}</p>
                        
                        {/* Enhanced vulnerability details */}
                        {selectedThreat === vuln.id && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg space-y-3">
                            {/* CVSS Details */}
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <strong>Confidentiality:</strong>
                                <Badge variant="outline" className="ml-1 text-xs">
                                  {vuln.impactMetrics.confidentiality}
                                </Badge>
                              </div>
                              <div>
                                <strong>Integrity:</strong>
                                <Badge variant="outline" className="ml-1 text-xs">
                                  {vuln.impactMetrics.integrity}
                                </Badge>
                              </div>
                              <div>
                                <strong>Availability:</strong>
                                <Badge variant="outline" className="ml-1 text-xs">
                                  {vuln.impactMetrics.availability}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* CVSS Vector */}
                            <div className="text-xs">
                              <strong>CVSS Vector:</strong>
                              <code className="ml-2 p-1 bg-muted rounded text-xs font-mono">
                                {vuln.cvssVector}
                              </code>
                            </div>
                            
                            {/* Affected Products */}
                            {vuln.affectedProducts && (
                              <div className="text-xs">
                                <strong>Affected Products:</strong> {vuln.affectedProducts.join(', ')}
                              </div>
                            )}
                            
                            {/* Recommendations */}
                            {vuln.recommendations && (
                              <div className="text-xs">
                                <strong>Recommendations:</strong>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                  {vuln.recommendations.map((rec, idx) => (
                                    <li key={idx}>{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {/* References */}
                            {vuln.references && vuln.references.length > 0 && (
                              <div className="text-xs">
                                <strong>References:</strong>
                                <div className="mt-1 space-y-1">
                                  {vuln.references.map((ref, idx) => (
                                    <a 
                                      key={idx}
                                      href={ref.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-blue-600 hover:underline"
                                    >
                                      {ref.name} ({ref.type})
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center">
                            <Target className="w-3 h-3 mr-1" />
                            {vuln.source}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(vuln.publishedDate).toLocaleDateString()}
                          </span>
                          <a 
                            href={`https://nvd.nist.gov/vuln/detail/${vuln.cveId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-blue-600 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View on NIST
                          </a>
                        </div>
                      </div>
                </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <h4 className="text-lg font-semibold flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Threat Intelligence Analytics
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* CVSS Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>CVSS Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getVulnerabilitiesByCVSSRange(threatData.nistVulnerabilities).critical.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-red-600">Critical (9.0+)</span>
                      <span className="font-semibold">
                        {getVulnerabilitiesByCVSSRange(threatData.nistVulnerabilities).critical.length}
                      </span>
                    </div>
                  )}
                  {getVulnerabilitiesByCVSSRange(threatData.nistVulnerabilities).high.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-orange-600">High (7.0-8.9)</span>
                      <span className="font-semibold">
                        {getVulnerabilitiesByCVSSRange(threatData.nistVulnerabilities).high.length}
                      </span>
                    </div>
                  )}
                  {getVulnerabilitiesByCVSSRange(threatData.nistVulnerabilities).medium.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-600">Medium (4.0-6.9)</span>
                      <span className="font-semibold">
                        {getVulnerabilitiesByCVSSRange(threatData.nistVulnerabilities).medium.length}
                      </span>
                    </div>
                  )}
                  {getVulnerabilitiesByCVSSRange(threatData.nistVulnerabilities).low.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600">Low (0.1-3.9)</span>
                      <span className="font-semibold">
                        {getVulnerabilitiesByCVSSRange(threatData.nistVulnerabilities).low.length}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Impact Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>High Impact Vulnerabilities</span>
                    <span className="font-semibold text-orange-600">
                      {threatData.combinedStats.highImpactCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average CVSS Score</span>
                    <span className={`font-semibold ${getCVSSColor(threatData.combinedStats.averageCVSS)}`}>
                      {threatData.combinedStats.averageCVSS.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Intelligence Items</span>
                    <span className="font-semibold">
                      {threatData.combinedStats.totalThreats}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Status Footer */}
      <div className="text-center pt-6 border-t">
        <p className="text-sm text-muted-foreground">
          <strong>System Status:</strong> {threatData.isRealData ? 'Enhanced Live Intelligence' : 'Fallback Mode'} | 
          <strong>Last Update:</strong> {threatData.combinedStats.lastUpdate} | 
          <strong>Total Intelligence Items:</strong> {threatData.combinedStats.totalThreats}
          {threatData.isRealData && (
            <span className="ml-2 text-green-600">✅ Multi-Source Real-time</span>
          )}
        </p>
      </div>
    </div>
  );
};




