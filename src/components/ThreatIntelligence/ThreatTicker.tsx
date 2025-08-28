import React from 'react';
import { AlertTriangle, Shield, Zap, Lock, Eye, Users, Server, Network } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Threat } from '@/types/threat';

interface ThreatTickerProps {
  threats: Threat[];
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
    critical: 'bg-red-600 text-white',
    high: 'bg-orange-600 text-white',
    medium: 'bg-yellow-600 text-white',
    low: 'bg-blue-600 text-white'
  };
  return colors[severity];
};

export const ThreatTicker: React.FC<ThreatTickerProps> = ({ threats, className = "" }) => {
  const criticalThreats = threats.filter(t => t.severity === 'critical');
  const highThreats = threats.filter(t => t.severity === 'high');
  
  if (threats.length === 0) {
    return null;
  }

  // Dynamic color based on highest severity threat
  const getTickerColor = () => {
    if (criticalThreats.length > 0) {
      return 'from-red-600 via-red-500 to-red-600'; // Critical - Red
    } else if (highThreats.length > 0) {
      return 'from-orange-600 via-orange-500 to-orange-600'; // High - Orange
    } else {
      return 'from-yellow-600 via-yellow-500 to-yellow-600'; // Medium/Low - Yellow
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getTickerColor()} text-white py-2 px-4 overflow-hidden ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Live Indicator */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-semibold text-sm">LIVE THREATS</span>
        </div>
        
        {/* Threat Counts */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {criticalThreats.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {criticalThreats.length} CRITICAL
            </Badge>
          )}
          {highThreats.length > 0 && (
            <Badge className="bg-orange-600 text-white">
              {highThreats.length} HIGH
            </Badge>
          )}
        </div>
        
        {/* Scrolling Threat Feed */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll-left whitespace-nowrap">
            {threats.slice(0, 10).map((threat, index) => (
              <span key={threat.id} className="inline-block mx-8">
                <span className="inline-flex items-center space-x-2">
                  {getThreatIcon(threat.category)}
                  <span className="font-medium">
                    {threat.title.length > 60 
                      ? threat.title.substring(0, 60) + '...' 
                      : threat.title
                    }
                  </span>
                  <Badge className={`text-xs ${getSeverityColor(threat.severity)}`}>
                    {threat.severity.toUpperCase()}
                  </Badge>
                  <span className="text-red-100">
                    | {threat.affectedIndustries.slice(0, 2).join(', ')}
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>
        
        {/* Last Update */}
        <div className="flex-shrink-0 text-xs text-red-100">
          Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
