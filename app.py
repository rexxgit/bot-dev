"""
Omni Brand Intelligence Bot - Complete Scraper
Scrapes real data and saves to data.json
"""

import os
import json
import time
import hashlib
from datetime import datetime
from typing import List, Dict, Optional

import requests
from bs4 import BeautifulSoup

# ================================================
# CONFIGURATION - ALL 5 SOURCES
# ================================================

TARGETS = [
    # 1. Existing source
    {
        'url': 'https://www.rauljitechnologies.com/blog/july-2026-ai-model-wave/',
        'selectors': {
            'title': 'h1.rtp-h1',
            'sub_sections': 'p.rtp-sub',
            'tables': 'div.rtfig',
            'paragraphs': 'p',
            'headings': 'h2, h3, h4'
        },
        'name': 'Raulji Technologies'
    },
    # 2. Gumloop
    {
        'url': 'https://www.gumloop.com/blog/best-ai-apps',
        'selectors': {
            'title': 'h1.heading-style-h2',
            'sub_sections': 'p.blog-post-lede',
            'tables': 'div.text-rich-text.blog-article.list.w-richtext table',
            'list_items': 'div.text-rich-text.blog-article.list.w-richtext li',
            'paragraphs': 'div.text-rich-text.blog-article.list.w-richtext p',
            'headings': 'div.text-rich-text.blog-article.list.w-richtext h2'
        },
        'name': 'Gumloop'
    },
    # 3. Pickaxe
    {
        'url': 'https://pickaxe.co/post/top-ai-platforms',
        'selectors': {
            'title': 'h1',
            'sub_sections': 'h2',
            'tables': 'table',
            'list_items': 'li',
            'paragraphs': 'p',
            'headings': 'h2'
        },
        'name': 'Pickaxe'
    },
    # 4. Synthesia
    {
        'url': 'https://www.synthesia.io/post/ai-tools',
        'selectors': {
            'title': 'h1.heading-medium.text-wrap-balance.text-color-primary',
            'sub_sections': 'h2',
            'tables': 'table',
            'list_items': 'li',
            'paragraphs': 'p',
            'headings': 'h2, h3'
        },
        'name': 'Synthesia'
    },
    # 5. Red River Communications
    {
        'url': 'https://redrivercomm.com/six-popular-ai-platforms-everyone-can-use',
        'selectors': {
            'title': 'h2.wp-block-heading',
            'sub_sections': 'h2',
            'tables': 'table',
            'list_items': 'li',
            'paragraphs': 'p',
            'headings': 'h2, h3'
        },
        'name': 'Red River Communications'
    }
]

USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

# ================================================
# COMPLETE SCRAPER CLASS
# ================================================

