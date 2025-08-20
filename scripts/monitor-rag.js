#!/usr/bin/env node

/**
 * RAG Pipeline Monitoring Script
 * This script monitors the performance and health of the RAG pipeline
 */

import { processQuery } from '../src/lib/rag-pipeline.js';

const MONITORING_QUERIES = [
  'What cybersecurity services do you offer?',
  'Do you have healthcare solutions?',
  'Can you share some case studies?',
  'What certifications does N-Total have?'
];

class RAGMonitor {
  constructor() {
    this.metrics = {
      totalQueries: 0,
      successfulQueries: 0,
      failedQueries: 0,
      averageResponseTime: 0,
      totalResponseTime: 0,
      confidenceScores: [],
      sourceCounts: [],
      errors: []
    };
  }

  async monitorQuery(query) {
    const startTime = Date.now();
    
    try {
      const response = await processQuery(query);
      const responseTime = Date.now() - startTime;
      
      this.metrics.totalQueries++;
      this.metrics.successfulQueries++;
      this.metrics.totalResponseTime += responseTime;
      this.metrics.averageResponseTime = this.metrics.totalResponseTime / this.metrics.successfulQueries;
      
      if (response.confidence !== undefined) {
        this.metrics.confidenceScores.push(response.confidence);
      }
      
      if (response.sources) {
        this.metrics.sourceCounts.push(response.sources.length);
      }
      
      return {
        status: 'success',
        query,
        responseTime,
        confidence: response.confidence,
        sourceCount: response.sources?.length || 0,
        response: response.answer.substring(0, 100) + '...'
      };
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      this.metrics.totalQueries++;
      this.metrics.failedQueries++;
      this.metrics.errors.push({
        query,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      
      return {
        status: 'error',
        query,
        responseTime,
        error: error.message
      };
    }
  }

  async runMonitoring() {
    console.log('🔍 Starting RAG Pipeline Monitoring...');
    console.log('=====================================');
    console.log('');
    
    const results = [];
    
    for (const query of MONITORING_QUERIES) {
      console.log(`📝 Monitoring Query: "${query}"`);
      const result = await this.monitorQuery(query);
      results.push(result);
      
      if (result.status === 'success') {
        console.log(`✅ Success - Time: ${result.responseTime}ms, Confidence: ${result.confidence?.toFixed(2)}, Sources: ${result.sourceCount}`);
      } else {
        console.log(`❌ Error - Time: ${result.responseTime}ms, Error: ${result.error}`);
      }
      
      console.log('');
    }
    
    this.generateReport();
  }

  generateReport() {
    console.log('📊 RAG Pipeline Monitoring Report');
    console.log('==================================');
    console.log('');
    
    // Basic metrics
    console.log('📈 Performance Metrics:');
    console.log(`  Total Queries: ${this.metrics.totalQueries}`);
    console.log(`  Successful: ${this.metrics.successfulQueries}`);
    console.log(`  Failed: ${this.metrics.failedQueries}`);
    console.log(`  Success Rate: ${((this.metrics.successfulQueries / this.metrics.totalQueries) * 100).toFixed(1)}%`);
    console.log(`  Average Response Time: ${this.metrics.averageResponseTime.toFixed(2)}ms`);
    console.log('');
    
    // Confidence analysis
    if (this.metrics.confidenceScores.length > 0) {
      const avgConfidence = this.metrics.confidenceScores.reduce((a, b) => a + b, 0) / this.metrics.confidenceScores.length;
      const minConfidence = Math.min(...this.metrics.confidenceScores);
      const maxConfidence = Math.max(...this.metrics.confidenceScores);
      
      console.log('🎯 Confidence Analysis:');
      console.log(`  Average Confidence: ${avgConfidence.toFixed(3)}`);
      console.log(`  Min Confidence: ${minConfidence.toFixed(3)}`);
      console.log(`  Max Confidence: ${maxConfidence.toFixed(3)}`);
      console.log('');
    }
    
    // Source analysis
    if (this.metrics.sourceCounts.length > 0) {
      const avgSources = this.metrics.sourceCounts.reduce((a, b) => a + b, 0) / this.metrics.sourceCounts.length;
      const minSources = Math.min(...this.metrics.sourceCounts);
      const maxSources = Math.max(...this.metrics.sourceCounts);
      
      console.log('📚 Source Analysis:');
      console.log(`  Average Sources: ${avgSources.toFixed(1)}`);
      console.log(`  Min Sources: ${minSources}`);
      console.log(`  Max Sources: ${maxSources}`);
      console.log('');
    }
    
    // Error analysis
    if (this.metrics.errors.length > 0) {
      console.log('⚠️  Error Analysis:');
      this.metrics.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. Query: "${error.query}"`);
        console.log(`     Error: ${error.error}`);
        console.log(`     Time: ${error.timestamp}`);
      });
      console.log('');
    }
    
    // Health assessment
    const healthScore = this.calculateHealthScore();
    console.log('🏥 Health Assessment:');
    console.log(`  Overall Health Score: ${healthScore.toFixed(1)}%`);
    
    if (healthScore >= 90) {
      console.log('  Status: 🟢 Excellent - RAG pipeline is performing optimally');
    } else if (healthScore >= 75) {
      console.log('  Status: 🟡 Good - RAG pipeline is performing well with minor issues');
    } else if (healthScore >= 60) {
      console.log('  Status: 🟠 Fair - RAG pipeline has some performance issues');
    } else {
      console.log('  Status: 🔴 Poor - RAG pipeline has significant issues requiring attention');
    }
  }

  calculateHealthScore() {
    let score = 100;
    
    // Deduct points for failures
    if (this.metrics.totalQueries > 0) {
      const failureRate = this.metrics.failedQueries / this.metrics.totalQueries;
      score -= failureRate * 40; // Up to 40 points for failures
    }
    
    // Deduct points for slow responses
    if (this.metrics.averageResponseTime > 1000) {
      score -= Math.min(20, (this.metrics.averageResponseTime - 1000) / 100); // Up to 20 points for slow responses
    }
    
    // Deduct points for low confidence
    if (this.metrics.confidenceScores.length > 0) {
      const avgConfidence = this.metrics.confidenceScores.reduce((a, b) => a + b, 0) / this.metrics.confidenceScores.length;
      if (avgConfidence < 0.5) {
        score -= (0.5 - avgConfidence) * 40; // Up to 20 points for low confidence
      }
    }
    
    return Math.max(0, score);
  }
}

// Run monitoring
async function main() {
  const monitor = new RAGMonitor();
  await monitor.runMonitoring();
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

// Run monitoring
main().catch(error => {
  console.error('Monitoring failed:', error);
  process.exit(1);
});
