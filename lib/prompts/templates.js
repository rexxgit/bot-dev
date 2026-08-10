// api/prompts/templates.js - Add CoT template

export const responseTemplates = {
  // ... existing templates ...

  // NEW: Chain-of-Thought template
  cot: (data) => {
    const top = data.sources[0] || {};
    return `
**🧠 Chain-of-Thought Analysis**

${data.reasoning || 'Analyzing step by step...'}

---

**📊 Summary**

${data.summary || `Found ${data.sources.length} relevant source(s).`}

---

**📚 Sources**
${data.sources.map((s, i) => `${i+1}. **${s.title}** (${s.source_name})`).join('\n')}

**🔗 ${top.source || '#'}**

*Confidence: ${data.confidence || 'Medium'}*
`;
  }
};

export function selectTemplate(queryType, data) {
  switch(queryType) {
    case 'analytical':
      return responseTemplates.cot(data);
    case 'comparative':
      return responseTemplates.cot(data);
    case 'exploratory':
      return responseTemplates.cot(data);
    default:
      return responseTemplates.detailed(data);
  }
}
