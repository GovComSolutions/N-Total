import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  Bell, 
  Eye,
  TrendingUp,
  AlertTriangle,
  Shield,
  Zap
} from 'lucide-react';
import { useThreatFeed } from '@/hooks/useThreatFeed';
import { ThreatAlert } from './ThreatAlert';
import { ThreatMetrics } from './ThreatMetrics';
import { LoadingSpinner } from '../LoadingSpinner';

interface ThreatFeedProps {
  className?: string;
}

export const ThreatFeed: React.FC<ThreatFeedProps> = ({ className = "" }) => {
  const { 
    threats, 
    loading, 
    error, 
    lastUpdate, 
    filters, 
    updateFilters, 
    clearFilters,
    refresh,
    metrics,
    totalCount,
    filteredCount
  } = useThreatFeed();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'feed' | 'metrics'>('feed');

  // Filter threats by search query
  const filteredThreats = threats.filter(threat =>
    threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    threat.affectedIndustries.some(industry => 
      industry.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    threat.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilterChange = (key: string, value: any) => {
    updateFilters({ [key]: value });
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchQuery('');
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
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Alerts
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
                <div className="text-2xl font-bold text-cyber-blue">{totalCount}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'feed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('feed')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Threat Feed
          </Button>
          <Button
            variant={viewMode === 'metrics' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('metrics')}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Last updated: {lastUpdate.toLocaleString()}
        </div>
      </div>

      {viewMode === 'feed' ? (
        <>
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Search & Filters</span>
                {filteredCount !== totalCount && (
                  <Badge variant="secondary">
                    {filteredCount} of {totalCount} threats
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search threats by title, description, industry, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Severity Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Severity</label>
                  <Select
                    value={filters.severities.join(',')}
                    onValueChange={(value) => handleFilterChange('severities', value ? value.split(',') : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Severities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select
                    value={filters.categories.join(',')}
                    onValueChange={(value) => handleFilterChange('categories', value ? value.split(',') : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="malware">Malware</SelectItem>
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="ransomware">Ransomware</SelectItem>
                      <SelectItem value="vulnerability">Vulnerability</SelectItem>
                      <SelectItem value="breach">Breach</SelectItem>
                      <SelectItem value="apt">APT</SelectItem>
                      <SelectItem value="ddos">DDoS</SelectItem>
                      <SelectItem value="insider">Insider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Industry</label>
                  <Select
                    value={filters.industries.join(',')}
                    onValueChange={(value) => handleFilterChange('industries', value ? value.split(',') : [])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Industries</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Energy">Energy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Time Range</label>
                  <Select
                    value={filters.timeRange}
                    onValueChange={(value) => handleFilterChange('timeRange', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last Hour</SelectItem>
                      <SelectItem value="6h">Last 6 Hours</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button onClick={handleClearFilters} variant="outline" size="sm">
                    Clear All Filters
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Showing {filteredThreats.length} threats
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Threat Feed */}
          <div className="space-y-4">
            {filteredThreats.length === 0 ? (
              <Card className="p-8 text-center">
                <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Threats Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear Filters
                </Button>
              </Card>
            ) : (
              filteredThreats.map((threat) => (
                <ThreatAlert key={threat.id} threat={threat} />
              ))
            )}
          </div>
        </>
      ) : (
        /* Analytics View */
        <ThreatMetrics metrics={metrics} />
      )}
    </div>
  );
};

