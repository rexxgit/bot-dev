// api/response/formatter.js - Dynamic Response Formatter

import { intentDetector } from './intent.js';

export class ResponseFormatter {
  constructor() {
    this.separator = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    this.divider = '────────────────────────────────────────';
  }

  // ============================================
  // FORMAT RESPONSE
  // ============================================
  formatResponse(data) {
    const { query, results, facts, classification, confidence, intent } = data;
    const intentInfo = intent || intentDetector.detectIntent(query);
    const structure = intentDetector.getResponseStructure(intentInfo.primary);
    
    let output = [];
    
    // 1. HEADER
    output.push(this.formatHeader(query, intentInfo));
    output.push('');
    
    // 2. CONFIDENCE
    if (confidence) {
      output.push(this.formatConfidence(confidence));
      output.push('');
    }
    
    // 3. EXECUTIVE SUMMARY (if facts exist)
    if (facts && facts.length > 0) {
      output.push(this.formatSummary(facts, intentInfo.primary));
      output.push('');
    }
    
    // 4. KEY FINDINGS (for analytical/comparative)
    if (facts && facts.length > 0 && ['analytical', 'comparative'].includes(intentInfo.primary)) {
      output.push(this.formatFindings(facts));
      output.push('');
    }
    
    // 5. DETAILED ANALYSIS (for analytical)
    if (intentInfo.primary === 'analytical' && facts && facts.length > 0) {
      output.push(this.formatAnalysis(facts));
      output.push('');
    }
    
    // 6. COMPARISON MATRIX (for comparative)
    if (intentInfo.primary === 'comparative' && results && results.length > 1) {
      output.push(this.formatComparison(results));
      output.push('');
    }
    
    // 7. SOURCES
    if (results && results.length > 0) {
      output.push(this.formatSources(results));
      output.push('');
    }
    
    // 8. METADATA
    output.push(this.formatMetadata(classification, results, intentInfo));
    
    return output.join('\n');
  }

  // ============================================
  // HEADER
  // ============================================
  formatHeader(query, intentInfo) {
    const intentIcons = {
      informational: '📖',
      comparative: '⚖️',
      analytical: '🔬',
      exploratory: '🔭',
      action: '🎯',
      summarization: '📋'
    };
    
    const icon = intentIcons[intentInfo.primary] || '📊';
    const name = this.getIntentName(intentInfo.primary);
    
    return [
      `${this.separator}`,
      `${icon}  ${name}`,
      `${this.separator}`,
      `📋  Query: "${query}"`,
      `${this.divider}`
    ].join('\n');
  }

  // ============================================
  // GET INTENT NAME
  // ============================================
  getIntentName(intent) {
    const names = {
      informational: 'Information Request',
      comparative: 'Comparative Analysis',
      analytical: 'Deep Analysis',
      exploratory: 'Exploratory Insight',
      action: 'Actionable Guidance',
      summarization: 'Summary'
    };
    return names[intent] || 'Analysis';
  }

  // ============================================
  // CONFIDENCE
  // ============================================
  formatConfidence(confidence) {
    const breakdown = confidence.breakdown || {};
    return [
      `🎯  CONFIDENCE: ${confidence.emoji} ${confidence.level} (${confidence.score}%)`,
      `${this.divider}`,
      `  Source Relevance: ${breakdown.relevance || 0}%`,
      `  Source Authority: ${breakdown.authority || 0}%`,
      `  Source Diversity: ${breakdown.diversity || 0}%`
    ].join('\n');
  }

  // ============================================
  // SUMMARY
  // ============================================
  formatSummary(facts, intent) {
    const maxFacts = intent === 'summarization' ? 2 : 3;
    const summary = facts.slice(0, maxFacts).map(f => f.text).join(' ');
    
    return [
      `📌  EXECUTIVE SUMMARY`,
      `${this.divider}`,
      `${summary}`
    ].join('\n');
  }