class CompleteScraper:
    """Scrapes real data from websites and saves to data.json"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        })
        self.all_data = []

    def scrape_target(self, target: Dict) -> Optional[Dict]:
        """Scrape a single target with its selectors"""
        try:
            url = target['url']
            name = target.get('name', 'Unknown')
            selectors = target.get('selectors', {})
            
            print(f'📄 Scraping: {name} - {url}')
            start_time = time.time()
            
            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # ============================================
            # 1. EXTRACT TITLE
            # ============================================
            title = 'No Title'
            if 'title' in selectors:
                elem = soup.select_one(selectors['title'])
                if elem:
                    title = elem.get_text(strip=True)
            
            # ============================================
            # 2. EXTRACT SUB SECTIONS
            # ============================================
            sub_texts = []
            if 'sub_sections' in selectors:
                elems = soup.select(selectors['sub_sections'])
                sub_texts = [e.get_text(strip=True) for e in elems]
            
            # ============================================
            # 3. EXTRACT TABLES
            # ============================================
            tables = []
            if 'tables' in selectors:
                table_elems = soup.select(selectors['tables'])
                for table in table_elems:
                    table_data = []
                    for row in table.find_all('tr'):
                        row_data = [cell.get_text(strip=True) for cell in row.find_all(['td', 'th'])]
                        if row_data:
                            table_data.append(row_data)
                    if table_data:
                        tables.append(table_data)
            
            # ============================================
            # 4. EXTRACT ALL PARAGRAPHS
            # ============================================
            paragraphs = []
            if 'paragraphs' in selectors:
                p_elems = soup.select(selectors['paragraphs'])
                for p in p_elems:
                    text = p.get_text(strip=True)
                    if len(text) > 20:
                        paragraphs.append(text)
            else:
                # Fallback: all paragraph tags
                for p in soup.find_all('p'):
                    text = p.get_text(strip=True)
                    if len(text) > 20:
                        paragraphs.append(text)
            
            # ============================================
            # 5. EXTRACT LIST ITEMS
            # ============================================
            list_items = []
            if 'list_items' in selectors:
                li_elems = soup.select(selectors['list_items'])
                for li in li_elems:
                    text = li.get_text(strip=True)
                    if len(text) > 5:
                        list_items.append(text)
            
            # ============================================
            # 6. EXTRACT SECTIONS
            # ============================================
            sections = []
            if 'headings' in selectors:
                heading_elems = soup.select(selectors['headings'])
                for heading in heading_elems:
                    text = heading.get_text(strip=True)
                    if text and len(text) > 3:
                        sections.append(text)
            else:
                # Fallback
                for heading in soup.find_all(['h2', 'h3', 'h4']):
                    text = heading.get_text(strip=True)
                    if text and len(text) > 3:
                        sections.append(text)
            
            # ============================================
            # 7. EXTRACT AUTHOR & DATE
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
            # 8. BUILD RESULT
            # ============================================
            full_content = '\n\n'.join(paragraphs)
            
            # If we have list items, append them to content
            if list_items:
                full_content += '\n\n## Key Points\n\n' + '\n'.join([f'- {item}' for item in list_items])
            
            result = {
                'source_name': name,
                'url': url,
                'title': title,
                'sub_sections': sub_texts,
                'tables': tables,
                'list_items': list_items,
                'content': full_content[:8000],
                'author': author,
                'date': date,
                'word_count': len(full_content.split()),
                'sections': sections,
                'timestamp': datetime.now().isoformat()
            }
            
            elapsed = time.time() - start_time
            print(f'   ✅ Scraped in {elapsed:.2f}s')
            print(f'   📊 Words: {result["word_count"]}')
            print(f'   📑 Sections: {len(sections)}')
            print(f'   📋 Tables: {len(tables)}')
            print(f'   📝 List Items: {len(list_items)}')
            
            return result
            
        except Exception as e:
            print(f'   ❌ Error scraping {url}: {e}')
            return None

    def scrape_all(self) -> List[Dict]:
        """Scrape all targets and combine results"""
        print('=' * 60)
        print('🤖 Complete Scraper - Live Data')
        print(f'📡 Targets: {len(TARGETS)} sources')
        print('=' * 60)
        
        results = []
        for target in TARGETS:
            result = self.scrape_target(target)
            if result:
                results.append(result)
            time.sleep(3)  # Increased delay to be respectful
        
        self.all_data = results
        return results

    def save_to_json(self, output_file: str = 'data.json') -> bool:
        """Save all scraped data to JSON"""
        if not self.all_data:
            print('❌ No data to save')
            return False
        
        combined = {
            'sources': self.all_data,
            'total_sources': len(self.all_data),
            'last_updated': datetime.now().isoformat()
        }
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(combined, f, indent=2, ensure_ascii=False)
        
        print(f'\n✅ Data saved to {output_file}')
        print(f'   Sources: {len(self.all_data)}')
        print(f'   Size: {os.path.getsize(output_file)} bytes')
        return True

# ================================================
# RUN
# ================================================

if __name__ == "__main__":
    scraper = CompleteScraper()
    data = scraper.scrape_all()
    scraper.save_to_json('data.json')
