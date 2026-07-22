"""
Omni Brand Intelligence Bot
RAG-powered competitive intelligence bot with BeautifulSoup scraping
Repository: rexxgit/bot-dev
"""

import os
import re
import json
import time
import hashlib
from datetime import datetime
from typing import List, Dict, Optional
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
import gradio as gr
import markdown

# ================================================
# CONFIGURATION
# ================================================

TARGET_URL = 'https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/'
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

# ================================================
# SCRAPER CLASS WITH SPECIFIC SELECTORS
# ================================================

class RauljiScraper:
    """
    Specialized scraper for Raulji Technologies articles
    Targets: h1.rtp-h1, p.rtp-sub, div.rtfig
    """
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0',
        })
        self.results = []
    
    def scrape_article(self, url: str) -> Optional[Dict]:
        """
        Scrape article with specific selectors:
        - h1.rtp-h1 → main title
        - p.rtp-sub → sub section text
        - div.rtfig → table section
        """
        try:
            print(f'📄 Scraping: {url}')
            response = self.session.get(url, timeout=20)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # ============================================
            # 1. MAIN TITLE (h1.rtp-h1)
            # ============================================
            title_elem = soup.select_one('h1.rtp-h1')
            title = title_elem.get_text(strip=True) if title_elem else 'No Title'
            
            # ============================================
            # 2. SUB SECTION TEXT (p.rtp-sub)
            # ============================================
            sub_elements = soup.select('p.rtp-sub')
            sub_texts = [elem.get_text(strip=True) for elem in sub_elements]
            
            # ============================================
            # 3. TABLE SECTION (div.rtfig)
            # ============================================
            table_elements = soup.select('div.rtfig')
            tables = []
            for table_div in table_elements:
                for table in table_div.find_all('table'):
                    table_data = []
                    for row in table.find_all('tr'):
                        row_data = [
                            cell.get_text(strip=True) 
                            for cell in row.find_all(['td', 'th'])
                        ]
                        if row_data:
                            table_data.append(row_data)
                    if table_data:
                        tables.append(table_data)
            
            # ============================================
            # 4. ALL PARAGRAPHS (for full content)
            # ============================================
            paragraphs = soup.find_all('p')
            all_paragraphs = []
            for p in paragraphs:
                text = p.get_text(strip=True)
                if len(text) > 20 and not p.select_one('.rtp-sub'):
                    all_paragraphs.append(text)
            
            # ============================================
            # 5. SECTIONS (h2, h3, h4)
            # ============================================
            sections = []
            for heading in soup.find_all(['h2', 'h3', 'h4']):
                text = heading.get_text(strip=True)
                if text and len(text) > 3:
                    sections.append(text)
            
            # ============================================
            # 6. AUTHOR & DATE
            # ============================================
            author = 'Unknown'
            date = datetime.now().strftime('%B %d, %Y')
            
            author_elem = soup.select_one('.author, .byline, [rel="author"]')
            if author_elem:
                author = author_elem.get_text(strip=True)
            
            date_elem = soup.select_one('time, .date, .published, .post-date')
            if date_elem:
                if date_elem.get('datetime'):
                    date = date_elem.get('datetime')
                else:
                    date = date_elem.get_text(strip=True)
            
            # ============================================
            # 7. BUILD STRUCTURED DATA
            # ============================================
            full_content = '\n\n'.join(all_paragraphs)
            
            data = {
                'url': url,
                'title': title,
                'sub_sections': sub_texts,
                'tables': tables,
                'paragraphs': all_paragraphs,
                'content': full_content[:8000],
                'author': author,
                'date': date,
                'word_count': len(full_content.split()),
                'sections': sections,
                'hash': hashlib.md5(url.encode()).hexdigest()[:8],
                'timestamp': datetime.now().isoformat()
            }
            
            print(f'   ✅ Title: {title[:50]}...')
            print(f'   📊 Sub sections: {len(sub_texts)}')
            print(f'   📋 Tables: {len(tables)}')
            print(f'   📄 Words: {data["word_count"]}')
            print(f'   📑 Sections: {len(sections)}')
            
            return data
            
        except Exception as e:
            print(f'   ❌ Error: {e}')
            return None
    
    def scrape_multiple(self, urls: List[str]) -> List[Dict]:
        """Scrape multiple URLs with rate limiting"""
        results = []
        for url in urls:
            result = self.scrape_article(url)
            if result:
                results.append(result)
            time.sleep(3)
        return results

