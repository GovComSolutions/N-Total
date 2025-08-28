import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  AlertTriangle, 
  Shield, 
  Zap, 
  Lock, 
  Eye, 
  Users, 
  Server, 
  Network,
  Clock,
  MapPin,
  Building2,
  ExternalLink,
  Copy,
  Bell,
  Download
} from 'lucide-react';
import { Threat } from '@/types/threat';

interface ThreatAlertProps {
  threat: Threat;
  className?: string;
}

const getThreatIcon = (category: Threat['category']) => {
  const icons = {
    malware: <Zap className="w-4 h-4" />,
    phishing: <Eye className="w-4 h-4" />,
    ransomware: <Lock className="w-4 h-4" />,
    vulnerability: <Shield className="w-4 h-4" />,
    breach: <Server className="w-4 h-4" />,
    apt: <Network className="w-4 h-4" />,
    ddos: <Users className="w-4 h-4" />,
    insider: <AlertTriangle className="w-4 h-4" />
  };
  return icons[category] || icons.malware;
};

const getSeverityColor = (severity: Threat['severity']) => {
  const colors = {
    critical: 'border-red-500 bg-red-50 dark:bg-red-950/20',
    high: 'border-orange-500 bg-orange-50 dark:bg-orange-950/20',
    medium: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20',
    low: 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
  };
  return colors[severity];
};

const getSeverityBadgeVariant = (severity: Threat['severity']) => {
  const variants = {
    critical: 'destructive',
    high: 'default',
    medium: 'secondary',
    low: 'outline'
  } as const;
  return variants[severity];
};

const formatDistanceToNow = (date: Date) => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return `${diffInDays}d ago`;
  }
};

export const ThreatAlert: React.FC<ThreatAlertProps> = ({ threat, className = "" }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <>
      <Card className={`border-l-4 ${getSeverityColor(threat.severity)} hover:shadow-lg transition-shadow duration-200 ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyber-blue/10 rounded-lg">
                {getThreatIcon(threat.category)}
              </div>
              <Badge variant={getSeverityBadgeVariant(threat.severity)}>
                {threat.severity.toUpperCase()}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {threat.category}
              </Badge>
              {threat.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  Verified
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{formatDistanceToNow(threat.timestamp)}</span>
            </div>
          </div>
          
          <CardTitle className="text-lg text-foreground leading-tight">
            {threat.title}
          </CardTitle>
          
          <CardDescription className="text-muted-foreground line-clamp-2">
            {threat.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Affected Industries & Regions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2 flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>Affected Industries</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {threat.affectedIndustries.map((industry) => (
                  <Badge key={industry} variant="outline" className="text-xs">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium mb-2 flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Affected Regions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {threat.affectedRegions.map((region) => (
                  <Badge key={region} variant="outline" className="text-xs">
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Technical Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
          
          {/* Source */}
          <div className="text-sm">
            <span className="font-medium">Source:</span>
            <div className="text-muted-foreground">{threat.source}</div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-cyber-blue">
                    {threat.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 text-left">
                  {/* Full Description */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Description</h3>
                    <p className="text-muted-foreground">{threat.description}</p>
                  </div>
                  
                  {/* Technical Details */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Technical Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Attack Vector:</span>
                        <div className="text-muted-foreground">{threat.attackVector}</div>
                      </div>
                      <div>
                        <span className="font-medium">Business Impact:</span>
                        <div className="text-muted-foreground capitalize">{threat.businessImpact}</div>
                      </div>
                      {threat.cveId && (
                        <div>
                          <span className="font-medium">CVE ID:</span>
                          <div className="text-muted-foreground">{threat.cveId}</div>
                        </div>
                      )}
                      {threat.affectedSoftware && (
                        <div>
                          <span className="font-medium">Affected Software:</span>
                          <div className="text-muted-foreground">
                            {threat.affectedSoftware.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Indicators of Compromise */}
                  {threat.ioc && threat.ioc.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Indicators of Compromise (IOC)</h3>
                      <div className="space-y-2">
                        {threat.ioc.map((indicator, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <code className="text-sm bg-muted p-2 rounded flex-1">
                              {indicator}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(indicator)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Mitigation Steps */}
                  {threat.mitigationSteps && threat.mitigationSteps.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Mitigation Steps</h3>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        {threat.mitigationSteps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                  
                  {/* Patches */}
                  {threat.patches && threat.patches.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Available Patches</h3>
                      <div className="space-y-2">
                        {threat.patches.map((patch, index) => (
                          <div key={index} className="text-muted-foreground">
                            • {patch}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* References */}
                  {threat.references && threat.references.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Additional References</h3>
                      <div className="space-y-2">
                        {threat.references.map((reference, index) => (
                          <a
                            key={index}
                            href={reference}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-cyber-blue hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>{reference}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            
            <Button size="sm" variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Mitigation
            </Button>
            
            <Button size="sm" variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              Set Alert
            </Button>
            
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
