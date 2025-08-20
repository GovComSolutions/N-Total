#!/usr/bin/env node

/**
 * Deployment Report Generator Script
 * This script generates comprehensive deployment reports
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

class DeploymentReportGenerator {
  constructor() {
    this.report = {
      timestamp: new Date().toISOString(),
      deployment: {
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '0.0.0',
        commit: process.env.GITHUB_SHA || 'unknown',
        branch: process.env.GITHUB_REF_NAME || 'unknown',
        buildNumber: process.env.GITHUB_RUN_NUMBER || 'unknown'
      },
      application: {
        name: 'N-Total Cybersecurity',
        type: 'React + TypeScript + Vite',
        features: [
          'RAG Pipeline Integration',
          'AI Chatbot',
          'Interactive UI Components',
          'Responsive Design',
          'Theme System (Light/Dark)',
          'Cybersecurity Content Management'
        ]
      },
      quality: {
        tests: {
          unit: { status: 'pending', coverage: 0 },
          integration: { status: 'pending', coverage: 0 },
          e2e: { status: 'pending', passed: 0, total: 0 }
        },
        security: {
          audit: { status: 'pending', vulnerabilities: 0 },
          scanning: { status: 'pending', issues: 0 }
        },
        performance: {
          lighthouse: { status: 'pending', score: 0 },
          bundle: { status: 'pending', size: 0 }
        }
      },
      rag: {
        knowledgeBase: {
          totalItems: 0,
          categories: [],
          types: []
        },
        pipeline: {
          status: 'pending',
          responseTime: 0,
          confidence: 0
        }
      },
      deployment: {
        status: 'pending',
        url: '',
        timestamp: '',
        duration: 0
      }
    };
  }

  async generateReport() {
    console.log('📊 Generating Deployment Report...');
    console.log('==================================');
    console.log('');
    
    try {
      // Gather application information
      await this.gatherApplicationInfo();
      
      // Gather quality metrics
      await this.gatherQualityMetrics();
      
      // Gather RAG pipeline metrics
      await this.gatherRAGMetrics();
      
      // Generate the report
      const reportContent = this.formatReport();
      
      // Save report to file
      this.saveReport(reportContent);
      
      // Display summary
      this.displaySummary();
      
    } catch (error) {
      console.error('❌ Failed to generate deployment report:', error);
      process.exit(1);
    }
  }

  async gatherApplicationInfo() {
    try {
      // Read package.json
      const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
      this.report.application.version = packageJson.version;
      this.report.application.dependencies = Object.keys(packageJson.dependencies || {}).length;
      this.report.application.devDependencies = Object.keys(packageJson.devDependencies || {}).length;
      
      // Read source files
      const sourceFiles = this.countSourceFiles();
      this.report.application.sourceFiles = sourceFiles;
      
      console.log('✅ Application information gathered');
    } catch (error) {
      console.log('⚠️  Could not gather application information:', error.message);
    }
  }

  async gatherQualityMetrics() {
    try {
      // Check for test coverage reports
      if (this.fileExists('coverage/lcov.info')) {
        this.report.quality.tests.unit.status = 'completed';
        this.report.quality.tests.unit.coverage = this.extractCoverage();
      }
      
      // Check for security audit results
      if (this.fileExists('security-report.json')) {
        const securityReport = JSON.parse(readFileSync('security-report.json', 'utf8'));
        this.report.quality.security.audit.status = 'completed';
        this.report.quality.security.audit.vulnerabilities = securityReport.vulnerabilities || 0;
      }
      
      // Check for Lighthouse results
      if (this.fileExists('.lighthouseci/lhr.json')) {
        const lighthouseReport = JSON.parse(readFileSync('.lighthouseci/lhr.json', 'utf8'));
        this.report.quality.performance.lighthouse.status = 'completed';
        this.report.quality.performance.lighthouse.score = lighthouseReport.categories?.performance?.score || 0;
      }
      
      console.log('✅ Quality metrics gathered');
    } catch (error) {
      console.log('⚠️  Could not gather quality metrics:', error.message);
    }
  }

  async gatherRAGMetrics() {
    try {
      // Import RAG pipeline functions
      const { knowledgeStore, processQuery } = await import('../src/lib/rag-pipeline.js');
      
      // Gather knowledge base metrics
      this.report.rag.knowledgeBase.totalItems = knowledgeStore.length;
      this.report.rag.knowledgeBase.categories = [...new Set(knowledgeStore.map(item => item.category))];
      this.report.rag.knowledgeBase.types = [...new Set(knowledgeStore.map(item => item.metadata.type))];
      
      // Test RAG pipeline
      const startTime = Date.now();
      const response = await processQuery('What cybersecurity services do you offer?');
      const responseTime = Date.now() - startTime;
      
      this.report.rag.pipeline.status = 'operational';
      this.report.rag.pipeline.responseTime = responseTime;
      this.report.rag.pipeline.confidence = response.confidence;
      
      console.log('✅ RAG pipeline metrics gathered');
    } catch (error) {
      console.log('⚠️  Could not gather RAG pipeline metrics:', error.message);
      this.report.rag.pipeline.status = 'error';
      this.report.rag.pipeline.error = error.message;
    }
  }

  countSourceFiles() {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    let count = 0;
    
    try {
      // Simple file counting (in production, you might want to use a more sophisticated approach)
      const sourceDirs = ['src/', 'components/', 'lib/'];
      sourceDirs.forEach(dir => {
        if (this.fileExists(dir)) {
          // This is a simplified count - in reality you'd traverse directories
          count += 10; // Placeholder
        }
      });
    } catch (error) {
      console.log('⚠️  Could not count source files:', error.message);
    }
    
    return count;
  }

  extractCoverage() {
    try {
      const lcov = readFileSync('coverage/lcov.info', 'utf8');
      const lines = lcov.split('\n');
      const summaryLine = lines.find(line => line.startsWith('LF:'));
      if (summaryLine) {
        const match = summaryLine.match(/LF:(\d+),LH:(\d+)/);
        if (match) {
          const total = parseInt(match[1]);
          const covered = parseInt(match[2]);
          return total > 0 ? (covered / total) * 100 : 0;
        }
      }
    } catch (error) {
      console.log('⚠️  Could not extract coverage:', error.message);
    }
    return 0;
  }

  fileExists(path) {
    try {
      readFileSync(path);
      return true;
    } catch {
      return false;
    }
  }

  formatReport() {
    const report = {
      ...this.report,
      summary: this.generateSummary()
    };
    
    return JSON.stringify(report, null, 2);
  }

  generateSummary() {
    const qualityScore = this.calculateQualityScore();
    const ragScore = this.calculateRAGScore();
    const overallScore = (qualityScore + ragScore) / 2;
    
    return {
      overallScore: overallScore.toFixed(1),
      qualityScore: qualityScore.toFixed(1),
      ragScore: ragScore.toFixed(1),
      status: this.getStatus(overallScore),
      recommendations: this.generateRecommendations()
    };
  }

  calculateQualityScore() {
    let score = 0;
    let total = 0;
    
    // Test coverage
    if (this.report.quality.tests.unit.status === 'completed') {
      score += this.report.quality.tests.unit.coverage;
      total += 100;
    }
    
    // Security
    if (this.report.quality.security.audit.status === 'completed') {
      const securityScore = Math.max(0, 100 - (this.report.quality.security.audit.vulnerabilities * 10));
      score += securityScore;
      total += 100;
    }
    
    // Performance
    if (this.report.quality.performance.lighthouse.status === 'completed') {
      score += this.report.quality.performance.lighthouse.score * 100;
      total += 100;
    }
    
    return total > 0 ? score / total : 0;
  }

  calculateRAGScore() {
    if (this.report.rag.pipeline.status !== 'operational') {
      return 0;
    }
    
    let score = 100;
    
    // Deduct points for slow responses
    if (this.report.rag.pipeline.responseTime > 1000) {
      score -= Math.min(30, (this.report.rag.pipeline.responseTime - 1000) / 100);
    }
    
    // Deduct points for low confidence
    if (this.report.rag.pipeline.confidence < 0.5) {
      score -= (0.5 - this.report.rag.pipeline.confidence) * 60;
    }
    
    // Bonus for knowledge base size
    if (this.report.rag.knowledgeBase.totalItems > 20) {
      score += Math.min(10, (this.report.rag.knowledgeBase.totalItems - 20) / 2);
    }
    
    return Math.max(0, Math.min(100, score));
  }

  getStatus(score) {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'fair';
    return 'poor';
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.report.quality.tests.unit.coverage < 80) {
      recommendations.push('Increase unit test coverage to at least 80%');
    }
    
    if (this.report.quality.security.audit.vulnerabilities > 0) {
      recommendations.push('Address security vulnerabilities identified in audit');
    }
    
    if (this.report.quality.performance.lighthouse.score < 0.8) {
      recommendations.push('Improve performance scores in Lighthouse CI');
    }
    
    if (this.report.rag.pipeline.responseTime > 1000) {
      recommendations.push('Optimize RAG pipeline response times');
    }
    
    if (this.report.rag.pipeline.confidence < 0.7) {
      recommendations.push('Improve RAG pipeline confidence scores');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('All systems are performing optimally');
    }
    
    return recommendations;
  }

  saveReport(content) {
    try {
      // Create reports directory if it doesn't exist
      if (!this.fileExists('reports')) {
        mkdirSync('reports', { recursive: true });
      }
      
      const filename = `reports/deployment-report-${Date.now()}.json`;
      writeFileSync(filename, content);
      
      console.log(`✅ Deployment report saved to: ${filename}`);
    } catch (error) {
      console.log('⚠️  Could not save report:', error.message);
    }
  }

  displaySummary() {
    console.log('');
    console.log('📋 Deployment Report Summary');
    console.log('=============================');
    console.log(`Overall Score: ${this.report.summary.overallScore}%`);
    console.log(`Quality Score: ${this.report.summary.qualityScore}%`);
    console.log(`RAG Score: ${this.report.summary.ragScore}%`);
    console.log(`Status: ${this.report.summary.status.toUpperCase()}`);
    console.log('');
    
    console.log('💡 Recommendations:');
    this.report.summary.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
    
    console.log('');
    console.log('🎉 Deployment report generation completed!');
  }
}

// Run report generation
async function main() {
  const generator = new DeploymentReportGenerator();
  await generator.generateReport();
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

// Run report generation
main().catch(error => {
  console.error('Report generation failed:', error);
  process.exit(1);
});
