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
      <nav className="fixed top-8 w-full z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src="/NTotalLogo.png"
              alt="N-Total Cybersecurity Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="text-2xl font-bold text-cyber-blue">N-total Cybersecurity</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#services"
              className="text-foreground hover:text-cyber-blue transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Services
            </a>
            <a
              href="#solutions"
              className="text-foreground hover:text-cyber-blue transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Solutions
            </a>
            <a
              href="#resources"
              className="text-foreground hover:text-cyber-blue transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Resources
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-cyber-blue transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-cyber-blue transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </a>
            <Button
              variant="cyber"
              size="sm"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                  const demoTab = document.querySelector('[value="demo-request"]') as HTMLElement;
                  demoTab?.click();
                }, 500);
              }}
            >
              Request Demo
            </Button>
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
            <Button
              variant="cyber"
              size="sm"
              onClick={() => {
                const nav = document.querySelector('.mobile-nav-menu');
                if (nav) {
                  nav.classList.toggle('hidden');
                }
              }}
            >
              Menu
            </Button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className="mobile-nav-menu hidden md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <a
                href="#services"
                className="block text-foreground hover:text-cyber-blue transition-colors py-2"
                onClick={() => {
                  document.querySelector('.mobile-nav-menu')?.classList.add('hidden');
                }}
              >
                Services
              </a>
              <a
                href="#solutions"
                className="block text-foreground hover:text-cyber-blue transition-colors py-2"
                onClick={() => {
                  document.querySelector('.mobile-nav-menu')?.classList.add('hidden');
                }}
              >
                Solutions
              </a>
              <a
                href="#resources"
                className="block text-foreground hover:text-cyber-blue transition-colors py-2"
                onClick={() => {
                  document.querySelector('.mobile-nav-menu')?.classList.add('hidden');
                }}
              >
                Resources
              </a>
              <a
                href="#about"
                className="block text-foreground hover:text-cyber-blue transition-colors py-2"
                onClick={() => {
                  document.querySelector('.mobile-nav-menu')?.classList.add('hidden');
                }}
              >
                About
              </a>
              <a
                href="#contact"
                className="block text-foreground hover:text-cyber-blue transition-colors py-2"
                onClick={() => {
                  document.querySelector('.mobile-nav-menu')?.classList.add('hidden');
                }}
              >
                Contact
              </a>
              <Button
                variant="cyber"
                size="sm"
                className="w-full mt-4"
                onClick={() => {
                  document.querySelector('.mobile-nav-menu')?.classList.add('hidden');
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const demoTab = document.querySelector('[value="demo-request"]') as HTMLElement;
                    demoTab?.click();
                  }, 500);
                }}
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
        {/* Enhanced Cybersecurity Hero Animations */}
        <div className="absolute inset-0 z-0">
          {/* Main Background Image */}
          <img
            src={cyberHero}
            alt="Cybersecurity Hero"
            className={`w-full h-full object-cover transition-opacity duration-500 ${theme === 'light' ? 'opacity-60' : 'opacity-30'
              }`}
          />
          <div className={`absolute inset-0 bg-gradient-hero transition-opacity duration-500 ${theme === 'light' ? 'opacity-90' : 'opacity-80'
            }`}></div>



          {/* Cybersecurity Shield Defense System */}
          <div className="absolute inset-0">
            {/* Central Shield */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`w-32 h-32 rounded-full border-2 transition-colors duration-500 ${theme === 'light' ? 'border-cyber-blue/60' : 'border-cyber-blue/40'
                } animate-pulse`}>
                <div className="absolute inset-4 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                  <Shield className={`w-12 h-12 transition-colors duration-500 ${theme === 'light' ? 'text-cyber-blue/80' : 'text-cyber-blue/60'
                    }`} />
                </div>
              </div>
            </div>

            {/* Threat Detection Lines - Static Lines Pointing to Shield */}
            {[...Array(8)].map((_, i) => {
              // Skip the top-right line (45 degrees, i=1)
              if (i === 1) return null;

              const angle = (i * 45) * (Math.PI / 180);
              const length = 200;
              const startX = 50 + Math.cos(angle) * 30;
              const startY = 50 + Math.sin(angle) * 30;
              const endX = 50 + Math.cos(angle) * 15;
              const endY = 50 + Math.sin(angle) * 15;

              return (
                <div
                  key={`threat-line-${i}`}
                  className="absolute"
                  style={{
                    left: `${startX}%`,
                    top: `${startY}%`,
                    width: `${length}px`,
                    height: '1px',
                    transform: `rotate(${i * 45 + 180}deg)`,
                    transformOrigin: '0 0',
                  }}
                >
                  <div className={`w-full h-full bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent transition-opacity duration-500 ${theme === 'light' ? 'opacity-60' : 'opacity-40'
                    }`}></div>

                  {/* Moving Threat Particles */}
                  <div
                    className={`absolute w-1 h-1 rounded-full bg-white animate-threat-approach transition-opacity duration-500 ${theme === 'light' ? 'opacity-90' : 'opacity-70'
                      }`}
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '3s',
                    }}
                  ></div>

                  {/* Deflected Particles */}
                  <div
                    className={`absolute w-0.5 h-0.5 rounded-full bg-cyber-blue animate-threat-deflect transition-opacity duration-500 ${theme === 'light' ? 'opacity-80' : 'opacity-60'
                      }`}
                    style={{
                      animationDelay: `${i * 0.5 + 1.5}s`,
                      animationDuration: '1.5s',
                    }}
                  ></div>
                </div>
              );
            })}

            {/* Additional Threat Particles from Random Directions */}
            {[...Array(12)].map((_, i) => {
              const randomAngle = Math.random() * 360;
              const randomDistance = 40 + Math.random() * 20;
              const startX = 50 + Math.cos(randomAngle * Math.PI / 180) * randomDistance;
              const startY = 50 + Math.sin(randomAngle * Math.PI / 180) * randomDistance;

              return (
                <div
                  key={`random-threat-${i}`}
                  className="absolute"
                  style={{
                    left: `${startX}%`,
                    top: `${startY}%`,
                  }}
                >
                  <div
                    className={`w-1 h-1 rounded-full bg-red-400 animate-random-threat transition-opacity duration-500 ${theme === 'light' ? 'opacity-70' : 'opacity-50'
                      }`}
                    style={{
                      animationDelay: `${Math.random() * 4}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  ></div>
                </div>
              );
            })}

            {/* Shield Pulse Effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={`w-40 h-40 rounded-full border transition-colors duration-500 animate-shield-pulse ${theme === 'light' ? 'border-cyber-blue/30' : 'border-cyber-blue/20'
                }`}></div>
              <div className={`absolute inset-4 rounded-full border transition-colors duration-500 animate-shield-pulse-delayed ${theme === 'light' ? 'border-cyber-blue/20' : 'border-cyber-blue/15'
                }`}></div>
            </div>
          </div>

          {/* Subtle Background Pattern */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'light' ? 'opacity-10' : 'opacity-5'
            }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-blue/5"></div>
          </div>




        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge className="badge-premium mb-6 text-sm px-4 py-2 animate-fade-in-up">
            Industry-Leading Cybersecurity Solutions
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up-delayed">
            <span className="block">Securing Tomorrow's</span>
            <span className="block text-cyber-blue">Digital Landscape</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up-slow">
            N-total Cybersecurity LLC delivers innovative, AI-enabled solutions that address today's complex security challenges and prepare organizations for tomorrow's threats.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-slower">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-4 animate-button-pulse cursor-pointer"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                // Switch to contact form tab after scrolling
                setTimeout(() => {
                  const contactFormTab = document.querySelector('[value="contact-form"]') as HTMLElement;
                  contactFormTab?.click();
                }, 500);
              }}
            >
              Get Started Today
              <ChevronRight className="ml-2" />
            </Button>
            <Button
              variant="cyber-outline"
              size="lg"
              className="text-lg px-8 py-4 animate-button-hover cursor-pointer"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                // Switch to demo request tab after scrolling
                setTimeout(() => {
                  const demoTab = document.querySelector('[value="demo-request"]') as HTMLElement;
                  demoTab?.click();
                }, 500);
              }}
            >
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
      <section id="services" className="py-24 bg-surface/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="badge-premium mb-4 px-4 py-2">
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
            <TabsList className="grid w-full grid-cols-4 bg-surface/50 p-2 gap-2 rounded-lg">
              <TabsTrigger value="ai-grc" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">AI-enabled GRC</TabsTrigger>
              <TabsTrigger value="training" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Training</TabsTrigger>
              <TabsTrigger value="advisory" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Advisory</TabsTrigger>
              <TabsTrigger value="ot-security" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">OT Security</TabsTrigger>
            </TabsList>

            <TabsContent value="ai-grc" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                      <span>Real-time security monitoring and alerts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyber-blue" />
                      <span>Automated reporting and dashboard generation</span>
                    </div>
                  </div>
                  <Button
                    className="btn-premium mt-6 px-6 py-3 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const contactTab = document.querySelector('[value="contact-form"]') as HTMLElement;
                        contactTab?.click();
                      }, 500);
                    }}
                  >
                    Learn More
                  </Button>
                </div>
                <Card className="card-premium-service p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Key Capabilities</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Brain className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Machine Learning Risk Models</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Predictive Analytics</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Eye className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Continuous Monitoring</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <FileText className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Automated Compliance</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="training" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    className="btn-premium mt-6 px-6 py-3 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const demoTab = document.querySelector('[value="demo-request"]') as HTMLElement;
                        demoTab?.click();
                      }, 500);
                    }}
                  >
                    View Programs
                  </Button>
                </div>
                <Card className="card-premium-service p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Training Programs</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Security Awareness Training</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Shield className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Technical Skills Development</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Award className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Certification Preparation</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Users className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Executive Security Training</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="advisory" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const contactTab = document.querySelector('[value="contact-form"]') as HTMLElement;
                        contactTab?.click();
                      }, 500);
                    }}
                  >
                    Get Consultation
                  </Button>
                </div>
                <Card className="card-premium-service p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Advisory Services</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Target className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Security Strategy Development</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Risk Assessment & Management</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Building2 className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Program Optimization</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Users2 className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Executive Coaching</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ot-security" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Solutions
                  </Button>
                </div>
                <Card className="card-premium-service p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">OT Security Features</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Server className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">ICS Security Hardening</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Network className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Network Segmentation</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Database className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Asset Management</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Threat Detection</span>
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
            <TabsList className="grid w-full grid-cols-4 bg-surface/50 p-2 gap-2 rounded-lg">
              <TabsTrigger value="healthcare" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Healthcare</TabsTrigger>
              <TabsTrigger value="finance" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Finance</TabsTrigger>
              <TabsTrigger value="manufacturing" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Manufacturing</TabsTrigger>
              <TabsTrigger value="government" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Government</TabsTrigger>
            </TabsList>

            <TabsContent value="healthcare" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const demoTab = document.querySelector('[value="demo-request"]') as HTMLElement;
                        demoTab?.click();
                      }, 500);
                    }}
                  >
                    Healthcare Solutions
                  </Button>
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

            <TabsContent value="finance" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const demoTab = document.querySelector('[value="demo-request"]') as HTMLElement;
                        demoTab?.click();
                      }, 500);
                    }}
                  >
                    Financial Solutions
                  </Button>
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

            <TabsContent value="manufacturing" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const demoTab = document.querySelector('[value="demo-request"]') as HTMLElement;
                        demoTab?.click();
                      }, 500);
                    }}
                  >
                    Manufacturing Solutions
                  </Button>
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

            <TabsContent value="government" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const demoTab = document.querySelector('[value="demo-request"]') as HTMLElement;
                        demoTab?.click();
                      }, 500);
                    }}
                  >
                    Government Solutions
                  </Button>
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
            <TabsList className="grid w-full grid-cols-3 bg-surface/50 p-2 gap-2 rounded-lg">
              <TabsTrigger value="whitepapers" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">White Papers</TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Tools & Assessments</TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Insights & Blog</TabsTrigger>
            </TabsList>

            <TabsContent value="whitepapers" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const contactTab = document.querySelector('[value="contact-form"]') as HTMLElement;
                        contactTab?.click();
                      }, 500);
                    }}
                  >
                    Download Papers
                  </Button>
                </div>
                <Card className="card-premium-resource p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Featured Papers</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Star className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Most Downloaded</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Trending Topics</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Clock className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Latest Research</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Users className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Industry Focus</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const demoTab = document.querySelector('[value="demo-request"]') as HTMLElement;
                        demoTab?.click();
                      }, 500);
                    }}
                  >
                    Access Tools
                  </Button>
                </div>
                <Card className="card-premium-resource p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Tool Categories</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Zap className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Assessment Tools</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Calculator className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Calculators</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Checklists</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Analytics</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <h3 className="text-2xl font-bold text-cyber-blue mb-4">Latest Insights & Blog</h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Stay informed with our latest cybersecurity insights, security research, and industry analysis.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-cyber-blue" />
                      <span>Weekly security analysis reports</span>
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const contactTab = document.querySelector('[value="contact-form"]') as HTMLElement;
                        contactTab?.click();
                      }, 500);
                    }}
                  >
                    Read Insights
                  </Button>
                </div>
                <Card className="card-premium-resource p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Content Types</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <FileText className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Blog Posts</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Reports</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Users className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Interviews</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Alerts</span>
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
            <Card className="card-premium-case-study p-8">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-cyber-blue/10 rounded-lg">
                    <Building2 className="w-6 h-6 text-cyber-blue icon-premium" />
                  </div>
                  <Badge variant="outline" className="badge-premium text-sm px-3 py-1">Healthcare</Badge>
                </div>
                <CardTitle className="text-2xl font-bold mb-3">Regional Hospital Network</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Achieved 100% HIPAA compliance and reduced security incidents by 85%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-4 bg-cyber-blue/5 rounded-lg border border-cyber-blue/10">
                    <span className="text-muted-foreground font-medium">Security Incidents:</span>
                    <span className="font-bold text-cyber-blue text-lg">↓ 85%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-cyber-blue/5 rounded-lg border border-cyber-blue/10">
                    <span className="text-muted-foreground font-medium">Compliance Score:</span>
                    <span className="font-bold text-cyber-blue text-lg">↑ 100%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-cyber-blue/5 rounded-lg border border-cyber-blue/10">
                    <span className="text-muted-foreground font-medium">Response Time:</span>
                    <span className="font-bold text-cyber-blue text-lg">↓ 60%</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="btn-premium w-full py-3 text-lg font-semibold">
                      Read Full Case Study
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
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
            <Card className="card-premium-case-study p-8">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-cyber-blue/10 rounded-lg">
                    <Server className="w-6 h-6 text-cyber-blue icon-premium" />
                  </div>
                  <Badge variant="outline" className="badge-premium text-sm px-3 py-1">Manufacturing</Badge>
                </div>
                <CardTitle className="text-2xl font-bold mb-3">Global Manufacturing Corp</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Protected critical infrastructure and prevented $15M in potential losses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-4 bg-cyber-blue/5 rounded-lg border border-cyber-blue/10">
                    <span className="text-muted-foreground font-medium">Downtime:</span>
                    <span className="font-bold text-cyber-blue text-lg">↓ 95%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-cyber-blue/5 rounded-lg border border-cyber-blue/10">
                    <span className="text-muted-foreground font-medium">Threat Detection:</span>
                    <span className="font-bold text-cyber-blue text-lg">↑ 99.9%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-cyber-blue/5 rounded-lg border border-cyber-blue/10">
                    <span className="text-muted-foreground font-medium">Cost Savings:</span>
                    <span className="font-bold text-cyber-blue text-lg">$15M</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="btn-premium w-full py-3 text-lg font-semibold">
                      Read Full Case Study
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
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
            <Card className="card-premium-case-study p-8">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-cyber-blue/10 rounded-lg">
                    <Database className="w-6 h-6 text-cyber-blue icon-premium" />
                  </div>
                  <Badge variant="outline" className="badge-premium text-sm px-3 py-1">Financial</Badge>
                </div>
                <CardTitle className="text-2xl font-bold mb-3">FinTech Startup</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Achieved SOC 2 compliance in 90 days and secured $50M funding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-4 bg-cyber-blue/5 rounded-lg border border-cyber-blue/10">
                    <span className="text-muted-foreground font-medium">Compliance Time:</span>
                    <span className="font-bold text-cyber-blue text-lg">90 days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-cyber-blue/5 rounded-lg border border-cyber-blue/10">
                    <span className="text-muted-foreground font-medium">Funding Secured:</span>
                    <span className="font-bold text-cyber-blue text-lg">$50M</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-cyber-blue/5 rounded-lg border border-cyber-blue/10">
                    <span className="text-muted-foreground font-medium">Customer Trust:</span>
                    <span className="font-bold text-cyber-blue text-lg">↑ 300%</span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="btn-premium w-full py-3 text-lg font-semibold">
                      Read Full Case Study
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
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
            <TabsList className="grid w-full grid-cols-4 bg-surface/50 p-2 gap-2 rounded-lg">
              <TabsTrigger value="company" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Company</TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Team</TabsTrigger>
              <TabsTrigger value="certifications" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Certifications</TabsTrigger>
              <TabsTrigger value="partners" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Partners</TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                <Card className="card-premium p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Why Choose N-total?</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Shield className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Mission-Critical Protection</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Brain className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">AI-Powered Innovation</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Users className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Trusted Partnerships</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Globe className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Global Expertise</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                      <span>Global security research network</span>
                    </div>
                  </div>
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const contactTab = document.querySelector('[value="contact-form"]') as HTMLElement;
                        contactTab?.click();
                      }, 500);
                    }}
                  >
                    Meet Our Team
                  </Button>
                </div>
                <Card className="card-premium p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Team Expertise</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Shield className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Network Security</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Server className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Cloud Security</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Database className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Data Protection</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Brain className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">AI & ML Security</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="certifications" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const contactTab = document.querySelector('[value="contact-form"]') as HTMLElement;
                        contactTab?.click();
                      }, 500);
                    }}
                  >
                    View Certifications
                  </Button>
                </div>
                <Card className="card-premium p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Compliance Standards</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Lock className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">HIPAA Compliance</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Shield className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">PCI DSS</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <FileText className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">SOX Compliance</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Building2 className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">GLBA Compliance</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="partners" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const contactTab = document.querySelector('[value="contact-form"]') as HTMLElement;
                        contactTab?.click();
                      }, 500);
                    }}
                  >
                    Our Partners
                  </Button>
                </div>
                <Card className="card-premium p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Partnership Types</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Building2 className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Technology Vendors</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Academic Institutions</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Users className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Government Agencies</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Globe className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Industry Groups</span>
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
            <TabsList className="grid w-full grid-cols-3 bg-surface/50 p-2 gap-2 rounded-lg">
              <TabsTrigger value="contact-form" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Contact Form</TabsTrigger>
              <TabsTrigger value="demo-request" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Demo Request</TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white px-4 py-3 text-sm font-medium rounded-md transition-all">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="contact-form" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                      <div className="space-y-3">
                        <Button
                          variant="hero"
                          size="lg"
                          className="w-full cursor-pointer"
                          onClick={() => {
                            // Collect form data and send assessment request
                            const nameInput = document.querySelector('input[placeholder="Your Name"]') as HTMLInputElement;
                            const emailInput = document.querySelector('input[placeholder="Email Address"]') as HTMLInputElement;
                            const companyInput = document.querySelector('input[placeholder="Company Name"]') as HTMLInputElement;
                            const messageInput = document.querySelector('textarea[placeholder*="cybersecurity challenges"]') as HTMLTextAreaElement;

                            const name = nameInput?.value || '[Name not provided]';
                            const email = emailInput?.value || '[Email not provided]';
                            const company = companyInput?.value || '[Company not provided]';
                            const message = messageInput?.value || '[No message provided]';

                            // Create email with form data
                            const subject = encodeURIComponent('Free Security Assessment Request - N-Total Cybersecurity');
                            const body = encodeURIComponent(`Hello N-Total Team,

I am requesting a free security assessment for my organization.

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
Company: ${company}

CYBERSECURITY CHALLENGES:
${message}

ASSESSMENT REQUEST:
I would like to schedule a complimentary security evaluation and receive personalized recommendations for my organization's cybersecurity posture.

Please contact me to arrange the assessment.

Best regards,
${name}`);

                            // Send email
                            window.location.href = `mailto:assessment@n-total.com?subject=${subject}&body=${body}`;

                            // Show confirmation message
                            alert('Thank you for your request! Your assessment request has been prepared. Please send the email to complete your request.');

                            // Optional: Clear form after submission
                            if (nameInput) nameInput.value = '';
                            if (emailInput) emailInput.value = '';
                            if (companyInput) companyInput.value = '';
                            if (messageInput) messageInput.value = '';
                          }}
                        >
                          Request Free Assessment
                          <ChevronRight className="ml-2" />
                        </Button>
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full group"
                            onClick={() => {
                              const dropdown = document.getElementById('consultation-dropdown');
                              if (dropdown) {
                                dropdown.classList.toggle('hidden');
                              }
                            }}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Consultation
                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>

                          {/* Dropdown Menu */}
                          <div
                            id="consultation-dropdown"
                            className="hidden absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-10"
                          >
                            <div className="p-2 space-y-1">
                              <button
                                className="w-full text-left px-3 py-2 text-sm hover:bg-cyber-blue/10 rounded-md transition-colors flex items-center"
                                onClick={() => {
                                  // Local Outlook (Windows)
                                  const subject = 'N-Total Cybersecurity Consultation';
                                  const body = `Hello N-Total Team,

I would like to schedule a consultation to discuss my organization's cybersecurity needs.

Organization: [Your Organization Name]
Industry: [Your Industry]
Current Challenges: [Brief description of your cybersecurity challenges]

Please contact me to arrange a suitable time.

Best regards`;

                                  const startDate = new Date();
                                  startDate.setDate(startDate.getDate() + 3);
                                  const endDate = new Date(startDate);
                                  endDate.setMinutes(startDate.getMinutes() + 30);

                                  const outlookDesktopUrl = `outlook://calendar/action/compose?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}`;
                                  window.location.href = outlookDesktopUrl;

                                  document.getElementById('consultation-dropdown')?.classList.add('hidden');
                                }}
                              >
                                <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M7 18c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zM7 3c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" />
                                </svg>
                                Local Outlook (Desktop)
                              </button>

                              <button
                                className="w-full text-left px-3 py-2 text-sm hover:bg-cyber-blue/10 rounded-md transition-colors flex items-center"
                                onClick={() => {
                                  // Web Outlook
                                  const subject = encodeURIComponent('N-Total Cybersecurity Consultation');
                                  const body = encodeURIComponent(`Hello N-Total Team,

I would like to schedule a consultation to discuss my organization's cybersecurity needs.

Organization: [Your Organization Name]
Industry: [Your Industry]
Current Challenges: [Brief description of your cybersecurity challenges]

Please contact me to arrange a suitable time.

Best regards`);

                                  const startDate = new Date();
                                  startDate.setDate(startDate.getDate() + 3);
                                  const endDate = new Date(startDate);
                                  endDate.setMinutes(startDate.getMinutes() + 30);

                                  const outlookWebUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&body=${body}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}`;
                                  window.open(outlookWebUrl, '_blank');

                                  document.getElementById('consultation-dropdown')?.classList.add('hidden');
                                }}
                              >
                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                Web Outlook
                              </button>

                              <button
                                className="w-full text-left px-3 py-2 text-sm hover:bg-cyber-blue/10 rounded-md transition-colors flex items-center"
                                onClick={() => {
                                  // Google Calendar
                                  const subject = encodeURIComponent('N-Total Cybersecurity Consultation');
                                  const details = encodeURIComponent(`Hello N-Total Team,

I would like to schedule a consultation to discuss my organization's cybersecurity needs.

Organization: [Your Organization Name]
Industry: [Your Industry]
Current Challenges: [Brief description of your cybersecurity challenges]

Please contact me to arrange a suitable time.

Best regards`);

                                  const startDate = new Date();
                                  startDate.setDate(startDate.getDate() + 3);
                                  const endDate = new Date(startDate);
                                  endDate.setMinutes(startDate.getMinutes() + 30);

                                  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${subject}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${details}`;
                                  window.open(googleCalUrl, '_blank');

                                  document.getElementById('consultation-dropdown')?.classList.add('hidden');
                                }}
                              >
                                <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                                </svg>
                                Google Calendar
                              </button>

                              <button
                                className="w-full text-left px-3 py-2 text-sm hover:bg-cyber-blue/10 rounded-md transition-colors flex items-center"
                                onClick={() => {
                                  // Direct Email
                                  const subject = encodeURIComponent('Consultation Request - N-Total Cybersecurity');
                                  const body = encodeURIComponent(`Hello N-Total Team,

I would like to schedule a consultation to discuss my organization's cybersecurity needs.

Organization: [Your Organization Name]
Industry: [Your Industry]
Current Challenges: [Brief description of your cybersecurity challenges]
Preferred Meeting Time: [Your preferred date and time]
Preferred Meeting Format: [In-person / Video call / Phone call]

Please contact me to arrange a suitable time for the consultation.

Best regards,
[Your Name]
[Your Title]
[Your Phone Number]
[Your Email Address]`);

                                  window.location.href = `mailto:consultation@n-total.com?subject=${subject}&body=${body}`;

                                  document.getElementById('consultation-dropdown')?.classList.add('hidden');
                                }}
                              >
                                <Mail className="w-4 h-4 mr-2 text-gray-600" />
                                Send Email Request
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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

                  <Card className="card-premium p-6">
                    <CardHeader className="px-0 pt-0 pb-4">
                      <CardTitle className="text-xl text-cyber-blue font-bold">Why Choose N-total?</CardTitle>
                      <div className="w-12 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-2"></div>
                    </CardHeader>
                    <CardContent className="px-0">
                      <ul className="space-y-4">
                        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                          <div className="w-3 h-3 bg-cyber-blue rounded-full shadow-sm"></div>
                          <span className="font-medium">Industry-leading expertise and innovation</span>
                        </li>
                        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                          <div className="w-3 h-3 bg-cyber-blue rounded-full shadow-sm"></div>
                          <span className="font-medium">Tailored solutions for your unique needs</span>
                        </li>
                        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                          <div className="w-3 h-3 bg-cyber-blue rounded-full shadow-sm"></div>
                          <span className="font-medium">24/7 support and monitoring</span>
                        </li>
                        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                          <div className="w-3 h-3 bg-cyber-blue rounded-full shadow-sm"></div>
                          <span className="font-medium">Proven track record with enterprises</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="demo-request" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <div className="relative flex-1">
                      <Button
                        variant="cyber"
                        className="w-full group"
                        onClick={() => {
                          const dropdown = document.getElementById('demo-meeting-dropdown');
                          if (dropdown) {
                            dropdown.classList.toggle('hidden');
                          }
                        }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Meeting
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>

                      {/* Dropdown Menu */}
                      <div
                        id="demo-meeting-dropdown"
                        className="hidden absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-10"
                      >
                        <div className="p-2 space-y-1">
                          <button
                            className="w-full text-left px-3 py-2 text-sm hover:bg-cyber-blue/10 rounded-md transition-colors flex items-center"
                            onClick={() => {
                              // Local Outlook (Windows)
                              const subject = 'N-Total Cybersecurity Demo Request';
                              const body = `Hello N-Total Team,

I would like to schedule a personalized cybersecurity demo for my organization.

Organization: [Your Organization Name]
Industry: [Your Industry]
Preferred Demo Type: [Executive Overview / Technical Deep Dive / Industry-Specific]
Preferred Time: [Your Preferred Time]

Please contact me to arrange a suitable time for the demonstration.

Best regards`;

                              const startDate = new Date();
                              startDate.setDate(startDate.getDate() + 7);
                              const endDate = new Date(startDate);
                              endDate.setHours(startDate.getHours() + 1);

                              const outlookDesktopUrl = `outlook://calendar/action/compose?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}`;
                              window.location.href = outlookDesktopUrl;

                              document.getElementById('demo-meeting-dropdown')?.classList.add('hidden');
                            }}
                          >
                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7 18c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zM7 3c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z" />
                            </svg>
                            Local Outlook (Desktop)
                          </button>

                          <button
                            className="w-full text-left px-3 py-2 text-sm hover:bg-cyber-blue/10 rounded-md transition-colors flex items-center"
                            onClick={() => {
                              // Web Outlook
                              const subject = encodeURIComponent('N-Total Cybersecurity Demo Request');
                              const body = encodeURIComponent(`Hello N-Total Team,

I would like to schedule a personalized cybersecurity demo for my organization.

Organization: [Your Organization Name]
Industry: [Your Industry]
Preferred Demo Type: [Executive Overview / Technical Deep Dive / Industry-Specific]
Preferred Time: [Your Preferred Time]

Please contact me to arrange a suitable time for the demonstration.

Best regards`);

                              const startDate = new Date();
                              startDate.setDate(startDate.getDate() + 7);
                              const endDate = new Date(startDate);
                              endDate.setHours(startDate.getHours() + 1);

                              const outlookWebUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&body=${body}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}`;
                              window.open(outlookWebUrl, '_blank');

                              document.getElementById('demo-meeting-dropdown')?.classList.add('hidden');
                            }}
                          >
                            <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            Web Outlook
                          </button>

                          <button
                            className="w-full text-left px-3 py-2 text-sm hover:bg-cyber-blue/10 rounded-md transition-colors flex items-center"
                            onClick={() => {
                              // Google Calendar
                              const subject = encodeURIComponent('N-Total Cybersecurity Demo Request');
                              const details = encodeURIComponent(`Hello N-Total Team,

I would like to schedule a personalized cybersecurity demo for my organization.

Organization: [Your Organization Name]
Industry: [Your Industry]
Preferred Demo Type: [Executive Overview / Technical Deep Dive / Industry-Specific]
Preferred Time: [Your Preferred Time]

Please contact me to arrange a suitable time for the demonstration.

Best regards`);

                              const startDate = new Date();
                              startDate.setDate(startDate.getDate() + 7);
                              const endDate = new Date(startDate);
                              endDate.setHours(startDate.getHours() + 1);

                              const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${subject}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${details}`;
                              window.open(googleCalUrl, '_blank');

                              document.getElementById('demo-meeting-dropdown')?.classList.add('hidden');
                            }}
                          >
                            <svg className="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                            </svg>
                            Google Calendar
                          </button>

                          <button
                            className="w-full text-left px-3 py-2 text-sm hover:bg-cyber-blue/10 rounded-md transition-colors flex items-center"
                            onClick={() => {
                              // Direct Email
                              const subject = encodeURIComponent('Demo Request - N-Total Cybersecurity');
                              const body = encodeURIComponent(`Hello N-Total Team,

I am interested in scheduling a personalized demo of your cybersecurity solutions.

Organization: [Your Organization Name]
Industry: [Your Industry]
Preferred Demo Type: [Executive Overview / Technical Deep Dive / Industry-Specific]
Preferred Time: [Your Preferred Time]
Preferred Meeting Format: [In-person / Video call / Phone call]

Please contact me to arrange a suitable time for the demonstration.

Best regards,
[Your Name]
[Your Title]
[Your Phone Number]
[Your Email Address]`);

                              window.location.href = `mailto:demo@n-total.com?subject=${subject}&body=${body}`;

                              document.getElementById('demo-meeting-dropdown')?.classList.add('hidden');
                            }}
                          >
                            <Mail className="w-4 h-4 mr-2 text-gray-600" />
                            Send Email Request
                          </button>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        // Alternative: mailto link for direct email
                        const subject = encodeURIComponent('Demo Request - N-Total Cybersecurity');
                        const body = encodeURIComponent(`Hello N-Total Team,

I am interested in scheduling a personalized demo of your cybersecurity solutions.

Organization: [Your Organization Name]
Industry: [Your Industry]
Preferred Demo Type: [Executive Overview / Technical Deep Dive / Industry-Specific]
Preferred Time: [Your Preferred Time]

Please contact me to arrange a suitable time for the demonstration.

Best regards,
[Your Name]
[Your Title]
[Your Contact Information]`);

                        window.location.href = `mailto:demo@n-total.com?subject=${subject}&body=${body}`;
                      }}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email Request
                    </Button>
                  </div>
                </div>
                <Card className="card-premium p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Demo Options</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Users className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Executive Overview</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Shield className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Technical Deep Dive</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Building2 className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Industry-Specific Solutions</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Target className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Use Case Scenarios</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-12">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                  <Button
                    variant="cyber"
                    className="mt-6 cursor-pointer"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      setTimeout(() => {
                        const supportTab = document.querySelector('[value="support"]') as HTMLElement;
                        supportTab?.click();
                      }, 500);
                    }}
                  >
                    Contact Support
                  </Button>
                </div>
                <Card className="card-premium p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl text-cyber-blue font-bold">Support Channels</CardTitle>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyber-blue to-cyber-blue/60 rounded-full mt-3"></div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Mail className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Email Support</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Phone className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Phone Support</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Live Chat</span>
                    </div>
                    <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-cyber-blue/5 transition-colors duration-300">
                      <div className="p-2 bg-cyber-blue/10 rounded-lg">
                        <Calendar className="w-6 h-6 text-cyber-blue icon-premium" />
                      </div>
                      <span className="font-medium">Video Support</span>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // You can add actual privacy policy link here
                  alert('Privacy Policy - Please add your privacy policy link');
                }}
              >
                Privacy Policy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // You can add actual terms of service link here
                  alert('Terms of Service - Please add your terms of service link');
                }}
              >
                Terms of Service
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </Button>
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