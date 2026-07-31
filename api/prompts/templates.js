// api/prompts/templates.js - Response Templates

export const responseTemplates = {
  detailed: (data) => {
    let html = `**📊 Answer based on ${data.sources.length} source(s):**\n\n`;
    
    for (let i = 0; i < data.sources.length; i++) {
      const r = data.sources[i];
      const relevanceEmoji = r.relevance > 60 ? '🟢' : r.relevance > 30 ? '🟡' : '🔴';
      const relevanceLabel = r.relevance > 60 ? 'High' : r.relevance > 30 ? 'Medium' : 'Low';
      
      html += `**Source ${i + 1}: ${r.title}**\n`;
      html += `🏷️ Source: ${r.source_name}\n`;
      html += `✍️ Author: ${r.author}\n`;
      html += `📅 Date: ${r.date}\n`;
      html += `📊 Relevance: ${relevanceEmoji} ${relevanceLabel} (${r.relevance}%)\n\n`;
      html += `${r.chunk}\n\n`;
      html += `🔗 ${r.source}\n\n---\n\n`;
    }
    
    return html;
  },

  brief: (data) => {
    const top = data.sources[0];
    return `**${top.title}**\n\n${top.chunk}\n\n*Source: ${top.source_name}*`;
  },

  summary: (data) => {
    const top = data.sources[0];
    return `**TL;DR:** ${top.title}\n\n**Key Points:**\n${data.sources.map((s, i) => `${i+1}. ${s.title}`).join('\n')}\n\n*Source: ${top.source_name}*`;
  },

  comparison: (data) => {
    let html = `**${data.topic || 'Comparison'}:**\n\n`;
    html += `| Feature | ${data.sources.map(s => s.source_name).join(' | ')} |\n`;
    html += `|---------|${data.sources.map(() => '---').join('|')}|\n`;
    
    // Group by common features (simplified)
    const features = ['Title', 'Relevance', 'Date'];
    for (const feature of features) {
      html += `| ${feature} | ${data.sources.map(s => s[feature.toLowerCase()] || 'N/A').join(' | ')} |\n`;
    }
    
    return html;
  }
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
