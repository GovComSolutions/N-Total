import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  AlertTriangle, 
  Shield, 
  Zap, 
  Clock, 
  RefreshCw,
  Eye,
  TrendingUp,
  MapPin,
  Building2,
  Server,
  ExternalLink,
  Copy,
  Download
} from 'lucide-react';
import { useThreatFeed } from '@/hooks/useThreatFeed';
import { LoadingSpinner } from '../LoadingSpinner';

interface SimpleThreatFeedProps {
  className?: string;
}

export const SimpleThreatFeed: React.FC<SimpleThreatFeedProps> = ({ className = "" }) => {
  const { 
    threats, 
    loading, 
    error, 
    lastUpdate, 
    refresh,
    metrics
  } = useThreatFeed();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner text="Loading threat intelligence..." variant="cyber" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Error Loading Threats</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={refresh} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-cyber-blue">
            Threat Intelligence Feed
          </h2>
          <p className="text-muted-foreground">
            Real-time cybersecurity threats and alerts from trusted sources worldwide
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button onClick={refresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-red-600">{metrics.criticalThreats}</div>
                <div className="text-sm text-muted-foreground">Critical</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{metrics.highThreats}</div>
                <div className="text-sm text-muted-foreground">High</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{metrics.mediumThreats}</div>
                <div className="text-sm text-muted-foreground">Medium</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-cyber-blue" />
              <div>
                <div className="text-2xl font-bold text-cyber-blue">{metrics.totalThreats}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Threats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Recent Threats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {threats.slice(0, 5).map((threat) => (
              <Dialog key={threat.id}>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Badge variant={threat.severity === 'critical' ? 'destructive' : 'secondary'}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                      <div>
                        <div className="font-medium">{threat.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {threat.affectedIndustries.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(threat.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-cyber-blue">
                      {threat.title}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 text-left">
                    {/* Threat Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Threat Details</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant={threat.severity === 'critical' ? 'destructive' : 'secondary'}>
                              {threat.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">{threat.category}</Badge>
                          </div>
                          <p className="text-muted-foreground">{threat.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Business Impact</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Industries: {threat.affectedIndustries.join(', ')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Regions: {threat.affectedRegions.join(', ')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Server className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Impact: {threat.businessImpact}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technical Details */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Technical Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">Attack Vector:</span>
                          <div className="text-muted-foreground">{threat.attackVector}</div>
                        </div>
                        {threat.cveId && (
                          <div>
                            <span className="font-medium">CVE ID:</span>
                            <div className="text-muted-foreground flex items-center space-x-2">
                              <code className="text-xs bg-muted p-1 rounded">
                                {threat.cveId}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(threat.cveId!)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mitigation Steps */}
                    {threat.mitigationSteps && threat.mitigationSteps.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Recommended Actions</h3>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                          {threat.mitigationSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Source & References */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Source Information</h3>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Source:</span>
                          <div className="text-muted-foreground">{threat.source}</div>
                        </div>
                        {threat.references && threat.references.length > 0 && (
                          <div>
                            <span className="font-medium">References:</span>
                            <div className="space-y-1">
                              {threat.references.map((reference, index) => (
                                <a
                                  key={index}
                                  href={reference}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 text-cyber-blue hover:underline text-sm"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>{reference}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Set Alert
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Threat Intelligence Feed Active</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdate.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
