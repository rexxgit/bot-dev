// api/utils/formatter.js - Professional Output Formatting

export class OutputFormatter {
  constructor() {
    this.separator = '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';
    this.divider = '────────────────────────────────────────';
  }

  // ============================================
  // MAIN FORMAT METHOD
  // ============================================
  formatResponse(data, persona) {
    const { query, results, facts, classification } = data;
    
    let output = [];
    
    // 1. HEADER
    output.push(this.formatHeader(query, persona));
    output.push('');
    
    // 2. EXECUTIVE SUMMARY (if facts exist)
    if (facts && facts.length > 0) {
      output.push(this.formatSummary(facts));
      output.push('');
    }
    
    // 3. KEY FINDINGS (if facts exist)
    if (facts && facts.length > 0) {
      output.push(this.formatFindings(facts));
      output.push('');
    }
    
    // 4. SOURCES
    if (results && results.length > 0) {
      output.push(this.formatSources(results));
      output.push('');
    }
    
    // 5. METADATA
    output.push(this.formatMetadata(classification, results));
    
    return output.join('\n');
  }

  // ============================================
  // HEADER
  // ============================================
  formatHeader(query, persona) {
    const icon = persona?.icon || '📊';
    const name = persona?.name || 'AI Assistant';
    
    return [
      `${this.separator}`,
      `${icon}  ${name}`,
      `${this.separator}`,
      `📋  Query: "${query}"`,
      `${this.separator}`
    ].join('\n');
  }

  // ============================================
  // EXECUTIVE SUMMARY
  // ============================================
  formatSummary(facts) {
    const summary = facts.slice(0, 2).map(f => f.text).join(' ');
    return [
      `📋  EXECUTIVE SUMMARY`,
      `${this.divider}`,
      `${summary}`
    ].join('\n');
  }

  // ============================================
  // KEY FINDINGS
  // ============================================
  formatFindings(facts) {
    const findings = facts.map((f, i) => 
      `  ${i+1}. ${f.text}\n     📌 Source: ${f.source}`
    ).join('\n\n');
    
    return [
      `🔍  KEY FINDINGS`,
      `${this.divider}`,
      `${findings}`
    ].join('\n');
  }

  // ============================================
  // SOURCES
  // ============================================
  formatSources(results) {
    const sources = results.map((r, i) => {
      const relevanceEmoji = r.relevance > 60 ? '🟢' : r.relevance > 30 ? '🟡' : '🔴';
      return [
        `  ${i+1}. ${r.title}`,
        `     📌 Source: ${r.source_name}`,
        `     📅 Date: ${r.date}`,
        `     📊 Relevance: ${relevanceEmoji} ${r.relevance}%`,
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
  formatMetadata(classification, results) {
    const queryType = classification?.type || 'unknown';
    const confidence = Math.round((classification?.confidence || 0) * 100);
    
    return [
      `📊  METADATA`,
      `${this.divider}`,
      `  Query Type: ${queryType.toUpperCase()}`,
      `  Confidence: ${confidence}%`,
      `  Matches Found: ${results?.length || 0}`,
      `  Total Sources: ${uniqueSources?.length || 0}`,
      `  Generated: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}`,
      `${this.separator}`
    ].join('\n');
  }

  // ============================================
  // DIRECT ANSWER FORMAT
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
  // NO RESULTS FORMAT
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