# ================================================
# RAG PIPELINE
# ================================================

class RAGPipeline:
    """Retrieval-Augmented Generation pipeline with FAISS"""
    
    def __init__(self):
        print('🔄 Loading embedding model...')
        self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        print('✅ Model loaded')
        self.index = None
        self.chunks = []
        self.documents = []
    
    def build_index(self, documents: List[Dict]) -> int:
        """Build FAISS index from documents"""
        print('🔨 Building FAISS index...')
        
        # Combine content with structure
        all_content = ''
        for doc in documents:
            all_content += f"# {doc['title']}\n\n"
            if doc.get('sub_sections'):
                all_content += "## Sub Sections:\n"
                for sub in doc['sub_sections']:
                    all_content += f"- {sub}\n"
                all_content += "\n"
            if doc.get('tables'):
                all_content += "## Tables:\n"
                for table in doc['tables']:
                    for row in table:
                        all_content += " | ".join(row) + "\n"
                all_content += "\n"
            all_content += doc['content'] + "\n\n"
        
        # Chunk
        chunk_size = 500
        words = all_content.split()
        self.chunks = [
            ' '.join(words[i:i+chunk_size]) 
            for i in range(0, len(words), chunk_size)
        ]
        
        print(f'   📄 Created {len(self.chunks)} chunks')
        
        # Embed
        embeddings = self.model.encode(self.chunks, show_progress_bar=True)
        faiss.normalize_L2(embeddings)
        
        # Index
        dimension = embeddings.shape[1]
        self.index = faiss.IndexFlatIP(dimension)
        self.index.add(embeddings.astype('float32'))
        self.documents = documents
        
        print(f'   ✅ Index built with {len(self.chunks)} chunks')
        return len(self.chunks)
    
    def search(self, query: str, top_k: int = 3) -> List[Dict]:
        """Search for relevant chunks"""
        if self.index is None:
            return []
        
        query_embedding = self.model.encode([query])
        faiss.normalize_L2(query_embedding)
        distances, indices = self.index.search(
            query_embedding.astype('float32'), top_k
        )
        
        results = []
        for i, idx in enumerate(indices[0]):
            if idx < len(self.chunks):
                results.append({
                    'chunk': self.chunks[idx],
                    'score': float(distances[0][i]),
                    'source': self.documents[0]['url'] if self.documents else 'Unknown'
                })
        
        return results

# ================================================
# FORMAT RESPONSE FOR UI
# ================================================

def format_scraped_content(doc: Dict) -> str:
    """Format the scraped content for display in the UI"""
    
    html = f"""
    <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
    """
    
    # Title
    html += f"""
    <h1 style="font-size: 1.8rem; font-weight: 700; color: #1a202c; margin-bottom: 1rem; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem;">
        📄 {doc['title']}
    </h1>
    """
    
    # Metadata
    html += f"""
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; color: #475569;">
        <span><strong>✍️ Author:</strong> {doc.get('author', 'Unknown')}</span>
        <span><strong>📅 Date:</strong> {doc.get('date', 'Unknown')}</span>
        <span><strong>📊 Words:</strong> {doc.get('word_count', 0)}</span>
        <span><strong>📑 Sections:</strong> {len(doc.get('sections', []))}</span>
        <span><strong>📋 Tables:</strong> {len(doc.get('tables', []))}</span>
    </div>
    """
    
    # Sub Sections
    if doc.get('sub_sections'):
        html += f"""
        <div style="margin-bottom: 1.5rem; padding: 1rem; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">🔍 Key Sub Sections</h3>
            <ul style="list-style-type: disc; padding-left: 1.5rem; margin: 0;">
        """
        for sub in doc['sub_sections']:
            html += f"<li style='margin-bottom: 0.25rem;'>{sub}</li>"
        html += """
            </ul>
        </div>
        """
    
    # Sections
    if doc.get('sections'):
        html += f"""
        <div style="margin-bottom: 1.5rem;">
            <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">📑 Article Sections</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        """
        for section in doc['sections'][:10]:
            html += f"<span style='background: #e2e8f0; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; color: #475569;'>{section}</span>"
        html += """
            </div>
        </div>
        """
    
    # Tables
    if doc.get('tables'):
        html += f"""
        <div style="margin-bottom: 1.5rem;">
            <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.75rem;">📊 Tables ({len(doc['tables'])})</h3>
        """
        for table_idx, table in enumerate(doc['tables']):
            html += f"""
            <div style="overflow-x: auto; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
            """
            for row_idx, row in enumerate(table):
                bg = '#f8fafc' if row_idx == 0 else 'transparent'
                html += f"""
                <tr style="background: {bg}; { 'font-weight: 600;' if row_idx == 0 else '' }">
                """
                for cell in row:
                    html += f"""
                    <td style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0;">{cell}</td>
                    """
                html += "</tr>"
            html += """
                </table>
            </div>
            """
        html += "</div>"
    
    # Content preview
    html += f"""
    <div style="margin-bottom: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
        <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">📝 Content Preview</h3>
        <p style="color: #475569; line-height: 1.8;">{doc['content'][:1000]}...</p>
        <p style="color: #94a3b8; font-size: 0.8rem; margin-top: 0.5rem;">Showing first 1000 characters of {doc['word_count']} words</p>
    </div>
    """
    
    html += f"""
    <div style="font-size: 0.8rem; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 0.5rem; margin-top: 0.5rem;">
        <p>🔗 Source: <a href="{doc['url']}" target="_blank" style="color: #3b82f6; text-decoration: none;">{doc['url']}</a></p>
        <p>🆔 Hash: {doc.get('hash', 'N/A')}</p>
    </div>
    </div>
    """
    
    return html

