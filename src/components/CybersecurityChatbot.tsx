import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  FileText, 
  Building2, 
  Shield, 
  Users, 
  Award,
  X,
  Minimize2,
  Maximize2,
  Lightbulb,
  BookOpen,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { processQuery, ChatMessage, RAGResponse } from '@/lib/rag-pipeline';
import { KnowledgeItem } from '@/lib/knowledge-store';

interface CybersecurityChatbotProps {
  className?: string;
}

export const CybersecurityChatbot: React.FC<CybersecurityChatbotProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your N-Total Cybersecurity AI assistant. I can help you learn about our services, industry solutions, case studies, and company information. What would you like to know about today?",
      timestamp: new Date(),
      sources: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await processQuery(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        sources: response.sources
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try asking your question again or contact our team directly for immediate assistance.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'service': return <Shield className="w-4 h-4" />;
      case 'solution': return <Building2 className="w-4 h-4" />;
      case 'case-study': return <TrendingUp className="w-4 h-4" />;
      case 'company': return <Users className="w-4 h-4" />;
      case 'resource': return <BookOpen className="w-4 h-4" />;
      case 'testimonial': return <Award className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'solution': return 'bg-green-100 text-green-800 border-green-200';
      case 'case-study': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'company': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'resource': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'testimonial': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-12 w-12 rounded-full bg-cyber-blue hover:bg-cyber-blue/90 shadow-lg"
        >
          <Maximize2 className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 px-6 rounded-full bg-cyber-blue hover:bg-cyber-blue/90 shadow-lg text-white font-medium"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Chat with N-Total AI
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-96 max-w-[90vw] ${className}`}>
      <Card className="shadow-2xl border-cyber-blue/20">
        {/* Chat Header */}
        <CardHeader className="bg-gradient-to-r from-cyber-blue to-cyber-blue-dark text-white pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-lg">N-Total Cybersecurity AI</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-cyber-blue/90">
            Ask me about our services, solutions, case studies, or company information
          </p>
        </CardHeader>

        {/* Chat Messages */}
        <CardContent className="p-0">
          <ScrollArea className="h-96 px-4 py-2">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.role === 'user'
                        ? 'bg-cyber-blue text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot className="w-4 h-4 mt-0.5 text-cyber-blue flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        
                        {/* Sources */}
                        {message.sources && message.sources.length > 0 && (
                          <div className="mt-3 pt-2 border-t border-gray-200">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowSources(!showSources)}
                              className="h-6 px-2 text-xs text-cyber-blue hover:text-cyber-blue/80"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              {showSources ? 'Hide' : 'Show'} Sources ({message.sources.length})
                            </Button>
                            
                            {showSources && (
                              <div className="mt-2 space-y-2">
                                {message.sources.map((source) => (
                                  <div
                                    key={source.id}
                                    className={`p-2 rounded border text-xs ${getSourceColor(source.metadata.type)}`}
                                  >
                                    <div className="flex items-center space-x-2 mb-1">
                                      {getSourceIcon(source.metadata.type)}
                                      <span className="font-medium">{source.title}</span>
                                    </div>
                                    <p className="text-xs opacity-80">
                                      {source.content.substring(0, 100)}...
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-cyber-blue" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-cyber-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSuggestedQuestion("What cybersecurity services do you offer?")}
              className="text-xs h-7 px-2"
            >
              <Shield className="w-3 h-3 mr-1" />
              Services
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSuggestedQuestion("Do you have solutions for healthcare organizations?")}
              className="text-xs h-7 px-2"
            >
              <Building2 className="w-3 h-3 mr-1" />
              Healthcare
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSuggestedQuestion("Can you share some case studies?")}
              className="text-xs h-7 px-2"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Case Studies
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSuggestedQuestion("What certifications does N-Total have?")}
              className="text-xs h-7 px-2"
            >
              <Award className="w-3 h-3 mr-1" />
              Certifications
            </Button>
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about our cybersecurity solutions..."
              className="flex-1 text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="sm"
              className="bg-cyber-blue hover:bg-cyber-blue/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
