// RAG Pipeline Service for N-Total Cybersecurity Chatbot
import { searchKnowledge, KnowledgeItem } from './knowledge-store';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: KnowledgeItem[];
}

export interface RAGResponse {
  answer: string;
  sources: KnowledgeItem[];
  confidence: number;
  suggestedQuestions: string[];
}

// Context templates for different types of queries
const contextTemplates = {
  service: (item: KnowledgeItem) => 
    `Based on our ${item.title} service: ${item.content}`,
  
  solution: (item: KnowledgeItem) => 
    `For ${item.title} solutions: ${item.content}`,
  
  caseStudy: (item: KnowledgeItem) => 
    `Here's a real example: ${item.title}. ${item.content}`,
  
  company: (item: KnowledgeItem) => 
    `About N-Total Cybersecurity: ${item.content}`,
  
  resource: (item: KnowledgeItem) => 
    `We offer: ${item.title}. ${item.content}`,
  
  testimonial: (item: KnowledgeItem) => 
    `Client feedback: ${item.content}`
};

// Response generation based on query intent
const generateResponse = (query: string, relevantItems: KnowledgeItem[]): RAGResponse => {
  if (relevantItems.length === 0) {
    return {
      answer: "I don't have specific information about that topic yet. However, I can help you learn about our cybersecurity services, industry solutions, case studies, or company information. What would you like to know about?",
      sources: [],
      confidence: 0,
      suggestedQuestions: [
        "What cybersecurity services do you offer?",
        "Do you have solutions for healthcare organizations?",
        "Can you share some case studies?",
        "What certifications does N-Total have?"
      ]
    };
  }

  // Determine query intent
  const queryLower = query.toLowerCase();
  let intent = 'general';
  
  if (queryLower.includes('service') || queryLower.includes('offer') || queryLower.includes('provide')) {
    intent = 'service';
  } else if (queryLower.includes('solution') || queryLower.includes('industry') || queryLower.includes('healthcare') || queryLower.includes('finance') || queryLower.includes('manufacturing')) {
    intent = 'solution';
  } else if (queryLower.includes('case study') || queryLower.includes('example') || queryLower.includes('success') || queryLower.includes('result')) {
    intent = 'caseStudy';
  } else if (queryLower.includes('company') || queryLower.includes('team') || queryLower.includes('certification') || queryLower.includes('mission')) {
    intent = 'company';
  } else if (queryLower.includes('resource') || queryLower.includes('white paper') || queryLower.includes('tool') || queryLower.includes('assessment')) {
    intent = 'resource';
  } else if (queryLower.includes('testimonial') || queryLower.includes('client') || queryLower.includes('feedback')) {
    intent = 'testimonial';
  }

  // Generate contextual response
  let answer = '';
  const primaryItem = relevantItems[0];
  
  switch (intent) {
    case 'service':
      answer = `I'd be happy to tell you about our ${primaryItem.title}! ${contextTemplates.service(primaryItem)}`;
      break;
    case 'solution':
      answer = `Great question about ${primaryItem.title}! ${contextTemplates.solution(primaryItem)}`;
      break;
    case 'caseStudy':
      answer = `Let me share a success story with you! ${contextTemplates.caseStudy(primaryItem)}`;
      break;
    case 'company':
      answer = `I'm glad you asked about N-Total Cybersecurity! ${contextTemplates.company(primaryItem)}`;
      break;
    case 'resource':
      answer = `Absolutely! ${contextTemplates.resource(primaryItem)}`;
      break;
    case 'testimonial':
      answer = `Here's what our clients say: ${contextTemplates.testimonial(primaryItem)}`;
      break;
    default:
      answer = `Based on your question, here's what I found: ${primaryItem.content}`;
  }

  // Add additional context if available
  if (relevantItems.length > 1) {
    const additionalItems = relevantItems.slice(1, 3);
    if (additionalItems.length > 0) {
      answer += `\n\nI also found some related information:`;
      additionalItems.forEach(item => {
        answer += `\n• ${item.title}: ${item.content.substring(0, 150)}...`;
      });
    }
  }

  // Generate suggested questions based on available knowledge
  const suggestedQuestions = generateSuggestedQuestions(relevantItems, query);

  return {
    answer,
    sources: relevantItems,
    confidence: Math.min(0.9, 0.5 + (relevantItems.length * 0.1)),
    suggestedQuestions
  };
};

// Generate contextual follow-up questions
const generateSuggestedQuestions = (items: KnowledgeItem[], currentQuery: string): string[] => {
  const suggestions: string[] = [];
  const queryLower = currentQuery.toLowerCase();

  // Add industry-specific questions
  items.forEach(item => {
    if (item.metadata.industry && !queryLower.includes(item.metadata.industry.toLowerCase())) {
      suggestions.push(`What specific cybersecurity challenges does the ${item.metadata.industry} industry face?`);
    }
    
    if (item.metadata.compliance && !queryLower.includes('compliance')) {
      suggestions.push(`What compliance standards do you support for ${item.metadata.industry || 'organizations'}?`);
    }
    
    if (item.metadata.technologies && !queryLower.includes('technology')) {
      suggestions.push(`What technologies do you use for ${item.title.toLowerCase()}?`);
    }
  });

  // Add general follow-up questions
  if (!queryLower.includes('cost') && !queryLower.includes('price')) {
    suggestions.push("What are the typical costs for these services?");
  }
  
  if (!queryLower.includes('timeline') && !queryLower.includes('duration')) {
    suggestions.push("How long does it typically take to implement these solutions?");
  }
  
  if (!queryLower.includes('contact') && !queryLower.includes('demo')) {
    suggestions.push("How can I get in touch to learn more or schedule a demo?");
  }

  // Ensure we don't have too many suggestions
  return suggestions.slice(0, 4);
};

// Main RAG pipeline function
export const processQuery = async (query: string): Promise<RAGResponse> => {
  try {
    // Search for relevant knowledge
    const relevantItems = searchKnowledge(query, 5);
    
    // Generate response using RAG
    const response = generateResponse(query, relevantItems);
    
    // Add a small delay to simulate processing (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return response;
  } catch (error) {
    console.error('Error in RAG pipeline:', error);
    return {
      answer: "I apologize, but I'm experiencing some technical difficulties right now. Please try asking your question again, or contact our team directly for immediate assistance.",
      sources: [],
      confidence: 0,
      suggestedQuestions: [
        "What cybersecurity services do you offer?",
        "Can you help with compliance requirements?",
        "Do you have industry-specific solutions?"
      ]
    };
  }
};

// Enhanced search with filters
export const searchWithFilters = (
  query: string,
  filters: {
    category?: string;
    type?: string;
    industry?: string;
    compliance?: string;
  } = {}
): KnowledgeItem[] => {
  let results = searchKnowledge(query, 10);
  
  // Apply filters
  if (filters.category) {
    results = results.filter(item => item.category === filters.category);
  }
  
  if (filters.type) {
    results = results.filter(item => item.metadata.type === filters.type);
  }
  
  if (filters.industry) {
    results = results.filter(item => item.metadata.industry === filters.industry);
  }
  
  if (filters.compliance) {
    results = results.filter(item => 
      item.metadata.compliance?.some(comp => 
        comp.toLowerCase().includes(filters.compliance!.toLowerCase())
      )
    );
  }
  
  return results;
};

// Get conversation context for better responses
export const getConversationContext = (messages: ChatMessage[]): string => {
  if (messages.length === 0) return '';
  
  const recentMessages = messages.slice(-3); // Last 3 messages
  const context = recentMessages
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n');
  
  return context;
};
