import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, Brain, GraduationCap, Users, ChevronRight, Mail, Linkedin, Calendar, Award, FileText, Globe, Lock, CheckCircle, Star, TrendingUp, Zap, Target, ShieldCheck, Users2, Building2, Server, Database, Network, Eye, AlertTriangle, Clock, BarChart3, Calculator, Phone, MessageSquare, Sun, Moon, Monitor } from "lucide-react";
import { CybersecurityChatbot } from "@/components/CybersecurityChatbot";
import cyberHero from "@/assets/cyber-hero.jpg";
import aiGrcIcon from "@/assets/ai-grc-icon.jpg";
import trainingIcon from "@/assets/training-icon.jpg";
import advisoryIcon from "@/assets/advisory-icon.jpg";
import otSecurityIcon from "@/assets/ot-security-icon.jpg";
import { useState, useEffect } from "react";

// N-total Cybersecurity LLC - Professional Website
const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to system
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
    setTheme(savedTheme);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="w-4 h-4" />;
    if (theme === 'dark') return <Moon className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  if (!mounted) return null;

  return (
          <div className="min-h-screen bg-gradient-hero text-foreground">
        {/* Theme Indicator Banner */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-cyber-blue/90 text-white text-center py-1 text-xs font-medium backdrop-blur-sm">
          <span className="inline-flex items-center space-x-2">
            {getThemeIcon()}
            <span>Theme: {theme === 'system' ? 'System' : theme === 'light' ? 'Light' : 'Dark'} Mode</span>
            <span className="text-cyber-blue/70">•</span>
            <span>Click the theme button in navigation to switch</span>
          </span>
        </div>

        {/* Theme Transition Overlay */}
        <div className="fixed inset-0 z-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-blue/5 opacity-0 transition-opacity duration-500 ease-in-out" 
               style={{ opacity: theme === 'light' ? 1 : 0 }}></div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-8 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-cyber-blue">N-total Cybersecurity</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-foreground hover:text-cyber-blue transition-colors">Services</a>
            <a href="#solutions" className="text-foreground hover:text-cyber-blue transition-colors">Solutions</a>
            <a href="#resources" className="text-foreground hover:text-cyber-blue transition-colors">Resources</a>
            <a href="#about" className="text-foreground hover:text-cyber-blue transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-cyber-blue transition-colors">Contact</a>
            <Button variant="cyber" size="sm">Request Demo</Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 p-0 rounded-full hover:bg-cyber-blue/10 transition-all duration-300 theme-toggle group"
              title={`Current theme: ${theme} (click to cycle)`}
            >
              <div className="relative">
                {getThemeIcon()}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-10 h-10 p-0 rounded-full hover:bg-cyber-blue/10 transition-all duration-300 theme-toggle group"
              title={`Current theme: ${theme} (click to cycle)`}
            >
              <div className="relative">
                {getThemeIcon()}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Button>
            <Button variant="cyber" size="sm">Menu</Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Main Background Image */}
          <img 
            src={cyberHero} 
            alt="Cybersecurity Hero" 
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              theme === 'light' ? 'opacity-60' : 'opacity-30'
            }`} 
          />
          <div className={`absolute inset-0 bg-gradient-hero transition-opacity duration-500 ${
            theme === 'light' ? 'opacity-90' : 'opacity-80'
          }`}></div>
          
          {/* Animated Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full animate-pulse ${
                  theme === 'light' ? 'bg-cyber-blue/80' : 'bg-cyber-blue'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Scanning Lines Animation */}
          <div className="absolute inset-0">
            <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-scan-line transition-opacity duration-500 ${
              theme === 'light' ? 'opacity-95' : 'opacity-100'
            }`}></div>
            <div className={`absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent animate-scan-line-delayed transition-opacity duration-500 ${
              theme === 'light' ? 'opacity-90' : 'opacity-100'
            }`}></div>
            <div className={`absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent animate-scan-line-slow transition-opacity duration-500 ${
              theme === 'light' ? 'opacity-85' : 'opacity-100'
            }`}></div>
            <div className={`absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue/40 to-transparent animate-scan-line-fast transition-opacity duration-500 ${
              theme === 'light' ? 'opacity-88' : 'opacity-100'
            }`}></div>
          </div>

          {/* Matrix Rain Effect */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            theme === 'light' ? 'opacity-70' : 'opacity-20'
          }`}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 text-cyber-blue text-xs font-mono animate-matrix-rain"
                style={{
                  left: `${(i * 12.5)}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                }}
              >
                {[...Array(20)].map((_, j) => (
                  <div key={j} className="mb-2">
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Floating Security Icons */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 animate-float-slow">
              <Shield className={`w-8 h-8 transition-colors duration-500 ${
                theme === 'light' ? 'text-cyber-blue/80' : 'text-cyber-blue/30'
              }`} />
            </div>
            <div className="absolute top-32 right-32 animate-float-medium">
              <Lock className={`w-6 h-6 transition-colors duration-500 ${
                theme === 'light' ? 'text-cyber-blue/70' : 'text-cyber-blue/20'
              }`} />
            </div>
            <div className="absolute bottom-40 left-1/4 animate-float-fast">
              <Eye className={`w-7 h-7 transition-colors duration-500 ${
                theme === 'light' ? 'text-cyber-blue/75' : 'text-cyber-blue/25'
              }`} />
            </div>
            <div className="absolute top-1/3 right-1/4 animate-float-slow">
              <Server className={`w-6 h-6 transition-colors duration-500 ${
                theme === 'light' ? 'text-cyber-blue/70' : 'text-cyber-blue/20'
              }`} />
            </div>
            <div className="absolute bottom-1/3 right-20 animate-float-medium">
              <Network className={`w-8 h-8 transition-colors duration-500 ${
                theme === 'light' ? 'text-cyber-blue/80' : 'text-cyber-blue/30'
              }`} />
            </div>
          </div>

          {/* Pulsing Grid */}
          <div className="absolute inset-0">
            <div className={`absolute top-1/4 left-1/4 w-32 h-32 border rounded-lg animate-pulse-grid transition-colors duration-500 ${
              theme === 'light' ? 'border-cyber-blue/75' : 'border-cyber-blue/20'
            }`}></div>
            <div className={`absolute top-1/3 right-1/3 w-24 h-24 border rounded-lg animate-pulse-grid-delayed transition-colors duration-500 ${
              theme === 'light' ? 'border-cyber-blue/70' : 'border-cyber-blue/15'
            }`}></div>
            <div className={`absolute bottom-1/4 left-1/3 w-28 h-28 border rounded-lg animate-pulse-grid-slow transition-colors duration-500 ${
              theme === 'light' ? 'border-cyber-blue/80' : 'border-cyber-blue/25'
            }`}></div>
          </div>

          {/* Rotating Hexagons */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`w-64 h-64 border rounded-full animate-spin-slow transition-colors duration-500 ${
                theme === 'light' ? 'border-cyber-blue/60' : 'border-cyber-blue/10'
              }`}></div>
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border rounded-full animate-spin-medium transition-colors duration-500 ${
                theme === 'light' ? 'border-cyber-blue/65' : 'border-cyber-blue/15'
              }`}></div>
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border rounded-full animate-spin-fast transition-colors duration-500 ${
                theme === 'light' ? 'border-cyber-blue/70' : 'border-cyber-blue/20'
              }`}></div>
            </div>
          </div>

          {/* Glowing Orbs */}
          <div className="absolute inset-0">
            <div className={`absolute top-1/4 left-1/3 w-4 h-4 rounded-full animate-glow-pulse transition-colors duration-500 ${
              theme === 'light' ? 'bg-cyber-blue/85' : 'bg-cyber-blue/40'
            }`}></div>
            <div className={`absolute top-1/2 right-1/4 w-3 h-3 rounded-full animate-glow-pulse-delayed transition-colors duration-500 ${
              theme === 'light' ? 'bg-cyber-blue/80' : 'bg-cyber-blue/30'
            }`}></div>
            <div className={`absolute bottom-1/3 left-1/2 w-5 h-5 rounded-full animate-glow-pulse-slow transition-colors duration-500 ${
              theme === 'light' ? 'bg-cyber-blue/90' : 'bg-cyber-blue/50'
            }`}></div>
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge className="mb-6 text-sm bg-cyber-blue/20 text-cyber-blue border-cyber-blue animate-fade-in-up">
            Industry-Leading Cybersecurity Solutions
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up-delayed">
            Securing Tomorrow's
            <span className="text-cyber-blue block animate-text-glow">Digital Landscape</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up-slow">
            N-total Cybersecurity LLC delivers innovative, AI-enabled solutions that address today's complex security challenges and prepare organizations for tomorrow's threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-slower">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 animate-button-pulse">
              Get Started Today
              <ChevronRight className="ml-2" />
            </Button>
            <Button variant="cyber-outline" size="lg" className="text-lg px-8 py-4 animate-button-hover">
              Schedule Demo
              <Calendar className="ml-2" />
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-muted-foreground animate-fade-in-up-slowest">
            Trusted by enterprises, SMBs, and government organizations
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative overflow-hidden">
        {/* High-Resolution Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/2ndBk.png" 
            alt="Cybersecurity Services Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue">
              Our Core Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Cybersecurity Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI-enabled governance to operational technology security, we provide innovative solutions tailored to your organization's unique challenges.
            </p>
          </div>

          <Tabs defaultValue="ai-grc" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-surface/50 p-1">
              <TabsTrigger value="ai-grc" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">AI-enabled GRC</TabsTrigger>
              <TabsTrigger value="training" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Training</TabsTrigger>
              <TabsTrigger value="advisory" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Advisory</TabsTrigger>
              <TabsTrigger value="ot-security" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">OT Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai-grc" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">AI-Enabled Governance, Risk & Compliance</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Transform your compliance operations with intelligent automation and predictive analytics.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Automated compliance monitoring across 50+ frameworks</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>AI-powered risk prediction with 95% accuracy</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Real-time threat intelligence integration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Automated reporting and dashboard generation</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Learn More</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Key Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Brain className="w-5 h-5 text-cyber-blue" />
                      <span>Machine Learning Risk Models</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-cyber-blue" />
                      <span>Predictive Analytics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-cyber-blue" />
                      <span>Continuous Monitoring</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-cyber-blue" />
                      <span>Automated Compliance</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="training" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Comprehensive Cybersecurity Training</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Build a security-first culture with our industry-leading training programs and certifications.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Customized training for all skill levels</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Hands-on labs and real-world scenarios</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Industry-recognized certifications</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Continuous learning and updates</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">View Programs</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Training Programs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-cyber-blue" />
                      <span>Security Awareness Training</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>Technical Skills Development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-cyber-blue" />
                      <span>Certification Preparation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>Executive Security Training</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="advisory" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Strategic Cybersecurity Advisory</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Align your security strategy with business objectives through expert consulting and strategic planning.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Security program development and optimization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Risk management strategy development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Technology roadmap and architecture planning</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Executive-level security consulting</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Get Consultation</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Advisory Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-cyber-blue" />
                      <span>Security Strategy Development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-cyber-blue" />
                      <span>Risk Assessment & Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-cyber-blue" />
                      <span>Program Optimization</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users2 className="w-5 h-5 text-cyber-blue" />
                      <span>Executive Coaching</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ot-security" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Operational Technology Security</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Protect your critical infrastructure with specialized OT cybersecurity solutions designed for industrial environments.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Industrial control systems (ICS) security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Network segmentation and isolation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Asset discovery and continuous monitoring</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Incident response planning and execution</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Explore Solutions</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">OT Security Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Server className="w-5 h-5 text-cyber-blue" />
                      <span>ICS Security Hardening</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Network className="w-5 h-5 text-cyber-blue" />
                      <span>Network Segmentation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-cyber-blue" />
                      <span>Asset Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-cyber-blue" />
                      <span>Threat Detection</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue">
              Industry Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tailored Solutions for
              <span className="text-cyber-blue block">Every Industry</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From healthcare to manufacturing, we provide industry-specific cybersecurity solutions that address unique challenges and compliance requirements.
            </p>
          </div>

          <Tabs defaultValue="healthcare" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-surface/50 p-1">
              <TabsTrigger value="healthcare" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Healthcare</TabsTrigger>
              <TabsTrigger value="finance" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Finance</TabsTrigger>
              <TabsTrigger value="manufacturing" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Manufacturing</TabsTrigger>
              <TabsTrigger value="government" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Government</TabsTrigger>
            </TabsList>
            
            <TabsContent value="healthcare" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Healthcare Cybersecurity</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Protect patient data and ensure HIPAA compliance with our specialized healthcare security solutions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>HIPAA compliance and audit support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Medical device security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Patient data protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Incident response for healthcare</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Healthcare Solutions</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Healthcare Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-cyber-blue" />
                      <span>HIPAA Compliance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>Medical Device Security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-cyber-blue" />
                      <span>PHI Protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-cyber-blue" />
                      <span>Healthcare Incident Response</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="finance" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Financial Services Security</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Secure financial transactions and protect customer assets with our comprehensive banking and fintech security solutions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>PCI DSS compliance and validation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Fraud detection and prevention</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Transaction security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Regulatory compliance (SOX, GLBA)</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Financial Solutions</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Financial Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-cyber-blue" />
                      <span>PCI DSS Compliance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>Fraud Detection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-cyber-blue" />
                      <span>Transaction Security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-cyber-blue" />
                      <span>Regulatory Compliance</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="manufacturing" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Manufacturing & Industrial Security</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Protect your production systems and intellectual property with our specialized manufacturing cybersecurity solutions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Industrial control systems (ICS) security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Supply chain security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Intellectual property protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Operational technology security</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Manufacturing Solutions</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Manufacturing Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Server className="w-5 h-5 text-cyber-blue" />
                      <span>ICS Security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Network className="w-5 h-5 text-cyber-blue" />
                      <span>Supply Chain Security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-cyber-blue" />
                      <span>IP Protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>OT Security</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="government" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Government & Defense Security</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Secure critical government systems and protect national security with our specialized government cybersecurity solutions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>FedRAMP compliance and certification</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Classified information protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Critical infrastructure security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Defense contractor security</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Government Solutions</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Government Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-cyber-blue" />
                      <span>FedRAMP Compliance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>Classified Data Protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-cyber-blue" />
                      <span>Critical Infrastructure</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>Defense Contractors</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24 bg-surface/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue">
              Knowledge Center
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Cybersecurity
              <span className="text-cyber-blue block">Resources & Tools</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access our comprehensive library of cybersecurity resources, tools, and thought leadership content to stay ahead of evolving threats.
            </p>
          </div>

          <Tabs defaultValue="whitepapers" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-surface/50 p-1">
              <TabsTrigger value="whitepapers" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">White Papers</TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Tools & Assessments</TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Insights & Blog</TabsTrigger>
            </TabsList>
            
            <TabsContent value="whitepapers" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Technical White Papers</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Deep dive into cybersecurity topics with our comprehensive technical white papers and research reports.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-cyber-blue" />
                      <span>AI in Cybersecurity: Trends & Applications</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-cyber-blue" />
                      <span>Zero Trust Architecture Implementation Guide</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-cyber-blue" />
                      <span>Industrial IoT Security Best Practices</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-cyber-blue" />
                      <span>Cloud Security Compliance Framework</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Download Papers</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Featured Papers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-cyber-blue" />
                      <span>Most Downloaded</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-cyber-blue" />
                      <span>Trending Topics</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-cyber-blue" />
                      <span>Latest Research</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>Industry Focus</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Interactive Tools & Assessments</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Evaluate your cybersecurity posture with our interactive assessment tools and calculators.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-cyber-blue" />
                      <span>Security Maturity Assessment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calculator className="w-5 h-5 text-cyber-blue" />
                      <span>ROI Calculator for Security Investments</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>Compliance Checklist Generator</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-cyber-blue" />
                      <span>Threat Risk Assessment Tool</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Access Tools</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Tool Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-cyber-blue" />
                      <span>Assessment Tools</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calculator className="w-5 h-5 text-cyber-blue" />
                      <span>Calculators</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Checklists</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-cyber-blue" />
                      <span>Analytics</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Latest Insights & Blog</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Stay informed with our latest cybersecurity insights, threat intelligence, and industry analysis.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-cyber-blue" />
                      <span>Weekly threat intelligence reports</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-cyber-blue" />
                      <span>Industry trend analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-cyber-blue" />
                      <span>Emerging threat alerts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>Expert interviews and insights</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Read Insights</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Content Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-cyber-blue" />
                      <span>Blog Posts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-cyber-blue" />
                      <span>Reports</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>Interviews</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-cyber-blue" />
                      <span>Alerts</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue">
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real Results for
              <span className="text-cyber-blue block">Real Organizations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how organizations across industries have transformed their cybersecurity posture with N-total Cybersecurity solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Case Study 1 */}
            <Card className="bg-gradient-card border-border hover:shadow-cyber transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Building2 className="w-5 h-5 text-cyber-blue" />
                  <Badge variant="outline" className="text-xs">Healthcare</Badge>
                </div>
                <CardTitle className="text-xl">Regional Hospital Network</CardTitle>
                <CardDescription>
                  Achieved 100% HIPAA compliance and reduced security incidents by 85%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Security Incidents:</span>
                    <span className="font-semibold text-cyber-blue">↓ 85%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Compliance Score:</span>
                    <span className="font-semibold text-cyber-blue">↑ 100%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-semibold text-cyber-blue">↓ 60%</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="cyber" className="w-full">Read Full Case Study</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-cyber-blue">Regional Hospital Network Cybersecurity Transformation</DialogTitle>
                      <DialogDescription className="text-lg">
                        How a 500-bed hospital network achieved complete HIPAA compliance and dramatically improved security posture.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 text-left">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Challenge</h3>
                        <p className="text-muted-foreground">
                          The hospital network faced increasing cybersecurity threats, HIPAA compliance challenges, and a growing number of medical device vulnerabilities. With patient data security at stake, they needed a comprehensive solution.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Solution</h3>
                        <p className="text-muted-foreground">
                          Implemented our AI-enabled GRC platform, medical device security framework, and comprehensive staff training program. Deployed 24/7 monitoring and incident response capabilities.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Results</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• 85% reduction in security incidents</li>
                          <li>• 100% HIPAA compliance achievement</li>
                          <li>• 60% faster incident response time</li>
                          <li>• $2.3M in potential breach costs avoided</li>
                          <li>• Enhanced patient trust and satisfaction</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Case Study 2 */}
            <Card className="bg-gradient-card border-border hover:shadow-cyber transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Server className="w-5 h-5 text-cyber-blue" />
                  <Badge variant="outline" className="text-xs">Manufacturing</Badge>
                </div>
                <CardTitle className="text-xl">Global Manufacturing Corp</CardTitle>
                <CardDescription>
                  Protected critical infrastructure and prevented $15M in potential losses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Downtime:</span>
                    <span className="font-semibold text-cyber-blue">↓ 95%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Threat Detection:</span>
                    <span className="font-semibold text-cyber-blue">↑ 99.9%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cost Savings:</span>
                    <span className="font-semibold text-cyber-blue">$15M</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="cyber" className="w-full">Read Full Case Study</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-cyber-blue">Global Manufacturing Corp OT Security Success</DialogTitle>
                      <DialogDescription className="text-lg">
                        How a Fortune 500 manufacturer secured their operational technology and prevented catastrophic cyber attacks.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 text-left">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Challenge</h3>
                        <p className="text-muted-foreground">
                          The company's industrial control systems were vulnerable to cyber attacks that could halt production across 15 global facilities, potentially causing millions in losses.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Solution</h3>
                        <p className="text-muted-foreground">
                          Implemented comprehensive OT cybersecurity framework including network segmentation, asset discovery, continuous monitoring, and incident response planning.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Results</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• 95% reduction in production downtime</li>
                          <li>• 99.9% threat detection rate</li>
                          <li>• $15M in potential losses prevented</li>
                          <li>• Enhanced supply chain security</li>
                          <li>• Improved regulatory compliance</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Case Study 3 */}
            <Card className="bg-gradient-card border-border hover:shadow-cyber transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="w-5 h-5 text-cyber-blue" />
                  <Badge variant="outline" className="text-xs">Financial</Badge>
                </div>
                <CardTitle className="text-xl">FinTech Startup</CardTitle>
                <CardDescription>
                  Achieved SOC 2 compliance in 90 days and secured $50M funding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Compliance Time:</span>
                    <span className="font-semibold text-cyber-blue">90 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Funding Secured:</span>
                    <span className="font-semibold text-cyber-blue">$50M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Customer Trust:</span>
                    <span className="font-semibold text-cyber-blue">↑ 300%</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="cyber" className="w-full">Read Full Case Study</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-cyber-blue">FinTech Startup Security Transformation</DialogTitle>
                      <DialogDescription className="text-lg">
                        How a rapidly growing fintech company achieved SOC 2 compliance and secured major funding through enhanced security posture.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 text-left">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Challenge</h3>
                        <p className="text-muted-foreground">
                          The startup needed to achieve SOC 2 compliance quickly to secure Series B funding and build customer trust in their financial platform.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Solution</h3>
                        <p className="text-muted-foreground">
                          Implemented our strategic advisory services, compliance framework, and security program development to achieve SOC 2 Type II compliance in record time.
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Results</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• SOC 2 compliance achieved in 90 days</li>
                          <li>• $50M Series B funding secured</li>
                          <li>• 300% increase in customer trust scores</li>
                          <li>• Enhanced investor confidence</li>
                          <li>• Scalable security foundation established</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue">
              About N-total Cybersecurity
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Innovation Meets
              <span className="text-cyber-blue block">Cybersecurity Excellence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At N-total Cybersecurity LLC, we believe that traditional security approaches aren't enough for tomorrow's challenges. Our team combines deep cybersecurity expertise with cutting-edge technology to deliver solutions that not only protect but also enable business growth.
            </p>
          </div>

          <Tabs defaultValue="company" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-surface/50 p-1">
              <TabsTrigger value="company" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Company</TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Team</TabsTrigger>
              <TabsTrigger value="certifications" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Certifications</TabsTrigger>
              <TabsTrigger value="partners" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Partners</TabsTrigger>
            </TabsList>
            
            <TabsContent value="company" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Our Mission & Vision</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    We're committed to securing tomorrow's digital landscape through innovative cybersecurity solutions that protect organizations while enabling their growth and success.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-cyber-blue" />
                      <span>Mission: Protect organizations from evolving cyber threats</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-cyber-blue" />
                      <span>Vision: Lead the future of cybersecurity innovation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>Values: Excellence, Innovation, Trust, Partnership</span>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyber-blue mb-2">500+</div>
                      <div className="text-sm text-muted-foreground">Organizations Protected</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyber-blue mb-2">24/7</div>
                      <div className="text-sm text-muted-foreground">Security Monitoring</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyber-blue mb-2">99.9%</div>
                      <div className="text-sm text-muted-foreground">Threat Detection Rate</div>
                    </div>
                  </div>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Why Choose N-total?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>Mission-Critical Protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Brain className="w-5 h-5 text-cyber-blue" />
                      <span>AI-Powered Innovation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>Trusted Partnerships</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-cyber-blue" />
                      <span>Global Expertise</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Expert Team</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our team consists of cybersecurity professionals with decades of combined experience across industries and technologies.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>50+ cybersecurity experts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-cyber-blue" />
                      <span>Industry-recognized certifications</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-cyber-blue" />
                      <span>Experience with Fortune 500 companies</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-cyber-blue" />
                      <span>Global threat intelligence network</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Meet Our Team</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Team Expertise</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>Network Security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Server className="w-5 h-5 text-cyber-blue" />
                      <span>Cloud Security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-cyber-blue" />
                      <span>Data Protection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Brain className="w-5 h-5 text-cyber-blue" />
                      <span>AI & ML Security</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="certifications" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Industry Certifications</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    We maintain the highest standards of security and compliance through rigorous certifications and continuous validation.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>ISO 27001:2013 Information Security Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>SOC 2 Type II Compliance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>NIST Cybersecurity Framework Alignment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>FedRAMP Ready Designation</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">View Certifications</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Compliance Standards</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-cyber-blue" />
                      <span>HIPAA Compliance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>PCI DSS</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-cyber-blue" />
                      <span>SOX Compliance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-cyber-blue" />
                      <span>GLBA Compliance</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="partners" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Strategic Partnerships</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    We collaborate with industry-leading technology providers to deliver comprehensive cybersecurity solutions.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Technology partnerships with leading vendors</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Academic research collaborations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Government and defense partnerships</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Industry consortium participation</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Our Partners</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Partnership Types</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-cyber-blue" />
                      <span>Technology Vendors</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-cyber-blue" />
                      <span>Academic Institutions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>Government Agencies</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-cyber-blue" />
                      <span>Industry Groups</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-surface/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue">
              Client Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients
              <span className="text-cyber-blue block">Say About Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear directly from organizations that have transformed their cybersecurity posture with N-total Cybersecurity solutions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="testimonial-1" className="border-border">
                <AccordionTrigger className="text-left hover:text-cyber-blue">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-cyber-blue" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Sarah Johnson, CISO</div>
                      <div className="text-sm text-muted-foreground">Fortune 500 Healthcare Network</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="pl-16">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">
                      "N-total Cybersecurity transformed our security posture completely. Their AI-enabled GRC platform helped us achieve 100% HIPAA compliance while reducing our incident response time by 60%. The team's expertise in healthcare security is unmatched."
                    </p>
                    <div className="text-sm text-cyber-blue font-semibold">
                      Results: 100% HIPAA compliance, 60% faster incident response, 85% reduction in security incidents
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="testimonial-2" className="border-border">
                <AccordionTrigger className="text-left hover:text-cyber-blue">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-cyber-blue" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Michael Chen, VP of Operations</div>
                      <div className="text-sm text-muted-foreground">Global Manufacturing Corporation</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="pl-16">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">
                      "The OT cybersecurity solutions from N-total have been game-changing for our manufacturing operations. We've prevented potential losses of $15M and achieved 99.9% threat detection across all our facilities. Their expertise in industrial security is exceptional."
                    </p>
                    <div className="text-sm text-cyber-blue font-semibold">
                      Results: 95% reduction in downtime, 99.9% threat detection, $15M in losses prevented
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="testimonial-3" className="border-border">
                <AccordionTrigger className="text-left hover:text-cyber-blue">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                      <Database className="w-6 h-6 text-cyber-blue" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">David Rodriguez, CEO</div>
                      <div className="text-sm text-muted-foreground">FinTech Innovation Startup</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="pl-16">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">
                      "N-total's strategic advisory services helped us achieve SOC 2 compliance in just 90 days, which was crucial for securing our $50M Series B funding. Their team's strategic approach and deep expertise made all the difference."
                    </p>
                    <div className="text-sm text-cyber-blue font-semibold">
                      Results: SOC 2 compliance in 90 days, $50M funding secured, 300% increase in customer trust
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="testimonial-4" className="border-border">
                <AccordionTrigger className="text-left hover:text-cyber-blue">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyber-blue/20 rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-cyber-blue" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Lisa Thompson, Director of IT</div>
                      <div className="text-sm text-muted-foreground">Federal Government Agency</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="pl-16">
                    <div className="flex items-center space-x-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">
                      "Working with N-total Cybersecurity has been exceptional. Their FedRAMP compliance expertise and government security solutions have helped us meet the highest standards of national security requirements."
                    </p>
                    <div className="text-sm text-cyber-blue font-semibold">
                      Results: FedRAMP compliance achieved, enhanced national security posture, improved threat detection
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-surface/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyber-blue/20 text-cyber-blue border-cyber-blue">
              Get In Touch
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Secure Your Future?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Contact our cybersecurity experts today to discuss how N-total Cybersecurity can protect and empower your organization.
            </p>
          </div>

          <Tabs defaultValue="contact-form" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-surface/50 p-1">
              <TabsTrigger value="contact-form" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Contact Form</TabsTrigger>
              <TabsTrigger value="demo-request" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Demo Request</TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white">Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact-form" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Card className="bg-gradient-card border-border p-8">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-2xl text-cyber-blue mb-4">Schedule Your Security Assessment</CardTitle>
                      <CardDescription className="text-lg">
                        Get started with a complimentary security evaluation and personalized recommendations.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0 space-y-6">
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue text-foreground"
                        />
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue text-foreground"
                        />
                        <input 
                          type="text" 
                          placeholder="Company Name" 
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue text-foreground"
                        />
                        <textarea 
                          placeholder="Tell us about your cybersecurity challenges..." 
                          rows={4}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue text-foreground resize-none"
                        ></textarea>
                      </div>
                      <Button variant="hero" size="lg" className="w-full">
                        Request Free Assessment
                        <ChevronRight className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-cyber-blue">Connect With Our Experts</h3>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                          <Mail className="w-6 h-6 text-cyber-blue" />
                        </div>
                        <div>
                          <div className="font-semibold">Email Us</div>
                          <div className="text-muted-foreground">info@ntotal-cyber.com</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                          <Linkedin className="w-6 h-6 text-cyber-blue" />
                        </div>
                        <div>
                          <div className="font-semibold">LinkedIn</div>
                          <div className="text-muted-foreground">Connect with our team</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-cyber-blue" />
                        </div>
                        <div>
                          <div className="font-semibold">Schedule Demo</div>
                          <div className="text-muted-foreground">Book a personalized demonstration</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card className="bg-gradient-card border-border p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-lg text-cyber-blue">Why Choose N-total?</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0">
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                          <span>Industry-leading expertise and innovation</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                          <span>Tailored solutions for your unique needs</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                          <span>24/7 support and monitoring</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full"></div>
                          <span>Proven track record with enterprises</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="demo-request" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Request a Personalized Demo</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    See our cybersecurity solutions in action with a customized demonstration tailored to your organization's needs.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Customized to your industry and challenges</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Live demonstration with our experts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Q&A session with cybersecurity specialists</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Follow-up consultation and next steps</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Schedule Demo</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Demo Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>Executive Overview</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-cyber-blue" />
                      <span>Technical Deep Dive</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-cyber-blue" />
                      <span>Industry-Specific Solutions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-cyber-blue" />
                      <span>Use Case Scenarios</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">24/7 Support & Monitoring</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our dedicated support team is available around the clock to ensure your security operations run smoothly.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-cyber-blue" />
                      <span>24/7 security monitoring and alerting</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-cyber-blue" />
                      <span>Dedicated account managers</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-5 h-5 text-cyber-blue" />
                      <span>Emergency incident response</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 text-cyber-blue" />
                      <span>Ongoing training and support</span>
                    </div>
                  </div>
                  <Button variant="cyber" className="mt-6">Contact Support</Button>
                </div>
                <Card className="bg-gradient-card border-border p-6">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyber-blue">Support Channels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-cyber-blue" />
                      <span>Email Support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-cyber-blue" />
                      <span>Phone Support</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-cyber-blue" />
                      <span>Live Chat</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-cyber-blue" />
                      <span>Video Support</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-blue mb-4">N-total Cybersecurity LLC</div>
            <p className="text-muted-foreground mb-6">
              Securing tomorrow's digital landscape with innovative cybersecurity solutions.
            </p>
            <div className="flex justify-center space-x-6">
              <Button variant="ghost" size="sm">Privacy Policy</Button>
              <Button variant="ghost" size="sm">Terms of Service</Button>
              <Button variant="ghost" size="sm">Contact</Button>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
              © 2024 N-total Cybersecurity LLC. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* AI Cybersecurity Chatbot */}
      <CybersecurityChatbot />
    </div>
  );
};

export default Index;