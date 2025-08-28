import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, TrendingUp, Globe, Clock, RefreshCw, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchSafeCISAData, getCISAThreatStats, CISAThreat } from '@/services/safeCisaService';

// Enhanced threat intelligence data with real CISA integration
interface ThreatData {
  criticalThreats: number;
  highThreats: number;
  mediumThreats: number;
  lowThreats: number;
  totalThreats: number;
  lastUpdate: string;
  recentThreats: CISAThreat[];
  isLoading: boolean;
  isRealData: boolean;
}

// Enhanced threat ticker with real CISA data
export const BulletproofThreatTicker: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [threatData, setThreatData] = useState<ThreatData>({
    criticalThreats: 0,
    highThreats: 0,
    mediumThreats: 0,
    lowThreats: 0,
    totalThreats: 0,
    lastUpdate: 'Loading...',
    recentThreats: [],
    isLoading: true,
    isRealData: false
  });

  // Fetch real CISA data on component mount
  useEffect(() => {
    const loadCISAData = async () => {
      try {
        const cisaThreats = await fetchSafeCISAData();
        const stats = getCISAThreatStats(cisaThreats);
        
        setThreatData({
          criticalThreats: stats.critical,
          highThreats: stats.high,
          mediumThreats: stats.medium,
          lowThreats: stats.low,
          totalThreats: stats.total,
          lastUpdate: new Date().toLocaleString(),
          recentThreats: cisaThreats,
          isLoading: false,
          isRealData: true
        });
      } catch (error) {
        console.warn('Failed to load CISA data, using fallback');
        setThreatData(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadCISAData();
  }, []);

  if (!isVisible) return null;

  // Dynamic background color based on threat severity
  const getBackgroundColor = () => {
    if (threatData.criticalThreats > 0) return 'from-red-600 via-red-500 to-red-600';
    if (threatData.highThreats > 0) return 'from-orange-600 via-orange-500 to-orange-600';
    if (threatData.mediumThreats > 0) return 'from-yellow-600 via-yellow-500 to-yellow-600';
    return 'from-blue-600 via-blue-500 to-blue-600';
  };

  return (
    <div className={`bg-gradient-to-r ${getBackgroundColor()} text-white py-2 px-4 overflow-hidden transition-all duration-300`}>
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className="font-semibold">
            {threatData.isRealData ? '🚨 LIVE CISA THREAT INTELLIGENCE' : '🚨 THREAT INTELLIGENCE'}
          </span>
          <span>
            Critical: {threatData.criticalThreats} | High: {threatData.highThreats}
            {threatData.isLoading && <span className="ml-2">🔄</span>}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Last Update: {threatData.lastUpdate}</span>
          {threatData.isRealData && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">LIVE CISA DATA</span>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-6 px-2"
            onClick={() => setIsVisible(false)}
          >
            ×
          </Button>
        </div>
      </div>
    </div>
  );
};

// Enhanced threat feed with real CISA data
export const BulletproofThreatFeed: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [threatData, setThreatData] = useState<ThreatData>({
    criticalThreats: 0,
    highThreats: 0,
    mediumThreats: 0,
    lowThreats: 0,
    totalThreats: 0,
    lastUpdate: 'Loading...',
    recentThreats: [],
    isLoading: true,
    isRealData: false
  });

  // Fetch real CISA data on component mount
  useEffect(() => {
    const loadCISAData = async () => {
      try {
        const cisaThreats = await fetchSafeCISAData();
        const stats = getCISAThreatStats(cisaThreats);
        
        setThreatData({
          criticalThreats: stats.critical,
          highThreats: stats.high,
          mediumThreats: stats.medium,
          lowThreats: stats.low,
          totalThreats: stats.total,
          lastUpdate: new Date().toLocaleString(),
          recentThreats: cisaThreats,
          isLoading: false,
          isRealData: true
        });
      } catch (error) {
        console.warn('Failed to load CISA data, using fallback');
        setThreatData(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadCISAData();
  }, []);

  // Refresh data function
  const refreshData = async () => {
    setThreatData(prev => ({ ...prev, isLoading: true }));
    try {
      const cisaThreats = await fetchSafeCISAData();
      const stats = getCISAThreatStats(cisaThreats);
      
      setThreatData({
        criticalThreats: stats.critical,
        highThreats: stats.high,
        mediumThreats: stats.medium,
        lowThreats: stats.low,
        totalThreats: stats.total,
        lastUpdate: new Date().toLocaleString(),
        recentThreats: cisaThreats,
        isLoading: false,
        isRealData: true
      });
    } catch (error) {
      console.warn('Failed to refresh CISA data');
      setThreatData(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-cyber-blue mb-2">
          Live Threat Intelligence Dashboard
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real-time cybersecurity threat monitoring and analysis system
        </p>
        {threatData.isRealData && (
          <div className="mt-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              ✅ LIVE CISA DATA
            </Badge>
          </div>
        )}
      </div>

      {/* Threat Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-600">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {threatData.isLoading ? '...' : threatData.criticalThreats}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-600">High</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {threatData.isLoading ? '...' : threatData.highThreats}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-600">Medium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {threatData.isLoading ? '...' : threatData.mediumThreats}
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-600">Low</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {threatData.isLoading ? '...' : threatData.lowThreats}
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
          <span>{threatData.isLoading ? 'Refreshing...' : 'Refresh Data'}</span>
        </Button>
      </div>

      {/* Recent Threats */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-cyber-blue" />
          Recent Threats
          {threatData.isRealData && (
            <Badge variant="secondary" className="ml-2 text-xs">CISA Live Data</Badge>
          )}
        </h4>
        
        {threatData.isLoading ? (
          <div className="text-center py-8">
            <RefreshCw className="w-8 h-8 animate-spin text-cyber-blue mx-auto mb-2" />
            <p className="text-muted-foreground">Loading real threat intelligence...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {threatData.recentThreats.map((threat) => (
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
      </div>

      {/* Status Footer */}
      <div className="text-center pt-6 border-t">
        <p className="text-sm text-muted-foreground">
          <strong>System Status:</strong> {threatData.isRealData ? 'Live CISA Data' : 'Fallback Mode'} | 
          <strong>Last Update:</strong> {threatData.lastUpdate} | 
          <strong>Total Threats:</strong> {threatData.totalThreats}
          {threatData.isRealData && (
            <span className="ml-2 text-green-600">✅ Real-time</span>
          )}
        </p>
      </div>
    </div>
  );
};