def format_answer_with_sources(query: str, result: Dict) -> str:
    """Format the final answer with sources"""
    
    html = f"""
    <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 100%;">
        <div style="background: #f0fdf4; padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 1.5rem;">
            <h3 style="font-weight: 600; color: #166534; margin: 0;">💡 Answer</h3>
            <p style="margin: 0.5rem 0 0 0; color: #1e293b;">{result['response']}</p>
        </div>
    """
    
    # Sources
    if result.get('sources'):
        html += """
        <div style="margin-top: 1.5rem;">
            <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.75rem;">📚 Sources</h3>
        """
        for i, source in enumerate(result['sources']):
            relevance_pct = int(source['score'] * 100)
            color = '#22c55e' if relevance_pct > 70 else '#eab308' if relevance_pct > 40 else '#ef4444'
            html += f"""
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; border-bottom: 1px solid #e2e8f0;">
                <div>
                    <span style="font-weight: 500; color: #1e293b;">Source {i+1}</span>
                    <span style="font-size: 0.85rem; color: #64748b; margin-left: 0.5rem;">{source['source']}</span>
                </div>
                <span style="background: {color}20; color: {color}; padding: 0.1rem 0.5rem; border-radius: 9999px; font-size: 0.7rem; font-weight: 600;">
                    {relevance_pct}%
                </span>
            </div>
            """
        html += "</div>"
    
    html += """
    </div>
    """
    
    return html

