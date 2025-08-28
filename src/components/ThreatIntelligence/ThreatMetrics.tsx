import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Shield, 
  Zap, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Globe,
  Building2
} from 'lucide-react';
import { ThreatMetrics } from '@/types/threat';

interface ThreatMetricsProps {
  metrics: ThreatMetrics;
  className?: string;
}

export const ThreatMetrics: React.FC<ThreatMetricsProps> = ({ metrics, className = "" }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <Activity className="w-4 h-4 text-gray-500" />;
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      critical: 'text-red-600',
      high: 'text-orange-600',
      medium: 'text-yellow-600',
      low: 'text-blue-600'
    };
    return colors[severity as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Threats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.totalThreats)}</div>
            <p className="text-xs text-muted-foreground">
              Last updated: {metrics.lastUpdate.toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        {/* Critical Threats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatNumber(metrics.criticalThreats)}</div>
            <p className="text-xs text-muted-foreground">
              {((metrics.criticalThreats / metrics.totalThreats) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        {/* High Severity Threats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatNumber(metrics.highThreats)}</div>
            <p className="text-xs text-muted-foreground">
              {((metrics.highThreats / metrics.totalThreats) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        {/* Medium Severity Threats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium Severity</CardTitle>
            <Shield className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatNumber(metrics.mediumThreats)}</div>
            <p className="text-xs text-muted-foreground">
              {((metrics.mediumThreats / metrics.totalThreats) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threats by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Threats by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metrics.threatsByCategory)
                .sort(([,a], [,b]) => b - a)
                .map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize">
                        {category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{count}</span>
                      <span className="text-sm text-muted-foreground">
                        ({((count / metrics.totalThreats) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Threats by Industry */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Threats by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metrics.threatsByIndustry)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 8) // Show top 8 industries
                .map(([industry, count]) => (
                  <div key={industry} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{industry}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{count}</span>
                      <span className="text-sm text-muted-foreground">
                        ({((count / metrics.totalThreats) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Threat Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Regional Threat Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(metrics.threatsByRegion)
              .sort(([,a], [,b]) => b - a)
              .map(([region, count]) => (
                <div key={region} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{region}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{count}</span>
                    <Badge variant="secondary" className="text-xs">
                      {((count / metrics.totalThreats) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Real-time Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Threat Intelligence Feed Active</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {metrics.lastUpdate.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

