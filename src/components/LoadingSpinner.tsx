import React from 'react';
import { Shield, Lock, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'default' | 'cyber' | 'minimal';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...',
  variant = 'cyber'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center">
        <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-cyber-blue ${sizeClasses[size]}`} />
        {text && <span className={`ml-3 text-gray-600 ${textSizes[size]}`}>{text}</span>}
      </div>
    );
  }

  if (variant === 'cyber') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          {/* Outer ring */}
          <div className={`${sizeClasses[size]} border-4 border-cyber-blue/20 rounded-full animate-pulse`} />
          
          {/* Inner spinning ring */}
          <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-t-cyber-blue rounded-full animate-spin`} />
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className={`${size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-4 h-4' : 'w-3 h-3'} text-cyber-blue animate-pulse`} />
          </div>
        </div>
        
        {/* Cybersecurity-themed loading text */}
        {text && (
          <div className="text-center">
            <div className={`${textSizes[size]} font-medium text-cyber-blue mb-2`}>
              {text}
            </div>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-1 h-1 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      {text && <span className={`text-gray-600 ${textSizes[size]}`}>{text}</span>}
    </div>
  );
};

// Full page loading component
export const PageLoader: React.FC<{ text?: string }> = ({ text = 'Loading N-Total Cybersecurity...' }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-blue/5 to-cyber-blue/10 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" text={text} variant="cyber" />
        <div className="mt-8 text-sm text-gray-500">
          Securing your digital experience...
        </div>
      </div>
    </div>
  );
};