def format_scraped_content_ui(doc: Dict) -> str:
    """Format the scraped content for display in the UI"""
    
    html = f"""
    <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
    """
    
    # Title
    html += f"""
    <h1 style="font-size: 1.8rem; font-weight: 700; color: #1a202c; margin-bottom: 1rem; border-bottom: 3px solid #3b82f6; padding-bottom: 0.5rem;">
        📄 {doc['title']}
    </h1>
    """
    
    # Metadata
    html += f"""
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; color: #475569;">
        <span><strong>✍️ Author:</strong> {doc.get('author', 'Unknown')}</span>
        <span><strong>📅 Date:</strong> {doc.get('date', 'Unknown')}</span>
        <span><strong>📊 Words:</strong> {doc.get('word_count', 0)}</span>
        <span><strong>📑 Sections:</strong> {len(doc.get('sections', []))}</span>
        <span><strong>📋 Tables:</strong> {len(doc.get('tables', []))}</span>
    </div>
    """
    
    # Sub Sections
    if doc.get('sub_sections'):
        html += f"""
        <div style="margin-bottom: 1.5rem; padding: 1rem; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">🔍 Key Sub Sections</h3>
            <ul style="list-style-type: disc; padding-left: 1.5rem; margin: 0;">
        """
        for sub in doc['sub_sections']:
            html += f"<li style='margin-bottom: 0.25rem;'>{sub}</li>"
        html += """
            </ul>
        </div>
        """
    
    # Sections
    if doc.get('sections'):
        html += f"""
        <div style="margin-bottom: 1.5rem;">
            <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">📑 Article Sections</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        """
        for section in doc['sections'][:10]:
            html += f"<span style='background: #e2e8f0; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; color: #475569;'>{section}</span>"
        html += """
            </div>
        </div>
        """
    
    # Tables
    if doc.get('tables'):
        html += f"""
        <div style="margin-bottom: 1.5rem;">
            <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.75rem;">📊 Tables ({len(doc['tables'])})</h3>
        """
        for table_idx, table in enumerate(doc['tables']):
            html += f"""
            <div style="overflow-x: auto; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
            """
            for row_idx, row in enumerate(table):
                bg = '#f8fafc' if row_idx == 0 else 'transparent'
                html += f"""
                <tr style="background: {bg}; { 'font-weight: 600;' if row_idx == 0 else '' }">
                """
                for cell in row:
                    html += f"""
                    <td style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0;">{cell}</td>
                    """
                html += "</tr>"
            html += """
                </table>
            </div>
            """
        html += "</div>"
    
    # Content preview
    html += f"""
    <div style="margin-bottom: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px;">
        <h3 style="font-weight: 600; color: #1e293b; margin-bottom: 0.5rem;">📝 Content Preview</h3>
        <p style="color: #475569; line-height: 1.8;">{doc['content'][:1000]}...</p>
        <p style="color: #94a3b8; font-size: 0.8rem; margin-top: 0.5rem;">Showing first 1000 characters of {doc['word_count']} words</p>
    </div>
    """
    
    html += f"""
    <div style="font-size: 0.8rem; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 0.5rem; margin-top: 0.5rem;">
        <p>🔗 Source: <a href="{doc['url']}" target="_blank" style="color: #3b82f6; text-decoration: none;">{doc['url']}</a></p>
        <p>🆔 Hash: {doc.get('hash', 'N/A')}</p>
    </div>
    </div>
    """
    
    return html

# ================================================
# GRADIO UI
# ================================================

print('=' * 60)
print('🤖 Omni Brand Intelligence Bot')
print(f'📡 Target: {TARGET_URL}')
print('=' * 60)

# Scrape
scraper = RauljiScraper()
scraped_data = scraper.scrape_multiple([TARGET_URL])

if not scraped_data:
    print('❌ Failed to scrape data. Exiting.')
    exit(1)

print(f'\n✅ Scraped {len(scraped_data)} articles')

# Build RAG
rag = RAGPipeline()
rag.build_index(scraped_data)

# ================================================
# UI FUNCTIONS
# ================================================

def show_scraped_content():
    """Display the scraped content in a formatted view"""
    if not scraped_data:
        return "No data available"
    return format_scraped_content_ui(scraped_data[0])

def answer_question(query: str) -> str:
    """Answer a question using the RAG pipeline"""
    if not query or not query.strip():
        return "Please enter a question."
    
    result = rag.generate_response(query)
    return format_answer_with_sources(query, result)

# ================================================
# GRADIO INTERFACE
# ================================================