  // ============================================
  // FINDINGS
  // ============================================
  formatFindings(facts) {
    const items = facts.slice(0, 5).map((f, i) => 
      `  ${i+1}. ${f.text}\n     📌 Source: ${f.source}`
    ).join('\n\n');
    
    return [
      `🔑  KEY FINDINGS`,
      `${this.divider}`,
      `${items}`
    ].join('\n');
  }

  // ============================================
  // ANALYSIS
  // ============================================
  formatAnalysis(facts) {
    const items = facts.map(f => 
      `  • ${f.text}`
    ).join('\n');
    
    return [
      `📊  DETAILED ANALYSIS`,
      `${this.divider}`,
      `${items}`
    ].join('\n');
  }

  // ============================================
  // COMPARISON
  // ============================================
  formatComparison(results) {
    const headers = ['Feature', ...results.slice(0, 3).map(r => r.source_name)];
    const features = ['Title', 'Relevance', 'Date'];
    
    let table = `  | ${headers.join(' | ')} |\n`;
    table += `  |${headers.map(() => '---').join('|')}|\n`;
    
    for (const feature of features) {
      const row = [feature];
      for (const r of results.slice(0, 3)) {
        const value = feature === 'Title' ? r.title.substring(0, 20) + '...' :
                     feature === 'Relevance' ? r.relevance + '%' :
                     r.date;
        row.push(value || 'N/A');
      }
      table += `  | ${row.join(' | ')} |\n`;
    }
    
    return [
      `⚖️  COMPARISON MATRIX`,
      `${this.divider}`,
      `${table}`
    ].join('\n');
  }

  // ============================================
  // SOURCES
  // ============================================
  formatSources(results) {
    const sources = results.map((r, i) => {
      const emoji = r.relevance > 60 ? '🟢' : r.relevance > 30 ? '🟡' : '🔴';
      return [
        `  ${i+1}. ${r.title}`,
        `     📌 Source: ${r.source_name}`,
        `     📅 Date: ${r.date}`,
        `     📊 Relevance: ${emoji} ${r.relevance}%`,
        `     🔗 ${r.source}`
      ].join('\n');
    }).join('\n\n');
    
    return [
      `📚  SOURCES`,
      `${this.divider}`,
      `${sources}`
    ].join('\n');
  }

  // ============================================
  // METADATA
  // ============================================
  formatMetadata(classification, results, intentInfo) {
    const queryType = classification?.type || intentInfo.primary;
    const confidence = Math.round((classification?.confidence || 0.5) * 100);
    
    return [
      `📊  METADATA`,
      `${this.divider}`,
      `  Intent: ${intentInfo.primary.toUpperCase()}`,
      `  Intent Confidence: ${Math.round(intentInfo.confidence * 100)}%`,
      `  Query Type: ${queryType.toUpperCase()}`,
      `  Matches Found: ${results?.length || 0}`,
      `  Total Sources: ${uniqueSources?.length || 0}`,
      `  Generated: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}`,
      `${this.separator}`
    ].join('\n');
  }

  // ============================================
  // FORMAT DIRECT ANSWER
  // ============================================
  formatDirectAnswer(answer) {
    return [
      `${this.separator}`,
      `🎯  DIRECT ANSWER`,
      `${this.separator}`,
      `${answer}`,
      `${this.separator}`
    ].join('\n');
  }

  // ============================================
  // FORMAT NO RESULTS
  // ============================================
  formatNoResults(query, suggestions) {
    return [
      `${this.separator}`,
      `🔍  NO RESULTS FOUND`,
      `${this.separator}`,
      `  Query: "${query}"`,
      '',
      `  💡 Suggestions:`,
      ...suggestions.map(s => `  • ${s}`),
      '',
      `  📊 Data Available: ${uniqueSources?.length || 0} articles`,
      `${this.separator}`
    ].join('\n');
  }
}

// Export singleton
export const responseFormatter = new ResponseFormatter();
