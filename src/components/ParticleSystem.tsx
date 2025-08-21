import React from 'react';
import { Brain, Eye, Shield, Lock, Zap } from 'lucide-react';

// Animation Constants
const PARTICLE_COUNT = 15;
const THREAT_INDICATORS = 8;
const MATRIX_RAIN_COLUMNS = 10;
const MATRIX_RAIN_ROWS = 25;

interface ParticleSystemProps {
  theme: 'light' | 'dark' | 'system';
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ theme }) => {
  const isLightTheme = theme === 'light';
  
  return (
    <>
      {/* Advanced Cybersecurity Particle System */}
      <div className="absolute inset-0">
        {/* Data Flow Particles */}
        {[...Array(PARTICLE_COUNT)].map((_, i) => (
          <div
            key={`data-${i}`}
            className={`absolute w-1.5 h-1.5 rounded-full animate-pulse ${
              isLightTheme ? 'bg-cyber-blue/90' : 'bg-cyber-blue/60'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Threat Indicator Particles */}
        {[...Array(THREAT_INDICATORS)].map((_, i) => (
          <div
            key={`threat-${i}`}
            className={`absolute w-2 h-2 rounded-full animate-ping ${
              isLightTheme ? 'bg-red-500/70' : 'bg-red-500/50'
            }`}
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 5)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s',
            }}
          />
        ))}
      </div>

      {/* Sophisticated Scanning Network */}
      <div className="absolute inset-0">
        {/* Primary Security Scan */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-scan-line transition-opacity duration-500 ${
          isLightTheme ? 'opacity-95' : 'opacity-100'
        }`}></div>
        
        {/* Diagonal Security Scans */}
        <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue/60 to-transparent animate-scan-diagonal transition-opacity duration-500 ${
          isLightTheme ? 'opacity-90' : 'opacity-100'
        }`} style={{ transform: 'rotate(45deg)', transformOrigin: '0 0' }}></div>
        
        <div className={`absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-cyber-blue/60 to-transparent animate-scan-diagonal-reverse transition-opacity duration-500 ${
          isLightTheme ? 'opacity-90' : 'opacity-100'
        }`} style={{ transform: 'rotate(-45deg)', transformOrigin: '100% 0' }}></div>
        
        {/* Vertical Security Scans */}
        <div className={`absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-cyber-blue/50 to-transparent animate-scan-vertical transition-opacity duration-500 ${
          isLightTheme ? 'opacity-85' : 'opacity-100'
        }`}></div>
        
        <div className={`absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-cyber-blue/50 to-transparent animate-scan-vertical-delayed transition-opacity duration-500 ${
          isLightTheme ? 'opacity-85' : 'opacity-100'
        }`}></div>
      </div>

      {/* Enhanced Matrix Rain with Cybersecurity Symbols */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isLightTheme ? 'opacity-70' : 'opacity-20'
      }`}>
        {[...Array(MATRIX_RAIN_COLUMNS)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 text-cyber-blue text-xs font-mono animate-matrix-rain"
            style={{
              left: `${(i * 10)}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${10 + Math.random() * 6}s`,
            }}
          >
            {[...Array(MATRIX_RAIN_ROWS)].map((_, j) => (
              <div key={j} className="mb-1.5">
                {Math.random() > 0.7 ? 
                  ['🔒', '🛡️', '⚡', '🔐', '🛡️', '⚔️'][Math.floor(Math.random() * 6)] :
                  String.fromCharCode(0x30A0 + Math.random() * 96)
                }
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Advanced Floating Security Icons with Context */}
      <div className="absolute inset-0">
        {/* AI Security Brain */}
        <div className="absolute top-24 left-24 animate-float-sophisticated">
          <div className={`p-2 rounded-full bg-cyber-blue/20 backdrop-blur-sm ${
            isLightTheme ? 'bg-cyber-blue/30' : 'bg-cyber-blue/20'
          }`}>
            <Brain className={`w-8 h-8 transition-colors duration-500 ${
              isLightTheme ? 'text-cyber-blue/90' : 'text-cyber-blue/50'
            }`} />
          </div>
        </div>
        
        {/* Threat Intelligence Eye */}
        <div className="absolute top-36 right-36 animate-float-sophisticated-delayed">
          <div className={`p-2 rounded-full bg-cyber-blue/20 backdrop-blur-sm ${
            isLightTheme ? 'bg-cyber-blue/30' : 'bg-cyber-blue/20'
          }`}>
            <Eye className={`w-7 h-7 transition-colors duration-500 ${
              isLightTheme ? 'text-cyber-blue/90' : 'text-cyber-blue/50'
            }`} />
          </div>
        </div>
        
        {/* Security Shield */}
        <div className="absolute top-48 left-1/2 animate-float-sophisticated">
          <div className={`p-2 rounded-full bg-cyber-blue/20 backdrop-blur-sm ${
            isLightTheme ? 'bg-cyber-blue/30' : 'bg-cyber-blue/20'
          }`}>
            <Shield className={`w-6 h-6 transition-colors duration-500 ${
              isLightTheme ? 'text-cyber-blue/90' : 'text-cyber-blue/50'
            }`} />
          </div>
        </div>
        
        {/* Encryption Lock */}
        <div className="absolute top-32 right-1/3 animate-float-sophisticated-delayed">
          <div className={`p-2 rounded-full bg-cyber-blue/20 backdrop-blur-sm ${
            isLightTheme ? 'bg-cyber-blue/30' : 'bg-cyber-blue/20'
          }`}>
            <Lock className={`w-6 h-6 transition-colors duration-500 ${
              isLightTheme ? 'text-cyber-blue/90' : 'text-cyber-blue/50'
            }`} />
          </div>
        </div>
        
        {/* Power Zap */}
        <div className="absolute top-56 left-1/3 animate-float-sophisticated">
          <div className={`p-2 rounded-full bg-cyber-blue/20 backdrop-blur-sm ${
            isLightTheme ? 'bg-cyber-blue/30' : 'bg-cyber-blue/20'
          }`}>
            <Zap className={`w-6 h-6 transition-colors duration-500 ${
              isLightTheme ? 'text-cyber-blue/90' : 'text-cyber-blue/50'
            }`} />
          </div>
        </div>
      </div>
    </>
  );
};