with gr.Blocks(
    title="Omni Brand Intelligence Bot",
    theme=gr.themes.Soft(),
    css="""
    .gradio-container {
        max-width: 1400px !important;
        margin: auto !important;
    }
    .message {
        padding: 12px !important;
        border-radius: 8px !important;
    }
    """
) as demo:
    gr.Markdown("""
    # 🤖 Omni Brand Intelligence Bot
    ### RAG-powered competitive intelligence for marketing teams
    """)
    
    with gr.Tabs():
        # ============================================
        # TAB 1: CHAT
        # ============================================
        with gr.TabItem("💬 Chat"):
            with gr.Row():
                with gr.Column(scale=1):
                    gr.Markdown("""
                    ### 📊 About
                    This bot scrapes competitor content using:
                    - **BeautifulSoup** with specific selectors
                    - **FAISS** for vector search
                    - **sentence-transformers** for embeddings
                    
                    **Target:** Raulji Technologies
                    """)
                    
                    status = gr.Textbox(
                        label="Status",
                        value=f"✅ Ready. {len(scraped_data)} documents indexed.",
                        interactive=False
                    )
                    
                    if scraped_data:
                        doc = scraped_data[0]
                        doc_info = gr.JSON(
                            label="Document Info",
                            value={
                                "title": doc.get('title', 'Unknown'),
                                "author": doc.get('author', 'Unknown'),
                                "date": doc.get('date', 'Unknown'),
                                "word_count": doc.get('word_count', 0),
                                "sub_sections": doc.get('sub_sections', [])[:5],
                                "tables": len(doc.get('tables', []))
                            }
                        )
                
                with gr.Column(scale=2):
                    chatbot = gr.Chatbot(
                        label="Conversation",
                        height=500,
                        show_label=False
                    )
                    
                    with gr.Row():
                        msg = gr.Textbox(
                            placeholder="Ask a question about the July 2026 AI model wave...",
                            scale=4,
                            show_label=False
                        )
                        send_btn = gr.Button("Send", variant="primary", scale=1)
                    
                    clear_btn = gr.Button("Clear Chat", variant="secondary")
                    
                    gr.Examples(
                        examples=[
                            ["What are the July 2026 AI models?"],
                            ["What does the article say about open-source AI?"],
                            ["What is the winning move for AI strategy?"],
                            ["What are the common mistakes in AI adoption?"],
                            ["What does the table show about different AI models?"],
                        ],
                        inputs=msg,
                        label="Example Questions"
                    )
        
        # ============================================
        # TAB 2: SCRAPED CONTENT
        # ============================================
        with gr.TabItem("📄 Scraped Content"):
            gr.Markdown("### 📄 Scraped Article Content")
            gr.Markdown("This shows the raw scraped data from the target website.")
            
            scraped_display = gr.HTML(
                value=show_scraped_content(),
                label="Scraped Content"
            )
            
            refresh_btn = gr.Button("🔄 Refresh Scraped Data", variant="secondary")
            
            def refresh_scraped():
                scraper = RauljiScraper()
                data = scraper.scrape_multiple([TARGET_URL])
                if data:
                    return format_scraped_content_ui(data[0])
                return "Failed to refresh data"
            
            refresh_btn.click(
                refresh_scraped,
                outputs=scraped_display
            )
        
        # ============================================
        # TAB 3: RAW DATA
        # ============================================
        with gr.TabItem("📋 Raw Data"):
            gr.Markdown("### 📋 Raw JSON Data")
            gr.Markdown("This shows the complete scraped data in JSON format.")
            
            if scraped_data:
                gr.JSON(
                    value=scraped_data[0],
                    label="Scraped Document"
                )
    
    # ================================================
    # EVENT HANDLERS
    # ================================================
    
    def respond(message, history):
        """Handle user message and return response"""
        if not message or not message.strip():
            return history, ""
        
        response = answer_question(message)
        history = history or []
        history.append((message, response))
        return history, ""
    
    send_btn.click(
        respond,
        inputs=[msg, chatbot],
        outputs=[chatbot, msg]
    )
    
    msg.submit(
        respond,
        inputs=[msg, chatbot],
        outputs=[chatbot, msg]
    )
    
    clear_btn.click(
        lambda: ([], ""),
        inputs=[],
        outputs=[chatbot, msg]
    )

# ================================================
# RUN
# ================================================
# Add this at the end of app.py, before the if __name__ == "__main__" block

def get_scraped_data() -> Dict:
    """Return the scraped data for the UI"""
    if scraped_data:
        return scraped_data[0]
    return None

def answer_question_api(query: str) -> Dict:
    """API-compatible version of answer_question"""
    if not query or not query.strip():
        return {
            'response': 'Please enter a question.',
            'sources': [],
            'metadata': {}
        }
    
    result = rag.generate_response(query)
    return result

def get_formatted_scraped_content() -> str:
    """Return formatted HTML of scraped content"""
    if not scraped_data:
        return "No data available"
    return format_scraped_content_ui(scraped_data[0])

if __name__ == "__main__":
    print('\n🚀 Starting Gradio interface...')
    print('   URL: http://localhost:7860')
    print('=' * 60)
    demo.launch(share=True, server_name="0.0.0.0", server_port=7860)
