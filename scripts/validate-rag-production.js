#!/usr/bin/env node

/**
 * RAG Pipeline Production Validation Script
 * This script validates that the RAG pipeline is working correctly in production
 */

import { processQuery } from '../src/lib/rag-pipeline.js';

const PRODUCTION_URL = process.env.PRODUCTION_URL || 'https://ntotal-cybersecurity.com';

// Test queries to validate RAG pipeline
const testQueries = [
  'What cybersecurity services do you offer?',
  'Do you have healthcare solutions?',
  'Can you share some case studies?',
  'What certifications does N-Total have?',
  'How do you help with HIPAA compliance?',
  'What is your AI GRC platform?'
];

async function validateRAGPipeline() {
  console.log('🔍 Validating RAG Pipeline in Production...');
  console.log(`📍 Production URL: ${PRODUCTION_URL}`);
  console.log('');

  let passedTests = 0;
  let totalTests = testQueries.length;

  for (const query of testQueries) {
    try {
      console.log(`🧪 Testing Query: "${query}"`);
      
      const response = await processQuery(query);
      
      // Validate response structure
      if (!response.answer || typeof response.answer !== 'string') {
        throw new Error('Invalid response structure: missing or invalid answer');
      }
      
      if (!Array.isArray(response.sources)) {
        throw new Error('Invalid response structure: missing sources array');
      }
      
      if (typeof response.confidence !== 'number' || response.confidence < 0 || response.confidence > 1) {
        throw new Error('Invalid response structure: invalid confidence score');
      }
      
      if (!Array.isArray(response.suggestedQuestions)) {
        throw new Error('Invalid response structure: missing suggested questions');
      }
      
      // Validate response quality
      if (response.answer.length < 50) {
        throw new Error('Response too short: answer should be at least 50 characters');
      }
      
      if (response.sources.length === 0) {
        throw new Error('No sources found: response should have at least one source');
      }
      
      if (response.confidence < 0.3) {
        throw new Error('Low confidence: response confidence should be at least 0.3');
      }
      
      console.log(`✅ PASSED - Confidence: ${response.confidence.toFixed(2)}, Sources: ${response.sources.length}`);
      console.log(`   Answer: ${response.answer.substring(0, 100)}...`);
      passedTests++;
      
    } catch (error) {
      console.log(`❌ FAILED - ${error.message}`);
    }
    
    console.log('');
  }
  
  // Generate summary
  console.log('📊 Validation Summary');
  console.log('====================');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${totalTests - passedTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All RAG pipeline tests passed!');
    process.exit(0);
  } else {
    console.log('⚠️  Some RAG pipeline tests failed. Please investigate.');
    process.exit(1);
  }
}

// Handle errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Run validation
validateRAGPipeline().catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});
