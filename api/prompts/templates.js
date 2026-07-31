// api/prompts/templates.js - Response Templates

export const responseTemplates = {
  // Detailed answer with sources
  detailed: (data) => `
**📊 Answer based on ${data.sources.length} source(s):**

${data.answer}

---

**📚 Sources:**
${data.sources.map((s, i) => `
${i + 1}. **${s.title}**
   - Source: ${s.source_name}
   - Date: ${s.date}
   - Relevance: ${s.relevance}%
   - ${s.url}
`).join('\n')}`,

  // Brief answer with sources
  brief: (data) => `
${data.answer}

*Source: ${data.sources[0]?.source_name || 'Unknown'}*
`,

  // Summary with key points
  summary: (data) => `
**TL;DR:** ${data.summary}

**Key Points:**
${data.keyPoints.map(p => `- ${p}`).join('\n')}

**Source:** ${data.sources[0]?.url || 'N/A'}
`,

  // Comparison table
  comparison: (data) => `
**${data.topic} Comparison:**

| Feature | ${data.options.map(o => o.name).join(' | ')} |
|---------|${data.options.map(() => '---').join('|')}
${data.features.map(f => 
  `| ${f.name} | ${f.values.map(v => v || 'N/A').join(' | ')} |`
).join('\n')}

**Recommendation:** ${data.recommendation}
`
};

export function selectTemplate(queryType, data) {
  switch(queryType) {
    case 'factual':
      return responseTemplates.detailed(data);
    case 'analytical':
      return responseTemplates.detailed(data);
    case 'comparative':
      return responseTemplates.comparison(data);
    case 'summarization':
      return responseTemplates.summary(data);
    default:
      return responseTemplates.brief(data);
  }
}
