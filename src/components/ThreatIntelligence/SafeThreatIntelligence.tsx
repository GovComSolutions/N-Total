import React, { Suspense, lazy } from 'react';
import { ThreatIntelligenceErrorBoundary } from './ThreatIntelligenceErrorBoundary';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AlertTriangle, Shield, Activity } from 'lucide-react';

// Lazy load threat intelligence components to prevent them from affecting the main app
const ThreatTicker = lazy(() => import('./ThreatTicker').then(module => ({ default: module.ThreatTicker })));
const SimpleThreatFeed = lazy(() => import('./SimpleThreatFeed').then(module => ({ default: module.SimpleThreatFeed })));

// Fallback UI for when threat intelligence fails
const ThreatIntelligenceFallback = () => (
  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 text-center">
    <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
      Threat Intelligence System
    </h3>
    <p className="text-amber-600 dark:text-amber-300 text-sm">
      Our threat intelligence system is currently being upgraded for better security and reliability.
      <br />
      <span className="font-medium">The rest of the website continues to function normally.</span>
    </p>
  </div>
);

// Loading component for threat intelligence
const ThreatIntelligenceLoading = () => (
  <div className="text-center py-8">
    <LoadingSpinner text="Loading threat intelligence..." variant="cyber" />
  </div>
);

// Static fallback content when threat intelligence is not available
const StaticThreatIntelligence = () => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <Shield className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-cyber-blue mb-2">
        Threat Intelligence Dashboard
      </h3>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Our advanced threat intelligence system provides real-time cybersecurity insights, 
        threat analysis, and proactive security recommendations.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-card border rounded-lg p-6 text-center">
        <Activity className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h4 className="text-lg font-semibold mb-2">Live Threat Monitoring</h4>
        <p className="text-sm text-muted-foreground">
          Real-time monitoring of global cybersecurity threats and vulnerabilities
        </p>
      </div>
      
      <div className="bg-card border rounded-lg p-6 text-center">
        <Shield className="w-12 h-12 text-blue-500 mx-auto mb-3" />
        <h4 className="text-lg font-semibold mb-2">Intelligence Analysis</h4>
        <p className="text-sm text-muted-foreground">
          Advanced analysis of threat patterns, attack vectors, and risk assessments
        </p>
      </div>
      
      <div className="bg-card border rounded-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-3" />
        <h4 className="text-lg font-semibold mb-2">Proactive Alerts</h4>
        <p className="text-sm text-muted-foreground">
          Early warning system for emerging threats and security vulnerabilities
        </p>
      </div>
    </div>

    <div className="text-center pt-6">
      <p className="text-sm text-muted-foreground">
        <strong>Status:</strong> System upgrading for enhanced security and reliability
      </p>
    </div>
  </div>
);

interface SafeThreatIntelligenceProps {
  type: 'ticker' | 'feed';
  className?: string;
  threats?: any[];
}

export const SafeThreatIntelligence: React.FC<SafeThreatIntelligenceProps> = ({ 
  type, 
  className = "",
  threats = []
}) => {
  // If no threats data, show static content instead of trying to load components
  if (!threats || threats.length === 0) {
    if (type === 'feed') {
      return (
        <ThreatIntelligenceErrorBoundary fallback={<ThreatIntelligenceFallback />}>
          <StaticThreatIntelligence />
        </ThreatIntelligenceErrorBoundary>
      );
    }
    return null; // Don't show ticker if no threats
  }

  return (
    <ThreatIntelligenceErrorBoundary fallback={<ThreatIntelligenceFallback />}>
      <Suspense fallback={<ThreatIntelligenceLoading />}>
        {type === 'ticker' ? (
          <div className={className}>
            <ThreatTicker threats={threats} />
          </div>
        ) : (
          <SimpleThreatFeed />
        )}
      </Suspense>
    </ThreatIntelligenceErrorBoundary>
  );
};

// Safe threat ticker component
export const SafeThreatTicker: React.FC<{ className?: string; threats?: any[] }> = ({ 
  className = "", 
  threats = [] 
}) => (
  <SafeThreatIntelligence type="ticker" className={className} threats={threats} />
);

// Safe threat feed component
export const SafeThreatFeed: React.FC = () => (
  <SafeThreatIntelligence type="feed" />
);
