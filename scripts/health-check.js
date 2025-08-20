#!/usr/bin/env node

/**
 * Application Health Check Script
 * This script performs various health checks on the application
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const HEALTH_CHECKS = {
  // File system checks
  'package.json': () => {
    try {
      const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
      if (!pkg.name || !pkg.version) {
        throw new Error('Invalid package.json structure');
      }
      return { status: 'healthy', details: `Package: ${pkg.name}@${pkg.version}` };
    } catch (error) {
      return { status: 'unhealthy', details: `package.json error: ${error.message}` };
    }
  },
  
  'tsconfig.json': () => {
    try {
      const tsconfig = JSON.parse(readFileSync('tsconfig.json', 'utf8'));
      if (!tsconfig.compilerOptions) {
        throw new Error('Invalid tsconfig.json structure');
      }
      return { status: 'healthy', details: 'TypeScript configuration valid' };
    } catch (error) {
      return { status: 'unhealthy', details: `tsconfig.json error: ${error.message}` };
    }
  },
  
  'vite.config.ts': () => {
    try {
      const config = readFileSync('vite.config.ts', 'utf8');
      if (!config.includes('defineConfig') || !config.includes('react()')) {
        throw new Error('Invalid Vite configuration');
      }
      return { status: 'healthy', details: 'Vite configuration valid' };
    } catch (error) {
      return { status: 'unhealthy', details: `vite.config.ts error: ${error.message}` };
    }
  },
  
  // Source code checks
  'src/main.tsx': () => {
    try {
      const main = readFileSync('src/main.tsx', 'utf8');
      if (!main.includes('ReactDOM.createRoot')) {
        throw new Error('Main entry point not found');
      }
      return { status: 'healthy', details: 'Main entry point valid' };
    } catch (error) {
      return { status: 'unhealthy', details: `src/main.tsx error: ${error.message}` };
    }
  },
  
  'src/App.tsx': () => {
    try {
      const app = readFileSync('src/App.tsx', 'utf8');
      if (!app.includes('BrowserRouter') || !app.includes('Routes')) {
        throw new Error('App component structure invalid');
      }
      return { status: 'healthy', details: 'App component valid' };
    } catch (error) {
      return { status: 'unhealthy', details: `src/App.tsx error: ${error.message}` };
    }
  },
  
  // RAG pipeline checks
  'src/lib/knowledge-store.ts': () => {
    try {
      const store = readFileSync('src/lib/knowledge-store.ts', 'utf8');
      if (!store.includes('knowledgeStore') || !store.includes('KnowledgeItem')) {
        throw new Error('Knowledge store structure invalid');
      }
      return { status: 'healthy', details: 'Knowledge store valid' };
    } catch (error) {
      return { status: 'unhealthy', details: `Knowledge store error: ${error.message}` };
    }
  },
  
  'src/lib/rag-pipeline.ts': () => {
    try {
      const pipeline = readFileSync('src/lib/rag-pipeline.ts', 'utf8');
      if (!pipeline.includes('processQuery') || !pipeline.includes('RAGResponse')) {
        throw new Error('RAG pipeline structure invalid');
      }
      return { status: 'healthy', details: 'RAG pipeline valid' };
    } catch (error) {
      return { status: 'unhealthy', details: `RAG pipeline error: ${error.message}` };
    }
  },
  
  'src/components/CybersecurityChatbot.tsx': () => {
    try {
      const chatbot = readFileSync('src/components/CybersecurityChatbot.tsx', 'utf8');
      if (!chatbot.includes('CybersecurityChatbot') || !chatbot.includes('useState')) {
        throw new Error('Chatbot component structure invalid');
      }
      return { status: 'healthy', details: 'Chatbot component valid' };
    } catch (error) {
      return { status: 'unhealthy', details: `Chatbot component error: ${error.message}` };
    }
  },
  
  // Configuration checks
  'tailwind.config.ts': () => {
    try {
      const config = readFileSync('tailwind.config.ts', 'utf8');
      if (!config.includes('cyber-blue') || !config.includes('content')) {
        throw new Error('Tailwind configuration invalid');
      }
      return { status: 'healthy', details: 'Tailwind configuration valid' };
    } catch (error) {
      return { status: 'unhealthy', details: `Tailwind config error: ${error.message}` };
    }
  },
  
  'index.html': () => {
    try {
      const html = readFileSync('index.html', 'utf8');
      if (!html.includes('<title>') || !html.includes('main')) {
        throw new Error('HTML structure invalid');
      }
      return { status: 'healthy', details: 'HTML structure valid' };
    } catch (error) {
      return { status: 'unhealthy', details: `HTML error: ${error.message}` };
    }
  }
};

async function performHealthChecks() {
  console.log('🏥 Performing Application Health Checks...');
  console.log('==========================================');
  console.log('');
  
  const results = {};
  let healthyCount = 0;
  let unhealthyCount = 0;
  
  for (const [checkName, checkFunction] of Object.entries(HEALTH_CHECKS)) {
    try {
      const result = checkFunction();
      results[checkName] = result;
      
      if (result.status === 'healthy') {
        console.log(`✅ ${checkName}: ${result.details}`);
        healthyCount++;
      } else {
        console.log(`❌ ${checkName}: ${result.details}`);
        unhealthyCount++;
      }
    } catch (error) {
      results[checkName] = { status: 'error', details: error.message };
      console.log(`💥 ${checkName}: Error - ${error.message}`);
      unhealthyCount++;
    }
  }
  
  console.log('');
  console.log('📊 Health Check Summary');
  console.log('========================');
  console.log(`Total Checks: ${Object.keys(HEALTH_CHECKS).length}`);
  console.log(`Healthy: ${healthyCount}`);
  console.log(`Unhealthy: ${unhealthyCount}`);
  console.log(`Health Score: ${((healthyCount / Object.keys(HEALTH_CHECKS).length) * 100).toFixed(1)}%`);
  
  if (unhealthyCount === 0) {
    console.log('🎉 All health checks passed! Application is healthy.');
    process.exit(0);
  } else {
    console.log('⚠️  Some health checks failed. Please investigate the issues above.');
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

// Run health checks
performHealthChecks().catch(error => {
  console.error('Health checks failed:', error);
  process.exit(1);
});
